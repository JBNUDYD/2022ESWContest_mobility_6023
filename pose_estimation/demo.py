import argparse

import cv2
import numpy as np
import torch
import os

from models.with_mobilenet import PoseEstimationWithMobileNet
from modules.keypoints import extract_keypoints, group_keypoints
from modules.load_state import load_state
from modules.pose import Pose, track_poses
from val import normalize, pad_width

import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
from firebase_admin import firestore
from uuid import uuid4

class VideoReader(object):
    def __init__(self, file_name):
        self.file_name = file_name
        try:  # OpenCV needs int to read from webcam
            self.file_name = int(file_name)
        except ValueError:
            pass

    def __iter__(self):
        self.cap = cv2.VideoCapture(self.file_name)
        if not self.cap.isOpened():
            return 0
        return self

    def __next__(self):
        was_read, img = self.cap.read()
        if not was_read:
            raise StopIteration
        return img


def infer_fast(net, img, net_input_height_size, stride, upsample_ratio, cpu,
               pad_value=(0, 0, 0), img_mean=np.array([128, 128, 128], np.float32), img_scale=np.float32(1/256)):
    height, width, _ = img.shape
    scale = net_input_height_size / height

    scaled_img = cv2.resize(img, (0, 0), fx=scale, fy=scale, interpolation=cv2.INTER_LINEAR)
    scaled_img = normalize(scaled_img, img_mean, img_scale)
    min_dims = [net_input_height_size, max(scaled_img.shape[1], net_input_height_size)]
    padded_img, pad = pad_width(scaled_img, stride, pad_value, min_dims)

    tensor_img = torch.from_numpy(padded_img).permute(2, 0, 1).unsqueeze(0).float()

    stages_output = net(tensor_img)

    stage2_heatmaps = stages_output[-2]
    heatmaps = np.transpose(stage2_heatmaps.squeeze().cpu().data.numpy(), (1, 2, 0))
    heatmaps = cv2.resize(heatmaps, (0, 0), fx=upsample_ratio, fy=upsample_ratio, interpolation=cv2.INTER_CUBIC)

    stage2_pafs = stages_output[-1]
    pafs = np.transpose(stage2_pafs.squeeze().cpu().data.numpy(), (1, 2, 0))
    pafs = cv2.resize(pafs, (0, 0), fx=upsample_ratio, fy=upsample_ratio, interpolation=cv2.INTER_CUBIC)

    return heatmaps, pafs, scale, pad

def run_demo(net, image_provider, height_size, cpu, track, smooth, i):
    net = net.eval()

    stride = 8
    upsample_ratio = 4
    num_keypoints = Pose.num_kpts
    previous_poses = []
    delay = 1
    for img in image_provider:
        orig_img = img.copy()
        heatmaps, pafs, scale, pad = infer_fast(net, img, height_size, stride, upsample_ratio, cpu)

        total_keypoints_num = 0
        all_keypoints_by_type = []
        for kpt_idx in range(num_keypoints):  # 19th for bg
            total_keypoints_num += extract_keypoints(heatmaps[:, :, kpt_idx], all_keypoints_by_type, total_keypoints_num)

        pose_entries, all_keypoints = group_keypoints(all_keypoints_by_type, pafs)
        for kpt_id in range(all_keypoints.shape[0]):
            all_keypoints[kpt_id, 0] = (all_keypoints[kpt_id, 0] * stride / upsample_ratio - pad[1]) / scale
            all_keypoints[kpt_id, 1] = (all_keypoints[kpt_id, 1] * stride / upsample_ratio - pad[0]) / scale
        current_poses = []
        for n in range(len(pose_entries)):
            if len(pose_entries[n]) == 0:
                continue
            pose_keypoints = np.ones((num_keypoints, 2), dtype=np.int32) * -1
            for kpt_id in range(num_keypoints):
                if pose_entries[n][kpt_id] != -1.0:  # keypoint was found
                    pose_keypoints[kpt_id, 0] = int(all_keypoints[int(pose_entries[n][kpt_id]), 0])
                    pose_keypoints[kpt_id, 1] = int(all_keypoints[int(pose_entries[n][kpt_id]), 1])
            pose = Pose(pose_keypoints, pose_entries[n][18])
            current_poses.append(pose)

        if track:
            track_poses(previous_poses, current_poses, smooth=smooth)
            previous_poses = current_poses
        for pose in current_poses:
            pose.draw(img)
        img = cv2.addWeighted(orig_img, 0.6, img, 0.4, 0)
        for pose in current_poses:
            cv2.rectangle(img, (pose.bbox[0], pose.bbox[1]),
                          (pose.bbox[0] + pose.bbox[2], pose.bbox[1] + pose.bbox[3]), (0, 255, 0))
            if track:
                cv2.putText(img, 'id: {}'.format(pose.id), (pose.bbox[0], pose.bbox[1] - 16),
                            cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 0, 255))
        cv2.imwrite(f"{i}.jpg",img)
        fileUpload(f"{i}.jpg")

def fileUpload(file):
    blob = bucket.blob('7CxUbBGJwfWJfQCsNFK3/'+file)
    new_token = uuid4()
    metadata = {"firebaseStorageDownloadTokens": new_token}
    blob.metadata = metadata
    blob.upload_from_filename(filename='./'+file, content_type='image/jpg')

    doc_ref.set({
        u'uuid' : str(new_token)
    }, merge=True)

if __name__ == '__main__':

    cred = credentials.Certificate("./serviceAccountKey.json")
    firebase_admin.initialize_app(cred, {'storageBucket': "jbnudyd2022eswcontest.appspot.com"})
    db = firestore.client()

    while True:
        doc_ref = db.collection(u'Car').document(u'7CxUbBGJwfWJfQCsNFK3')
        doc = doc_ref.get()
        doc_dict = doc.to_dict()
        bucket = storage.bucket()
        url1 = f"http://{doc_dict['IP1']}:8080/stream/snapshot.jpeg?delay_s=0"
        url2 = f"http://{doc_dict['IP2']}:8080/stream/snapshot.jpeg?delay_s=0"
        url3 = f"http://{doc_dict['IP3']}:8080/stream/snapshot.jpeg?delay_s=0"

        if (doc_dict['사고여부'] == True):
            try:
                os.system("curl " + url1 + " > 1_prev.jpg")
                os.system("curl " + url2 + " > 2_prev.jpg")
                os.system("curl " + url3 + " > 3_prev.jpg")

                net = PoseEstimationWithMobileNet()
                checkpoint = torch.load('./checkpoint_iter_370000.pth', map_location='cpu')
                load_state(net, checkpoint)

                frame_provider1 = VideoReader('./1_prev.jpg')
                frame_provider2 = VideoReader('./2_prev.jpg')
                frame_provider3 = VideoReader('./3_prev.jpg')

                run_demo(net, frame_provider1, 256, True, 1, 1, 1)
                run_demo(net, frame_provider2, 256, True, 1, 1, 2)
                run_demo(net, frame_provider3, 256, True, 1, 1, 3)
            except:
                continue
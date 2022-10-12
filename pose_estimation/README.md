# Pose-Estimation
---

Real-time 2D Multi-Person Pose Estimation on CPU: Lightweight OpenPose을 참고하여 제작하였습니다.

---

## 환경
- Anaconda Python=3.9.12
- opencv-python
- pytorch
- pycocotool

```bash
pip install opencv-python
conda install pytorch torchvision torchaudio cpuonly -c pytorch
pip install Cython
pip install git+https://github.com/philferriere/cocoapi.git#egg=pycocotools^&subdirectory=PythonAPI
pip install firebase_admin
```

---

## 실행
```bash
python main.py
```

---

### 결과

- 폴더에 카메라에서 캡쳐한 이미지 3개가 저장됨
- 이후 저장된 이미지에서 Human Pose를 잡고, 이미지로 다시 출력함
- 출력한 이미지를 Firestore Storage에 저장함
- 무한반복
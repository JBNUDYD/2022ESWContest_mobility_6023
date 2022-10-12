import cam_controler
from gps import *
import time
import serial
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from multiprocessing import Process

def readArduinoData():
  while True:
    if com.in_waiting != 0 :
      content = com.readline()
      data = content[:-2].decode('utf-8', errors='replace')
      data_list = data.split()
      try:
        button = [data_list[0], data_list[1], data_list[2], data_list[3], data_list[4], data_list[5]]
      except:
        button = [0,0,0,0,0,0]
    if(button != [0,0,0,0,0,0]):
      doc_ref.set({
        u'사고여부': True
      }, merge=True)

    for i in range(0,6) :
      if(button[i]=='1'):
        if(button[0]=='1'):
          doc_ref.set({
          u'우상파손여부':1
          }, merge=True)
        if(button[1]=='1'):
          doc_ref.set({
          u'좌상파손여부':1
          }, merge=True)
        if(button[2]=='1'):
          doc_ref.set({
          u'우중파손여부':1
          }, merge=True)
        if(button[3]=='1'):
          doc_ref.set({
          u'좌중파손여부':1
          }, merge=True)
        if(button[4]=='1'):
          doc_ref.set({
          u'우하파손여부':1
          }, merge=True)
        if(button[5]=='1'):
          doc_ref.set({
          u'좌하파손여부':1
          }, merge=True)

def openCamera():
  result = CamControler.open(0)
  while True:
    for i in range(0,3):
      if result[i] != 3:
        result = CamControler.open(i+1)
        time.sleep(3)
    if result == [3,3,3]:
      break

def accidentOpenCamera():
  while True:
    doc = doc_ref.get()
    doc_dict = doc.to_dict()
    if(doc_dict['사고여부'] == True):
      openCamera()
      doc_ref.set({
          u'시간': time.strftime('%X',time.localtime(x))
          }, merge=True)
      break

def getPositionData(gps):
  nx = gpsd.next()
  if nx['class'] == 'TPV':
    lat = getattr(nx,'lat', "Unknown")
    lon = getattr(nx,'lon', "Unknown")
    if(lat != "Unknown" and lon != "Unknown" ):
      doc_ref.set({
        u'Lat': f"{lat}",
        u'Lon': f"{lon}"
        }, merge=True)


def getAndSendPositionToFirebase():
  try:
    while True:
      getPositionData(gpsd)
      time.sleep(1.0)
  except (KeyboardInterrupt):
    running = False

cred = credentials.Certificate("./serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
doc_ref = db.collection(u'Car').document(u'7CxUbBGJwfWJfQCsNFK3')
document = doc_ref.get()
document_dict = document.to_dict()

com = serial.Serial(port="/dev/ttyACM0", baudrate=9600)
button=[0,0,0,0,0,0]

gpsd = gps(mode=WATCH_ENABLE|WATCH_NEWSTYLE)

cam1_IP = document_dict["IP1"]
cam2_IP = document_dict["IP2"]
cam3_IP = document_dict["IP3"]
print(cam1_IP, cam2_IP, cam3_IP)

CamControler = cam_controler.CamControler(cam1_IP, cam2_IP, cam3_IP,)
result = CamControler.close(0)

p1 = Process(target=getAndSendPositionToFirebase)
p1.start()
p2 = Process(target=accidentOpenCamera)
p2.start()
p3 = Process(target=readArduinoData)
p3.start()
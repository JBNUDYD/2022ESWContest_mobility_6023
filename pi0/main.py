import cam_controler
import gps_test
import time

cam1_IP = '192.168.0.7'
cam2_IP = '192.168.0.9'
cam3_IP = '192.168.0.10'

CamControler = cam_controler.CamControler(cam1_IP, cam2_IP, cam3_IP)
result = CamControler.open(0)

while True:
  for i in range(0,3):
    if result[i] != 3:
      result = CamControler.open(i+1)
  
  if result == [3,3,3]:
    break

a = gps_test.gpsTransmit()
for i in range(0,10):
  a.gpsTransmit()
  time.sleep(1)
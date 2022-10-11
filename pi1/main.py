import socket
import os
import sys
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

UV4L_ON = "sudo service uv4l_raspicam restart"
UV4L_OFF = "sudo pkill uv4l"

IP1 = ""

def internetCheck():
  try:
    so = socket.setdefaulttimeout((3))
    so = socket.socket(socket.AF_INET, socket.SOCK_STREAM).connect(("google.com", 443))
    return True
  except:
    return False

while True:
  internet = internetCheck()
  if internet == False:
    continue
  else:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect(("google.com",443))
    IP1 = sock.getsockname()[0]
    sock.close()
    break

cred = credentials.Certificate("/home/pi1/pi1/serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
doc_ref = db.collection(u'Car').document(u'7CxUbBGJwfWJfQCsNFK3')

doc_ref.set({
  u'IP1':f"{IP1}"
}, merge=True)

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_socket.bind((IP1, 9000))
server_socket.listen(10)
server_socket.settimeout(None)

while True:
  client_socket, addr = server_socket.accept()
  data = client_socket.recv(65535)

  if(data.decode()=='close'):
    os.system(UV4L_OFF)
    print(data.decode())
  elif(data.decode()=='open'):
    os.system(UV4L_ON)
    print(data.decode())
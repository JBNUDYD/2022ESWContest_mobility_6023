import socket

class CamControler():
  def __init__(self, cam1_IP, cam2_IP, cam3_IP):
    self.cam1_IP = cam1_IP
    self.cam2_IP = cam2_IP
    self.cam3_IP = cam3_IP
    self.cam1 = 0
    self.cam2 = 0
    self.cam3 = 0
    self.result = [0,0,0]

  def close(self, num):
    if num == 0:
      self.cam1 = self.camClose(self.cam1_IP)
      self.cam2 = self.camClose(self.cam2_IP)
      self.cam3 = self.camClose(self.cam3_IP)
    elif num == 1:
      self.cam1 = self.camClose(self.cam1_IP)
    elif num == 2:
      self.cam2 = self.camClose(self.cam2_IP)
    elif num == 3:
      self.cam3 = self.camClose(self.cam3_IP)

    self.result = [self.cam1, self.cam2, self.cam3]
    self.printResult(self.result)
    return self.result

  def open(self, num):
    if num == 0:
      self.cam1 = self.camOpen(self.cam1_IP)
      self.cam2 = self.camOpen(self.cam2_IP)
      self.cam3 = self.camOpen(self.cam3_IP)
    elif num == 1:
      self.cam1 = self.camOpen(self.cam1_IP)
    elif num == 2:
      self.cam2 = self.camOpen(self.cam2_IP)
    elif num == 3:
      self.cam3 = self.camOpen(self.cam3_IP)

    self.result = [self.cam1, self.cam2, self.cam3]
    self.printResult(self.result)
    return self.result

  def camClose(self, IPAddress):
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.settimeout(3)

    try:
      client_socket.connect((IPAddress, 9000))
    except:
      return 1

    try:
      client_socket.send('close'.encode())
    except:
      return 2

    return 3

  def camOpen(self, IPAddress):
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.settimeout(3)

    try:
      client_socket.connect((IPAddress, 9000))
    except:
      return 1

    try:
      client_socket.send('open'.encode())
    except:
      return 2

    return 3

  def printResult(self, result):
    for i in range(0,len(result)):
      cam_num = i+1
      if result[i] == 1:
        print(f"cam{cam_num} connect failed")
      elif result[i] == 2:
        print(f"cam{cam_num} message send failed")
      elif result[i] == 3:
        print(f"cam{cam_num} complete")
      else:
        print(f"cam{cam_num} unknown error")
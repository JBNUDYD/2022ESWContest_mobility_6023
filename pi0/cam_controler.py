import socket

class CamControler():
  def __init__(self):
    self.cam1_IP = '192.168.0.7'
    self.cam2_IP = '192.168.0.9'
    self.cam3_IP = '192.168.0.10'
    self.cam1 = 0
    self.cam2 = 0
    self.cam3 = 0

  def close(self, num):
    if num == 0:
      self.cam1 = self.CamClose(self.cam1_IP)
      self.cam2 = self.CamClose(self.cam2_IP)
      self.cam3 = self.CamClose(self.cam3_IP)
    elif num == 1:
      self.cam1 = self.CamClose(self.cam1_IP)
    elif num == 2:
      self.cam2 = self.CamClose(self.cam2_IP)
    elif num == 3:
      self.cam3 = self.CamClose(self.cam3_IP)

    result = [self.cam1, self.cam2, self.cam3]

    return result

  def open(self, num):
    if num == 0:
      self.cam1 = self.CamOpen(self.cam1_IP)
      self.cam2 = self.CamOpen(self.cam2_IP)
      self.cam3 = self.CamOpen(self.cam3_IP)
    elif num == 1:
      self.cam1 = self.CamOpen(self.cam1_IP)
    elif num == 2:
      self.cam2 = self.CamOpen(self.cam2_IP)
    elif num == 3:
      self.cam3 = self.CamOpen(self.cam3_IP)

    result = [self.cam1, self.cam2, self.cam3]

    return result

  def CamClose(self, IPAddress):
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

  def CamOpen(self, IPAddress):
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
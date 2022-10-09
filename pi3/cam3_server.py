import socket
import os
import sys

UV4L_ON = "sudo service uv4l_raspicam restart"
UV4L_OFF = "sudo pkill uv4l"

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_socket.bind(('192.168.0.10', 9000))
server_socket.listen(10)

while True:
  client_socket, addr = server_socket.accept()
  data = client_socket.recv(65535)

  if(data.decode()=='close'):
    os.system(UV4L_OFF)
    print(data.decode())
  elif(data.decode()=='open'):
    os.system(UV4L_ON)
    print(data.decode())
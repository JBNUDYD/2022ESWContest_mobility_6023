import cam_controler

def PrintResult(result):
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


CamControler = cam_controler.CamControler()
result = CamControler.open(0)
PrintResult(result)

while True:
  for i in range(0,3):
    if result[i] != 3:
      result = CamControler.open(i+1)
      PrintResult(result)
  
  if result == [3,3,3]:
    break
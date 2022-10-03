## Raspberry Pi0

---

Raspberry Pi 0번에 대한 코드설명 입니다.

---

### Setting

#### GPS모듈
```bash
$ sudo apt-get update && sudo apt-get -y install gpsd gpsd-clients
$ sudo systemctl start gpsd.socket
$ sudo systemctl restart gpsd.socket
$ sudo systemctl status gpsd.socket # 모듈상태 확인
$ cpgs -s # 데이터 수신여부 확인
```

#### Firebase
```bash
$ pip install firebase_admin
$ pip3 install firebase_admin
```


### camControler.py

  - 다른 raspberry pi 보드의 카메라를 끄고 키게 할 수 있는 파일

  - `close(num)`에서 동작은 다음과 같다.
    - num=0 이면 모든카메라 꺼짐
    - num=1 이면 1번카메라 꺼짐
    - num=2 이면 2번카메라 꺼짐
    - num=3 이면 3번카메라 꺼짐
    - 후에 결과를 출력하고 반환 한다.

  - `open(num)`에서 동작은 다음과 같다.
    - num=0 이면 모든카메라 켜짐
    - num=1 이면 1번카메라 켜짐
    - num=2 이면 2번카메라 켜짐
    - num=3 이면 3번카메라 켜짐
    - 후에 결과를 출력하고 반환 한다.

  - `camClose(IPAddress)`에서 동작은 다음과 같다.
    - 해당 IP에 연결하여 소켓통신을 시작한다.
    - 이때, 연결에 실패하면 1, `'close'`전송을 실패하면 2, 성공하면 3을 반환 한다.

  - `camOpen(IPAddress)`에서 동작은 다음과 같다.
    - 해당 IP에 연결하여 소켓통신을 시작한다.
    - 이때, 연결에 실패하면 1, `'open'`전송을 실패하면 2, 성공하면 3을 반환 한다.

  - `printResult(result)`에서는 어떠한 결과가 나왔는지 출력해준다.

### main.py

  - raspberry pi 가동 시 돌아가는 파일
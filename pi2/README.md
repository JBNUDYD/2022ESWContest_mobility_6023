## Raspberry Pi0

---

Raspberry Pi2에 들어가는 파일들 입니다.

---

### 환경
- UV4L
- firebase_admin
- python 3.9.12

---

### 파일

- main.py
  - `internetCheck`함수를 통해 인터넷 접속여부를 확인합니다.
  - 인터넷 접속이 확인되면, IP주소를 Firebase로 전송합니다.
  - 이후 소켓서버를 열고 명령을 기다립니다.

- serviceAccountKey.json
  - 파이어베이스에 접속하기 위한 Key값 저장

---
### 기타

- `/etc/rc.local`의 마지막줄인 `exit 0` 전에 `python /home/pi2/pi2/main.py &` 추가
- `uv4l-raspicam.conf` 파일에서 weight과 height을 640*240으로 변경
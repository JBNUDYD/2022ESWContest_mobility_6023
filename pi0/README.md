## Raspberry Pi0

---

Raspberry Pi0에 들어가는 파일들 입니다.

---

### 환경
- serial
- firebase_admin
- multiprocessing
- gps
- python 3.9.12

---

### 파일
- cam_controler.py
  - 카메라를 끄고 키기 쉽게 하기 위해 만든 파일입니다.
  - `open(num)`으로 UV4L서비스를 실행하고, `close(num)`으로 UV4L 서비스를 종료합니다.
  - 소켓통신으로 통신합니다.
  - 결과로 숫자 3개를 리스트 형식으로 반환합니다. 1일경우 인터넷접속오류 2일경우 메세지전송오류 3일경우 전송성공 입니다.

- main.py
  - `multiprocessing`을 통해 3개의 함수를 동시실행 합니다.
  - 파이어베이스에 연결하여 데이터를 수정가능하게 합니다.
  - `getAndSendPositionToFirebase`
    - 위치정보 수집 및 전송
  - `accidentOpenCamera`
    - 사고발생 확인 후 UV4L 서비스 실행 명령을 전송
    - `cam_controler.py` 사용
  - `readArduinoData`
    - 아두이노의 데이터를 읽어오고 이를 토대로 파이어베이스에 데이터 전송

- serviceAccountKey.json
  - 파이어베이스에 접속하기 위한 Key값 저장

---
### 기타

- `/etc/rc.local`의 마지막줄인 `exit 0` 전에 `python /home/pi0/pi0/main.py &` 추가
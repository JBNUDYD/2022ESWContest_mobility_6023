## Web

---

Web제작 파일입니다.

---

### 환경
- node.js
- react-router-dom@5.3.3
- firebase

---

### 파일

- fbase.js
  - firebase 사용을 위한 키값이 있는 파일입니다.
- index.js
  - html을 만들기 위한 파일입니다. App.js를 불러옵니다.

- routes
  - Auth.js
    - 로그인창입니다.
  - Home.js
    - 메인화면입니다.
  - TrafficMap.js
    - 실시간 교통상황 화면입니다.
  - Catlist.js
    - 사고 차량정보 화면입니다.
  - Memberlist.js
    - 대원 정보 화면입니다.
  - Carinfo.js
    - 사고 차량의 세부정보 화면입니다.
  - Receiptlist.js
    - 출동설정을 하여 권한을 부여하기 위한 화면입니다.
- components
  - App.js
    - 웹 실행시 가장 먼저 실행되는 파일입니다.
  - Car.js
    - Carlist.js의 사고 차량 리스트 출력을 위한 파일입니다.
  - Map.js
    - 지도출력을 위한 파일입니다.
  - Member.js
    - Memberlist.js의 멤버 리스트 출력을 위한 파일입니다.
  - Receipt.js
    - Receiptlist.js의 멤버 리스트 출력을 위한 파일입니다.
  - Router.js
    - 링크에따라, 로그인 여부에따라 다른 페이지를 보여주기 위한 Path정보가 있는 파일입니다.
  - Weather.js
    - 날씨정보를 출력하기 위한 파일입니다.

---
### 기타

- `/etc/rc.local`의 마지막줄인 `exit 0` 전에 `python /home/pi3/pi3/main.py &` 추가
- `uv4l-raspicam.conf` 파일에서 weight과 height을 320*240으로 변경
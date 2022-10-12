# JBNUDYD
## 실시간 사고상황 전송시스템
### 제 20회 임베디드 소프트웨어 경진대회

---

#### 구성

- pi0
  - pi0에 들어가는 파일들 입니다.
  - 시리얼통신으로 데이터 송신, Pi1, Pi2, Pi3로 명령 전송, firebase에 데이터 전송을 합니다.

- pi1
  - pi1에 들어가는 파일들 입니다.
  - Pi0의 명령을 수신하여 UV4L 서비스를 시작하고, IP값을 firebase에 전송합니다.

- pi2
  - pi2에 들어가는 파일들 입니다.
  - Pi0의 명령을 수신하여 UV4L 서비스를 시작하고, IP값을 firebase에 전송합니다.

- pi3
  - pi3에 들어가는 파일들 입니다.
  - Pi0의 명령을 수신하여 UV4L 서비스를 시작하고, IP값을 firebase에 전송합니다.

- web
  - 웹 구성 파일입니다.
  - node.js, react를 활용하여 만들었습니다.
  - 차량 사고에 관련된 모든 정보들을 열람할 수 있습니다.

- pose_estimation
  - 자세추정을 하는 파일입니다.
  - Open Pose보다 더 가볍게 돌릴 수 있는 오픈소스를 사용하였습니다.
  - Pose-Estimation 완료 후 Firestore Storage로 이미지를 전송합니다.
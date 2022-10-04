import React, { useState } from "react";
import styles from "./Home.module.css"
import { dbService } from "fbase";
import { Link } from "react-router-dom";

const Home = ({userObj}) => {
  const [userName, setUserName] = useState("");
  dbService.collection("User").doc(userObj.uid).get().then((result)=>{
    setUserName(result.data().name)
  })
  return(
    <div>
      <div className="wrap">
        <div className={styles.intro_bg}>
          <div className={styles.header}>
            <div className={styles.name}>
              안녕하세요 ! {userName}님
            </div>
          </div>
        </div>
      </div>  

      <div className={styles.main_text0}>
        <ul className={styles.icons}>
          <li>
            <div className={styles.icon_img1} />
            <div className={styles.contents1_bold}>실시간 교통 상황</div>
            <div className={styles.contents2} >실시간 도로 교통 정보를 <br/> 확인할 수 있습니다</div>
            <button className={styles.go}>
              GO
            </button>
          </li>
          <li>      
            <div className={styles.icon_img2} />
            <div className={styles.contents1_bold}>신고 접수 차량</div>
            <div className={styles.contents2}>신고 접수된 차량의 정보를 <br/> 확인할 수 있습니다</div>
            <Link to="/carlist">
              <button className={styles.go}>
                GO
              </button>
            </Link>
          </li>
          <li>
            <div className={styles.icon_img3} />
            <div className={styles.contents1_bold}>구급 대원 정보</div>
            <div className={styles.contents2}>구급 대원 정보를 <br/> 열람할 수 있습니다</div>
            <button className={styles.go}>
              GO
            </button>
          </li>
        </ul>
      </div>

      <footer>
        <div>
          LOGO
        </div>
        <div>
          JBNUDYD <br/>
          Addr. 전라북도 전주시 덕진구 백제대로 56 <br/>
          063-270-2114 <br/>
          COPYRIGHT 2022. JBNUDYD. ALL RIGHT RESERVED.</div>
      </footer>
    </div>
  );
};

export default Home;
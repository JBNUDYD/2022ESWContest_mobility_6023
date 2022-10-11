import React, { useState, useEffect } from "react";
import styles from "./Carlist.module.css"
import { dbService } from "fbase";
import Car from "../components/Car"
import { Link } from "react-router-dom"

const Carlist = ({userObj}) => {
  const [carlist, setCarlist] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    dbService.collection("Car").onSnapshot((snapshot) => {
      const carlistArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarlist(carlistArray);
      console.log("hi")
    });
  }, []);
  useEffect(()=> {
    dbService.collection("User").doc(userObj.uid).get().then((doc) => {
      setUser(doc.data())
      console.log("no")
    });
  },[userObj.uid]);
  console.log(userObj.uid)
  console.log(user.권한)
  return(
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.nav}>
            <Link to ="/">
              <button className={styles.HOME}>Home</button>
            </Link>
          </div>
          <h1 className={styles.h1}>신고 접수 차량</h1>
          </div>
        <div className={styles.main}>
          <div className={styles.box}>
            <ul>
              {user.센터여부 ? (
                <>
                  {carlist.map((car) => (
                    <Car
                      key = {car.id}
                      car_id = {car.id}
                      car_lat = {car.Lat}
                      car_lon = {car.Lon}
                      car_res = {car.출동여부}
                      car_accident = {car.사고여부}
                      car_num = {car.차량번호}
                      car_type = {car.차종}
                      car_time = {car.시간}
                    />
                  ))}
                </>
            ) : (
                <>
                {user.권한 == " " ? (
                  <li>
                    권한이 없습니다.
                  </li>
                ) : (
                  <Link to={`/carinfo/${user.권한}`}>
                    <li>
                      차량 정보 확인
                    </li>
                  </Link>
                  )}
                </>
            )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carlist;
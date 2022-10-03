import React, { useState, useEffect } from "react";
import styles from "./Carlist.module.css"
import { dbService } from "fbase";
import Car from "../components/Car"

const Carlist = ({userObj}) => {
  const [carlist, setCarlist] = useState([]);
  useEffect(() => {
    dbService.collection("Car").onSnapshot((snapshot) => {
      const carlistArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarlist(carlistArray);
    });
  }, []);
  return(
    <div>
      <div className={styles.container}>
        <div className={styles.header}>        
          <h1>신고 접수 차량</h1></div>
        <div className={styles.main}>
          <div className={styles.box}>
            <ul>
              {carlist.map((car) => (
                <Car
                  car_id = {car.id}
                  car_ip = {car.IP}
                  car_accident = {car.사고여부}
                  car_num = {car.차량번호}
                  car_type = {car.차종}
                  car_place = {car.GPS}
                  car_time = {car.시간}
                  car_progress = {car.출동여부}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carlist;
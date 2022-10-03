import React from "react";
import styles from "./Car.module.css"
import { Link } from "react-router-dom";

const Car = ({ car_id, car_ip, car_accident, car_num, car_type, car_place, car_time, car_progress }) => {
  if(car_accident === false){
    return
  }
  else{
    return (
      <Link to={`/carinfo/${car_id}`}>
        <li>
          <span className={styles.number}></span>
          <span className={styles.car_number}>{car_num}</span>
          <span className={styles.type}>{car_type}</span>
          <span className={styles.place}>서울 송파구 올림픽로 25</span>
          <span className={styles.time}>{car_time}</span>
          <span className={styles.progress1}>완료</span>
        </li>
      </Link>
    );
  }
};

export default Car;
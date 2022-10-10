/*global kakao*/
import React, { useState, useEffect } from "react";
import styles from "./Car.module.css"
import { Link } from "react-router-dom";

const Car = ({ car_id, car_lat, car_lon, car_res, car_accident, car_num, car_type, car_time }) => {
  const [location, setLocation] = useState([]);
  useEffect(() => {
    let geocoder = new kakao.maps.services.Geocoder();
    let coord = new kakao.maps.LatLng(car_lat, car_lon);
    let callback = function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            setLocation(result[0].address.address_name)
        }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  })
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
          <span className={styles.place}>{location}</span>
          <span className={styles.time}>{car_time}</span>
          {car_res ? <span className={styles.progress1}>출동</span> : <span className={styles.progress3}>대기</span>}
        </li>
      </Link>
    );
  }
};

export default Car;
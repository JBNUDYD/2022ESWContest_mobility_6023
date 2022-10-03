import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { dbService } from "fbase";
import styles from "./Carinfo.module.css"

const Carinfo = () => {
  const location = useLocation()
  const ID = location.pathname.substring(9)
  const onClick = (() =>{
    console.log("hi")
  })
  const [cardata, setCardata] = useState([]);
  useEffect(()=> {
    dbService.collection("Car").doc(ID).get().then((doc) => {
      setCardata(doc.data())
    });
  }, []);
  console.log(cardata.IP)
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ul className={styles.nav}>
          <li className={styles.car_information}>{cardata.차량번호} / {cardata.차종}</li>
          <button className={styles.YES} onClick={onClick}>접수</button>
        </ul>
      </div>
      <div className={styles.camera}>
        <div className={styles.layer}>
          <h1>실시간 영상</h1>
          <div className={styles.camera_a}>
            <ul className={styles.box}>
              <li>
              <iframe src={`http://${cardata.IP}:2000/stream`} width="350px" height="270px" name="iframe_1" title="camera"></iframe>
              </li>
              <li>
              <iframe src={`http://${cardata.IP}:3000/stream`} width="350px" height="260px" name="iframe_2" title="camera"></iframe>
            </li>
            </ul>
          </div>
          <div className={styles.camera_b}>
            <iframe src={`http://${cardata.IP}:1000/stream`} width="760px" height="300px" name="iframe_3" title="camera"></iframe>
          </div>
        </div>
      </div>
      <div className={styles.car}>
        <h2>차량 파손 부위</h2>
        <div className={styles.broken}>
            <div className={styles.part1}></div>
            <div className={styles.part2}></div>
            <div className={styles.part3}></div>
            <div className={styles.part4}></div>
            <div className={styles.part5}></div>
            <div className={styles.part6}></div>
          </div>
      </div>
      <div className={styles.map_weather}>
        <ul className={styles.mp_list}>
          <li className={styles.map_link}>
            <iframe src="https://eei.jbnu.ac.kr/eei/index.do" width="600px" height="400px" name="iframe_4" title="map"></iframe>
          </li>
          <li className={styles.weather_link}>
            <iframe src="https://eei.jbnu.ac.kr/eei/index.do" width="600px" height="400px" name="iframe_5" title="weather"></iframe>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Carinfo;
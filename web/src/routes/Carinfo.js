import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { dbService } from "fbase";
import styles from "./Carinfo.module.css"
import Map from "components/Map"
import Weather from "components/Weather"
import "./Carinfo.css"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faCoffee } from '@fortawesome/free-solid-svg-icons'

const Carinfo = () => {
  const [cardata, setCardata] = useState([]);
  const [part1Color, setPart1Color] = useState("");
  const [part2Color, setPart2Color] = useState("");
  const [part3Color, setPart3Color] = useState("");
  const [part4Color, setPart4Color] = useState("");
  const [part5Color, setPart5Color] = useState("");
  const [part6Color, setPart6Color] = useState("");
  const [temp, setTemp] = useState();
  const [weather, setWeather] = useState();
  const location = useLocation()
  const ID = location.pathname.substring(9)
  useEffect(()=> {
    dbService.collection("Car").doc(ID).get().then((doc) => {
      setCardata(doc.data())
    });
  });
  const lat = cardata.Lat;
  const lon = cardata.Lon;
  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=06ce98a6a1c135b09dafcacab7106b0a&units=metric`)
    .then(res => res.json())
    .then(data => {
      const temp = data.main.temp;
      const weathers = data.weather[data.weather.length - 1];
      setTemp(temp);
      setWeather(weathers.main);
    })
  },[ lat, lon])
  useEffect(()=>{
    if(cardata.우상파손여부 === 0){
      setPart1Color("part1_green")
    }
    else if(cardata.우상파손여부 === 1){
      setPart1Color("part1_yellow")
    }
    else if(cardata.우상파손여부 === 2){
      setPart1Color("part1_red")
    }
  }, [cardata.우상파손여부])
  useEffect(()=>{
    if(cardata.우중파손여부 === 0){
      setPart2Color("part2_green")
    }
    else if(cardata.우중파손여부 === 1){
      setPart2Color("part2_yellow")
    }
    else if(cardata.우중파손여부 === 2){
      setPart2Color("part2_red")
    }
  }, [cardata.우중파손여부])
  useEffect(()=>{
    if(cardata.우하파손여부 === 0){
      setPart3Color("part3_green")
    }
    else if(cardata.우하파손여부 === 1){
      setPart3Color("part3_yellow")
    }
    else if(cardata.우하파손여부 === 2){
      setPart3Color("part3_red")
    }
  }, [cardata.우하파손여부])
  useEffect(()=>{
    if(cardata.좌상파손여부 === 0){
      setPart4Color("part4_green")
    }
    else if(cardata.좌상파손여부 === 1){
      setPart4Color("part4_yellow")
    }
    else if(cardata.좌상파손여부 === 2){
      setPart4Color("part4_red")
    }
  }, [cardata.좌상파손여부])
  useEffect(()=>{
    if(cardata.좌중파손여부 === 0){
      setPart5Color("part5_green")
    }
    else if(cardata.좌중파손여부 === 1){
      setPart5Color("part5_yellow")
    }
    else if(cardata.좌중파손여부 === 2){
      setPart5Color("part5_red")
    }
  }, [cardata.좌중파손여부])
  useEffect(()=>{
    if(cardata.좌하파손여부 === 0){
      setPart6Color("part6_green")
    }
    else if(cardata.좌하파손여부 === 1){
      setPart6Color("part6_yellow")
    }
    else if(cardata.좌하파손여부 === 2){
      setPart6Color("part6_red")
    }
  }, [cardata.좌하파손여부])
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ul className={styles.nav}>
          <li className={styles.car_information}>{cardata.차량번호} / {cardata.차종}</li>
          <Link to ={`/receipt/${ID}`}>
            <button className={styles.YES}>접수</button>
          </Link>
          <Link to ="/">
            <button className={styles.HOME}>Home</button>
          </Link>
        </ul>
      </div>
      <div className={styles.camera}>
        <div className={styles.layer}>
          <h1 className={styles.h1}>실시간 영상</h1>
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
        <h2 className={styles.h2}>차량 파손 부위</h2>
        <div className={styles.broken}>
            <div className={part1Color}></div>
            <div className={part2Color}></div>
            <div className={part3Color}></div>
            <div className={part4Color}></div>
            <div className={part5Color}></div>
            <div className={part6Color}></div>
          </div>
      </div>
      <div className={styles.map_weather}>
        <ul className={styles.mp_list}>
          <li className={styles.map_link}>
            <Map 
              Lat = {cardata.Lat}
              Lon = {cardata.Lon}
              style={{width:"600px", height:"600px"}}
            />
          </li>
          <li>
            <Weather
              temp = {temp}
              weather = {weather}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Carinfo;
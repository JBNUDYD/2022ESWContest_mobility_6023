import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { dbService } from "fbase";
import styles from "./Carinfo.module.css"
import Map from "components/Map"
import Weather from "components/Weather"
import "./Carinfo.css"
import { Link } from "react-router-dom"

const Carinfo = ({ userObj }) => {
  const [cardata, setCardata] = useState([]);
  const [part1Color, setPart1Color] = useState("");
  const [part2Color, setPart2Color] = useState("");
  const [part3Color, setPart3Color] = useState("");
  const [part4Color, setPart4Color] = useState("");
  const [part5Color, setPart5Color] = useState("");
  const [part6Color, setPart6Color] = useState("");
  const [temp, setTemp] = useState();
  const [weather, setWeather] = useState();
  const [user, setUser] = useState([]);
  const location = useLocation()
  const ID = location.pathname.substring(9)
  const lat = cardata.Lat;
  const lon = cardata.Lon;
  const onClick = () =>{
    dbService.doc(`Car/${ID}`).update({
      사고여부: false,
      출동여부: false
    })
    dbService.doc(`User/${userObj.uid}/`).update({
      사고여부: false,
      출동여부: false,
      출동가능여부: true,
      Lat : 0,
      Lon : 0,
      차종 : "",
      권한 : " ",
      시간 : "",
    })
    dbService.doc(`User/${user.센터UID}/대원/${user.name}/`).update({
      출동가능여부: true,
    })
    alert("구조가 완료되었습니다.")
  }
  useEffect(()=> {
    dbService.collection("User").doc(userObj.uid).get().then((doc) => {
      setUser(doc.data())
    });
  });
  useEffect(()=> {
    dbService.collection("Car").doc(ID).get().then((doc) => {
      setCardata(doc.data())
    });
  },);
  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=06ce98a6a1c135b09dafcacab7106b0a&units=metric`)
    .then(res => res.json())
    .then(data => {
      const temp = data.main.temp;
      const weathers = data.weather[data.weather.length - 1];
      setTemp(temp);
      setWeather(weathers.main);
    })
  },[lat, lon])
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
          {user.센터여부 ?(
            <Link to ={`/receipt/${ID}`}>
              <button className={styles.YES}>접수</button>
            </Link>
          ) : (
            <Link to="/">
              <button className={styles.YES} onClick={onClick}>완료</button>
            </Link>
          )
        }
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
              <iframe src={`https://firebasestorage.googleapis.com/v0/b/jbnudyd2022eswcontest.appspot.com/o/${ID}%2F2.jpg?alt=media&token=${cardata.uuid}`} width="330px" height="250px" name="iframe_1" title="camera"></iframe>
              </li>
              <li>
              <iframe src={`https://firebasestorage.googleapis.com/v0/b/jbnudyd2022eswcontest.appspot.com/o/${ID}%2F3.jpg?alt=media&token=${cardata.uuid}`} width="330px" height="250px" name="iframe_2" title="camera"></iframe>
            </li>
            </ul>
          </div>
          <div className={styles.camera_b}>
            <iframe src={`https://firebasestorage.googleapis.com/v0/b/jbnudyd2022eswcontest.appspot.com/o/${ID}%2F1.jpg?alt=media&token=${cardata.uuid}`} width="750px" height="290px" name="iframe_3" title="camera"></iframe>
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
/*global kakao*/
import React, { useEffect, useState } from 'react'
import { dbService } from "fbase";
import styles from "./TrafficMap.module.css"
import { Link } from "react-router-dom"

const TrafficMap=({ userObj })=>{
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  dbService.collection("User").doc(userObj.uid).get().then((result)=>{
    setLat(result.data().Lat)
  })
  dbService.collection("User").doc(userObj.uid).get().then((result)=>{
    setLon(result.data().Lon)
  })
  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 3
    };

    var map = new kakao.maps.Map(container, options);
    var markerPosition  = new kakao.maps.LatLng(lat, lon); 
    var marker = new kakao.maps.Marker({
      position: markerPosition
    });
  marker.setMap(map);
  map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  
  },[lat, lon])

  return (
  <div className={styles.container}>
    <div className={styles.header}>
      <ul className={styles.nav}>
        <Link to ="/">
          <button className={styles.HOME}>Home</button>
        </Link>
      </ul>
    </div>
    <div className={styles.camera}>
      <div className={styles.layer}>
        <h1 className={styles.h1}>실시간 교통 정보</h1>
      </div>
    </div>
    <div className={styles.map_weather}>
      <ul className={styles.mp_list}>
        <li className={styles.map_link}>
        <div id="map" style={{width:"1000px", height:"1000px", margin:"auto"}}></div>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default TrafficMap;
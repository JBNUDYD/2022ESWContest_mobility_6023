import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import styles from "./Receipt.module.css"
  
const Receipt = ({ member, ID, member_name, member_location, member_position, member_able, userObj, userUID }) => {
  const [carinfo, setCarinfo] = useState();
  useEffect(()=> {
    dbService.collection("Car").doc(ID).get().then((doc) => {
      setCarinfo(doc.data())
    });
  })
  const onClick = () =>{
    if(member_able === true){
      dbService.doc(`User/${userObj.uid}/대원/${member}`).update({
        출동가능여부: false,
        권한 : ID,
      })
      dbService.doc(`Car/${ID}`).update({
        출동여부: true,
      })
      dbService.doc(`User/${userUID}`).update({
        Lat: carinfo.Lon,
        Lon: carinfo.Lat,
        권한: ID,
        시간: carinfo.시간,
        차종: carinfo.차종,
        출동가능여부: false,
        출동여부:true
      })
      alert("출동했습니다!")
    }
    else{
      alert("출동이 불가능합니다!")
    }
  }
  return (      
    <li onClick={onClick}>
      <span className={styles.number}></span>
      <span className={styles.name}>{member_name}</span>
      <span className={styles.company}>{member_location}</span>
      <span className={styles.position}>{member_position}</span>
      {member_able ? <span className={styles.working2}>출동가능</span> : <span className={styles.working1}>출동불가</span>}
    </li>
  );
};

export default Receipt;
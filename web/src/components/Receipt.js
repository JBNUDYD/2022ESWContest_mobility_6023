import React from "react";
import { dbService } from "fbase";
import styles from "./Receipt.module.css"
  
const Receipt = ({ member, ID, member_name, member_location, member_position, member_able, userObj }) => {
  const onClick = () =>{
    if(member_able === true){
      dbService.doc(`User/${userObj.uid}/대원/${member}`).update({
        출동가능여부: false,
        권한 : ID,
      })
      dbService.doc(`Car/${ID}`).update({
        출동여부: true,
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
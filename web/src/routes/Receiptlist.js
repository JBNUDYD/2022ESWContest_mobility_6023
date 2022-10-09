import React, { useState, useEffect } from "react";
import styles from "./Receiptlist.module.css"
import { dbService } from "fbase";
import { useLocation } from "react-router-dom";
import Receipt from "../components/Receipt"
import { Link } from "react-router-dom"

const Receiptlist = ({userObj}) => {
  const [memberlist, setMemberlist] = useState([]);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    dbService.collection("User").doc(userObj.uid).collection("대원").onSnapshot((snapshot) => {
      const memberlistArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMemberlist(memberlistArray);
    });
  }, [userObj.uid]);
  dbService.collection("User").doc(userObj.uid).get().then((result)=>{
    setUserName(result.data().name)
  })
  const location = useLocation()  
  const ID = location.pathname.substring(9)
  return(
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <ul className={styles.nav}>
            <Link to ="/">
              <button className={styles.HOME}>Home</button>
            </Link>
          </ul>
          <h1 className={styles.h1}>구급 대원 정보</h1>
        </div>
        <div className={styles.main}>
          <div className={styles.box}>
            <ul>
              {memberlist.map((member) => (
                <Receipt
                  key = {member.id}
                  member = {member.id}
                  ID = {ID}
                  member_name = {member.이름}
                  member_location = {userName}
                  member_position = {member.직책}
                  member_able = {member.출동가능여부}
                  userObj = {userObj}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receiptlist;
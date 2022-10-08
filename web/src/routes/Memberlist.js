import React, { useState, useEffect } from "react";
import styles from "./Memberlist.module.css"
import { dbService } from "fbase";
import Member from "../components/Member"
import { Link } from "react-router-dom"

const Memberlist = ({userObj}) => {
  const [memberlist, setMemberlist] = useState([]);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");
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
  useEffect(()=> {
    dbService.collection("User").doc(userObj.uid).get().then((doc) => {
      setUser(doc.data())
    });
  });
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
            {user.센터여부 ? (
                <>
              {memberlist.map((member) => (
                <Member
                  member_name = {member.이름}
                  member_location = {userName}
                  member_position = {member.직책}
                  member_able = {member.출동가능여부}
                />
              ))}
                </>
            ) : (
                <li>
                  권한이 없습니다.
                </li>
            )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memberlist;
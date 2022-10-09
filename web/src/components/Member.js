import React from "react";
import styles from "./Member.module.css"

const Member = ({ member_name, member_location, member_position, member_able }) => {
  return (      
    <li>
      <span className={styles.number}></span>
      <span className={styles.name}>{member_name}</span>
      <span className={styles.company}>{member_location}</span>
      <span className={styles.position}>{member_position}</span>
      {member_able ? <span className={styles.working2}>출동가능</span> :  <span className={styles.working1}>출동불가</span>}
    </li>
  );
};

export default Member;
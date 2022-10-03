import { authService } from '../fbase';
import React,{ useState } from 'react';
import styles from "./Auth.module.css"

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {target:{name,value}} = event;
    if(name === "email"){
      setEmail(value)
    }
    else if(name === "password"){
      setPassword(value)
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      data = await authService.signInWithEmailAndPassword(
        email,
        password
      );
      console.log(data);
    }
    catch (error) {
      setError(error.message);
    }
  };
  return(
    <body className={styles.body}>
      <section className={styles.login_form}>
        <form action="" onSubmit={onSubmit}>
          <div className={styles.int_area}>
            <input type="text" name="email" autocomplete="off" required onChange={onChange} />
            <label htmlFor="id">USER NAME</label>
          </div>
          <div className={styles.int_area}>
            <input type="password" name="password" autocomplete="off" required onChange={onChange} />
            <label htmlFor="pw">PASSWORD</label>
          </div>
          {error}
          <div className={styles.btn_area}>
            <button type="submit">LOGIN</button>
          </div>
        </form>
      </section>
    </body>
  )
};

export default Auth;
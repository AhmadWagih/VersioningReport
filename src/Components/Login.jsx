import React from "react";
import { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { LoginUser } from "../../APIs/auth";
// import AuthContext from '../context/AuthProvider';
// // import axios from 'axios';
// // const LOGIN_URL ='/auth';
import { ToastContainer } from "react-toastify";

// import "../../styles/Login.css";
import classes from "./Login.modules.css";

const Login = () => {
  // const {setAuth} = useContext(AuthContext)
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const Navigate = useNavigate();
  // const [success, setSuccess] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await LoginUser(user, pwd);
    console.log(JSON.stringify(response?.data));
    if (response) {
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      //  setAuth(user,pwd,roles,accessToken)
      setUser("");
      setPwd("");
      Navigate("/home");
    }
  };*/

  return (
    <>
      <ToastContainer />
      <section style={{ margin: "auto" }}>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <div className={classes.container}>
          <div className="row">
            <div className="col-md-5 mx-auto">
              <div id="first">
                <div className="formstyle  ">
                  <div className="logo mb-3">
                    <div className="col-md-12 text-center">
                      <h1 className={classes.headerform}>Login</h1>
                    </div>
                  </div>

                  <form /*onSubmit={handleSubmit}*/>
                    <div className={classes.formGroup}>
                      <label htmlFor="username" className="Uform">
                        Username:
                      </label>
                      <input
                        className="form-control general"
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                      />
                    </div>
                    <div className={classes.formGroup}>
                      <label htmlFor="password" className="Uform general">
                        Password:
                      </label>
                      <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-12 text-center ">
                      <button type="submit" className={classes.btn}>
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

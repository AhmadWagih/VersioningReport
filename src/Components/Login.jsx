import React from "react";
import { useRef, useState, useEffect } from "react";
import { LoginUser } from "../APIs/auth";
import { ToastContainer } from "react-toastify";

import classes from "./Login.module.css";

const Login = ({setToken}) => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await LoginUser(user, pwd);
    if (response) {
      const accessToken = response;
      setToken(accessToken);
      window.location = window.location.href;
    }
  };

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
                      <h1 className={classes.mainTitle}>Login</h1>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
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

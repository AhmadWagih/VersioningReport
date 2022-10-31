import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../APIs/auth";
import { ToastContainer } from "react-toastify";

import classes from "./Login.module.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    const response = await RegisterUser(user, email, pwd);
    //clear state and controlled inputs
    //need value attrib on inputs for this
    console.log(response);
    if (response) {
      setUser("");
      setPwd("");
      setMatchPwd("");
      navigate("/login");
    }
  };

  return (
    <>
      <ToastContainer />
      <section className={classes.Appbody}>
        <p
          ref={errRef}
          className={errMsg ? classes.errmsg : classes.offscreen}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <div className={classes.container}>
          <div className="row">
            <div className="col-md-5 mx-auto">
              <div id="seconed">
                <div className="formstyle  ">
                  <div className="logo mb-3">
                    <div className="col-md-12 text-center">
                      <h1 className={classes.headerform}>Signup</h1>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="username" className="Uform">
                        Username:
                        <i
                          className={
                            validName
                              ? "fa-solid fa-check " + classes.valid
                              : "fa-solid fa-check d-none"
                          }
                        ></i>
                        <i
                          className={
                            validName || !user
                              ? "fa-solid fa-times d-none"
                              : "fa-solid fa-times " + classes.invalid
                          }
                        ></i>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                      />
                    </div>
                    <p
                      id="uidnote"
                      className={
                        userFocus && user && !validName
                          ? classes.instructions
                          : classes.offscreen
                      }
                    >
                      <i className="fa-solid fa-info-circle"></i>
                      4 to 24 characters.
                      <br />
                      Must begin with a letter.
                      <br />
                      Letters, numbers, underscores, hyphens allowed.
                    </p>
                    <div className="form-group">
                      <label htmlFor="email" className="Uform">
                        Email:
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password" className="Uform">
                        Password:
                        <i
                          className={
                            validPwd
                              ? "fa-solid fa-check " + classes.valid
                              : "fa-solid fa-check d-none"
                          }
                        ></i>
                        <i
                          className={
                            validPwd || !pwd
                              ? "fa-solid fa-times d-none"
                              : "fa-solid fa-times " + classes.invalid
                          }
                        ></i>
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                      />
                    </div>
                    <p
                      id="pwdnote"
                      className={
                        pwdFocus && !validPwd
                          ? classes.instructions
                          : classes.offscreen
                      }
                    >
                      <i className="fa-solid fa-info-circle"></i>
                      8 to 24 characters.
                      <br />
                      Must include uppercase and lowercase letters, a number and
                      a special character.
                      <br />
                      Allowed special characters:{" "}
                      <span aria-label="exclamation mark">!</span>{" "}
                      <span aria-label="at symbol">@</span>{" "}
                      <span aria-label="hashtag">#</span>{" "}
                      <span aria-label="dollar sign">$</span>{" "}
                      <span aria-label="percent">%</span>
                    </p>

                    <div className="form-group">
                      <label htmlFor="confirm_pwd" className="Uform">
                        Confirm Password:
                        <i
                          className={
                            validMatch && matchPwd
                              ? "fa-solid fa-check " + classes.valid
                              : "fa-solid fa-check d-none"
                          }
                        ></i>
                        <i
                          className={
                            validMatch || !matchPwd
                              ? "fa-solid fa-times d-none"
                              : "fa-solid fa-times " + classes.invalid
                          }
                        ></i>
                        {/* <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} /> */}
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                      />
                    </div>
                    <p
                      id="confirmnote"
                      className={
                        matchFocus && !validMatch
                          ? classes.instructions
                          : classes.offscreen
                      }
                    >
                      {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                      <i className="fa-solid fa-info-circle"></i>
                      Must match the first password input field.
                    </p>

                    <div className="col-md-12 text-center mb-3">
                      <button
                        type="submit"
                        className=" btn btn-block btnstyle btn-primary tx-tfm m-3"
                        disabled={
                          !validName || !validPwd || !validMatch ? true : false
                        }
                      >
                        Get Started For Free
                      </button>
                    </div>
                    <div className="col-md-12 ">
                      <div className="form-group">
                        <p className="text-center">
                          <Link to="/" id="signin">
                            Already have an account?
                          </Link>
                        </p>
                      </div>
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

export default Register;

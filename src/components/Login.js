import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { googleProvider } from "../config/authMethods";
import styles from "./Login.module.css";
import GoogleIcon from "../icons/google-icon.svg";
import FacebookIcon from "../icons/facebook-icon.svg";
import AppleIcon from "../icons/apple-icon.svg";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, socialMediaLogIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleLogIn() {
    //e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  async function handleOnClick(provider) {
    try {
      setError("");
      setLoading(true);
      const res = await socialMediaLogIn(provider);
      console.log(res);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
  }

  return (
    <>
      <div className={styles.popup}>
        <div className={styles.popupHeader}> Log in to the bank</div>
        <div className={styles.popupBody}>
          <button
            className={styles.thirdpartyauthButton}
            disabled={loading}
            onClick={() => handleOnClick(googleProvider)}
          >
            <img className={styles.popupIcon} alt="google" src={GoogleIcon}></img>
            Continue with Google
          </button>
          <button
            className={styles.thirdpartyauthButton}
            disabled={loading}
            onClick={() => handleOnClick(googleProvider)}
          >
            <img className={styles.popupIcon} alt="facebook" src={FacebookIcon}></img>
            Continue with Facebook
          </button>
          <button
            className={styles.thirdpartyauthButton}
            disabled={loading}
            onClick={() => handleOnClick(googleProvider)}
          >
            <img className={styles.popupIcon} alt="google" src={AppleIcon}></img>
            Continue with Apple
          </button>
          <div className={styles.division}></div>
          <input
            className={styles.popupInput}
            placeholder="Email"
            type="email"
            ref={emailRef}
            required
          ></input>
          <input
            className={styles.popupInput}
            placeholder="Password"
            type="password"
            ref={passwordRef}
            required
          ></input>
          <button
            className={styles.popupButton}
            disabled={loading}
            onClick={() => handleLogIn()}
          >
            Log In
          </button>
          <p className={styles.popupForgotPassword}>Forgot password?</p>
          <div className={styles.division}></div>
          <p className={styles.popupNeedAccount}>
            Need an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
}

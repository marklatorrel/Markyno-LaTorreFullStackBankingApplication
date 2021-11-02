import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Row } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { googleProvider } from "../config/authMethods";
import styles from "./Signup.module.css";
import GoogleIcon from "../icons/google-icon.svg";
import FacebookIcon from "../icons/facebook-icon.svg";
import AppleIcon from "../icons/apple-icon.svg";

export default function Signup() {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, socialMediaLogIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSingin() {
    //e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      alert("Passwords do not match");
      return 
      //return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
      alert("New user created");
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  async function handleOnClick(provider) {
    try {
      setError("");
      setLoading(true);
      const res = await socialMediaLogIn(provider);
      console.log(res);
      alert("New user created");
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
  }

  return (
    <>
      <div className={styles.popup}>
        <div className={styles.popupHeader}> Sign up to Stratton Oakmont Bank</div>
        <div className={styles.popupBody}>
          <button
            className={styles.thirdpartyauthButton}
            disabled={loading}
            onClick={() => handleOnClick(googleProvider)}
          >
            <img className={styles.popupIcon} alt="google" src={GoogleIcon}></img>
            Continue with Google
          </button>
          <div className={styles.division}></div>
          <p className={styles.miniHeader}>Sign up using email</p>
          <input
            className={styles.popupInput}
            placeholder="Name"
            type="name"
            ref={nameRef}
            required
          ></input>
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
          <input
            className={styles.popupInput}
            placeholder="Password Confirmation"
            type="password"
            ref={passwordConfirmRef}
            required
          ></input>
          <button
            className={styles.popupButton}
            disabled={loading}
            onClick={() => handleSingin()}
          >
            Sign Up
          </button>
          <p className={styles.popupTermsOfSeervice}>At signing up you accept our <Link to="/signup">Terms of Service</Link></p>
          <div className={styles.division}></div>
          <p className={styles.popupNeedAccount}>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </>
  );
}

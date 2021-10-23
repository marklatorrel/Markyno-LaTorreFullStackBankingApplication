import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { googleProvider } from "../config/authMethods";
import "./Login.css";
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
      <div className="login">
        <div className="loginHeader"> Log in to the bank</div>
        <div className="loginBody">
          <button
            className="thirdpartyauthButton"
            disabled={loading}
            onClick={() => handleOnClick(googleProvider)}
          >
            <img className="loginIcon" alt="google" src={GoogleIcon}></img>
            Continue with Google
          </button>
          <button
            className="thirdpartyauthButton"
            disabled={loading}
            onClick={() => handleOnClick(googleProvider)}
          >
            <img className="loginIcon" alt="facebook" src={FacebookIcon}></img>
            Continue with Facebook
          </button>
          <button
            className="thirdpartyauthButton"
            disabled={loading}
            onClick={() => handleOnClick(googleProvider)}
          >
            <img className="loginIcon" alt="apple" src={AppleIcon}></img>
            Continue with Apple
          </button>
          <div className="division"></div>
          <input
            className="loginInput"
            placeholder="Email"
            type="email"
            ref={emailRef}
            required
          ></input>
          <input
            className="loginInput"
            placeholder="Password"
            type="password"
            ref={passwordRef}
            required
          ></input>
          <button
            className="loginButton"
            disabled={loading}
            onClick={() => handleLogIn()}
          >
            Log In
          </button>
          <p className="loginForgotPassword">Forgot password?</p>
          <div className="division"></div>
          <p className="loginNeedAccount">
            Need an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
}

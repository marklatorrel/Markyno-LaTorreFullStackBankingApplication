import React from "react";
import { useAuth } from "../contexts/AuthContext";
//import "./DashboardOptions.css";
import styles from "./DashboardOptions.module.css";
import DepositIcon from "../icons/deposit-icon.svg";
import WithdrawIcon from "../icons/withdraw-icon.svg";
import { Link } from "react-router-dom";

export default function DashboardOptions() {
  const { user } = useAuth();

  return (
    <>
      <div className={styles.dashboardOptions}>
        <div className={styles.title}>
          Welcome {user.name}, tell us what you need?
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/deposit">
            <button
              className={styles.button}
              //disabled={loading}
              //onClick={() => handleOnClick(googleProvider)}
            >
              <img className={styles.icon} alt="google" src={DepositIcon}></img>
              Deposit money
            </button>
          </Link>
          <Link to="/deposit">
            <button
              className={styles.button}
              //disabled={loading}
              //onClick={() => handleOnClick(googleProvider)}
            >
              <img
                className={styles.icon}
                alt="google"
                src={WithdrawIcon}
              ></img>
              Withdraw money
            </button>
          </Link>
          <Link to="/withdraw">
            <button
              className={styles.button}
              //disabled={loading}
              //onClick={() => handleOnClick(googleProvider)}
            >
              <img
                className={styles.icon}
                alt="google"
                src={WithdrawIcon}
              ></img>
              See my account
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

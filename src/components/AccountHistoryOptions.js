import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./AccountHistoryOptions.module.css";
import { Link } from "react-router-dom";
import TransactionTable from "./TransactionTable";

export default function AccountHistoryOptions() {
  const { user } = useAuth();
  const [accountPressed, setAccountPressed] = useState("");

  useEffect(() => {}, [user]);

  return (
    <>
      {accountPressed === "" && (
        <div className={styles.card}>
          <div className={styles.title}> Choose your account </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.button}
              onClick={() => setAccountPressed("USD")}
            >
              <div className={styles.buttonTitle}>USD Account</div>
              <div className={styles.buttonAccount}>
                {user.account[0].accountNumber}
              </div>
            </button>

            <button
              className={styles.button}
              onClick={() => setAccountPressed("EUR")}
            >
              <div className={styles.buttonTitle}>EUR Account</div>
              <div className={styles.buttonAccount}>
                {user.account[1].accountNumber}
              </div>
            </button>
          </div>
        </div>
      )}
      {accountPressed === "USD" && (
        <TransactionTable account="USD"></TransactionTable>
      )}
      {accountPressed === "EUR" && (
        <TransactionTable account="EUR"></TransactionTable>
      )}
    </>
  );
}

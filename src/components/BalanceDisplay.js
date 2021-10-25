import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./BalanceDisplay.module.css";

export default function BalanceDisplay() {
  const { user } = useAuth();

  useEffect(() => {
  }, [user]);
  
  return (
    <div className={styles.balanceDisplay}>
      <div className={styles.title}>Your current balance is </div>
      <div className={styles.accountInfo}>
        <p className={styles.displayMoney}>
          {user.account[0].currency} {user.account[0].balance / 100}
        </p>
        <p className={styles.displayAccount}>Account number</p>
        <p className={styles.displayAccountNumber}>
          {user.account[0].accountNumber}{" "}
        </p>
      </div>
      <div className={styles.accountInfo}>
        <p className={styles.displayMoney}>
          {user.account[1].currency} {user.account[1].balance / 100}
        </p>
        <p className={styles.displayAccount}>Account number</p>
        <p className={styles.displayAccountNumber}>
          {user.account[1].accountNumber}
        </p>
      </div>
    </div>
  );
}

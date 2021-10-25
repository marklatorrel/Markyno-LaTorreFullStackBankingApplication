import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./BalanceDisplay.module.css";

export default function BalanceDisplay() {
  const { user } = useAuth();

  return (
    <>
      <div className={styles.balanceDisplay}>
        <div className={styles.title}>Your current balance is</div>
        <div className={styles.accountInfo}>
          <p className={styles.displayMoney}>USD {user.balance/100}</p>
          <p className={styles.displayAccount}>Account number</p>
          <p className={styles.displayAccountNumber}>{user.accountNumber}</p>
        </div>
        <div className={styles.accountInfo}>
          <p className={styles.displayMoney}>EUR 120.00</p>
          <p className={styles.displayAccount}>Account number</p>
          <p className={styles.displayAccountNumber}>43535235324</p>
        </div>
      </div>
    </>
  );
}

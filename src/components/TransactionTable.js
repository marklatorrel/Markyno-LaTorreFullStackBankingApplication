import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./TransactionTable.module.css";

export default function TransactionTable(props) {
  const { user, getUserInfo } = useAuth();
  const [tempAccountHistory, setTempAccountHistory] = useState([0]);

  useEffect(() => {
    if (user.name === "-") {
      getUserInfo();
    }
  }, []);

  useEffect(() => {
    setTempAccountHistory(user.account[0].accountHistory);

    if (props.account === "USD") {
      setTempAccountHistory(user.account[0].accountHistory);
    } else setTempAccountHistory(user.account[1].accountHistory);
  }, [tempAccountHistory]);

  let sum = 0;

  for (let i = 0; i < tempAccountHistory.length; i++) {
    sum += tempAccountHistory[i];
  }
  console.log(sum);

  const listItems = tempAccountHistory.map((amount, index) => {
    let depOrWith = "";
    if (amount < 0) {
      depOrWith = "Withdraw";
    } else if (amount > 0) {
      depOrWith = "Deposit";
    } else if (amount === 0) {
      depOrWith = "Initial";
    }

    if (index % 2 === 0)
      return (
        <div key={index} className={styles.tableRowClear}>
          <p className={styles.tableConceptText}>{depOrWith}</p>
          <p className={styles.tableVariableText}>{amount / 100}</p>
        </div>
      );
    if (index % 2 !== 0)
      return (
        <div key={index} className={styles.tableRowWhite}>
          <p className={styles.tableConceptText}>{depOrWith}</p>
          <p className={styles.tableVariableText}>{amount / 100}</p>
        </div>
      );
  });

  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <p className={styles.tableConceptText}>
          {props.account} transaction history
        </p>
        <p className={styles.tableVariableText}>Amount</p>
      </div>
      <div>{listItems}</div>
      <div className={styles.tableFooter}>
        <p className={styles.tableConceptText}>Total</p>
        <p className={styles.tableVariableText}>{sum / 100}</p>
      </div>
    </div>
  );
}

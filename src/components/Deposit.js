import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import styles from "./Deposit.module.css";
import BalanceDisplay from "./BalanceDisplay";
import DepositWithdrawTemplate from "./DepositWidrawTemplate";
import { Link } from "react-router-dom";

export default function Deposit() {
  const changedAmount = useRef(0);
  const changedCurrency = useRef("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { currentUser, user, setUser, getUserInfo } = useAuth();

  useEffect(() => {
    if (user.name === "-") {
      getUserInfo();
    }
  }, []);

  function validateInputAmount() {
    if (!changedAmount.current.value) return false;
    if (isNaN(changedAmount.current.value)) {
      setError("Write numbers only");
      return false;
    } else if (changedAmount.current.value <= 0) {
      setError("Write a positive number");
      return false;
    }
  }

  function handleDeposit() {
    setSuccessMessage("")

    
    if (validateInputAmount() !== false) {
      let newBalance = 0;

      if (changedCurrency.current.value === "USD") {
        newBalance =
          user.account[0].balance + parseInt(changedAmount.current.value * 100);
        db.collection("users").doc(currentUser.uid).update({
          "account.0.currency": user.account[0].currency,
          "account.0.balance": newBalance,
          "account.0.accountNumber": user.account[0].accountNumber,
          "account.1.currency": user.account[1].currency,
          "account.1.balance": user.account[1].balance,
          "account.1.accountNumber": user.account[1].accountNumber,
        }).then(setSuccessMessage("Succesfull USD deposit"));
      } else if (changedCurrency.current.value === "EUR"){
        newBalance =
          user.account[1].balance + parseInt(changedAmount.current.value * 100);
        db.collection("users").doc(currentUser.uid).update({
          "account.0.currency": user.account[0].currency,
          "account.0.balance": user.account[0].balance,
          "account.0.accountNumber": user.account[0].accountNumber,
          "account.1.currency": user.account[1].currency,
          "account.1.balance": newBalance,
          "account.1.accountNumber": user.account[1].accountNumber,
        }).then(setSuccessMessage("Succesfull EUR deposit"));
      }
      setError("");
      console.log("Entro al" + changedCurrency.current.value);

      setUser((user) => {
        let useTem = { ...user };
        if (changedCurrency.current.value === "USD") {
          useTem.account[0].balance = newBalance;
        } else useTem.account[1].balance = newBalance;
        return useTem;
      });
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles["flex-container"]}>
        <div className={styles.balanceDisplayLocation}>
          <BalanceDisplay></BalanceDisplay>
        </div>
        <div className={styles.dashboardOptionsLocation}>
          <Link to="/">
            <p className={styles.text}> Regresar</p>
          </Link>
          <DepositWithdrawTemplate
            title="How much would you like to deposit"
            buttonText="Deposit"
            handleFunction={() => handleDeposit()}
            tempCurrency={changedCurrency}
            amount={changedAmount}
            err={error}
            success={successMessage}
          ></DepositWithdrawTemplate>
        </div>
      </div>
    </div>
  );
}

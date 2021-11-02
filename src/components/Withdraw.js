import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import styles from "./Deposit.module.css";
import BalanceDisplay from "./BalanceDisplay";
import DepositWithdrawTemplate from "./DepositWidrawTemplate";

export default function Withdraw() {
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
    console.log(
      "The amount is " +
        changedAmount.current.value +
        " The currency is " +
        changedAmount.current.value
    );
    if (!changedAmount.current.value) return false;
    if (changedAmount.current.value <= 0) {
      setError("Write a positive number");
      return false;
    } else if (
      changedCurrency.current.value === "USD" &&
      changedAmount.current.value * 100 >= user.account[0].balance
    ) {
      console.log("Entro atrás");
      setError("Insuficcient funds");
      return false;
    } else if (
      changedCurrency.current.value === "EUR" &&
      changedAmount.current.value * 100 >= user.account[1].balance
    ) {
      setError("Insuficcient funds");
      return false;
    } else return true;
  }

  function handleWithdraw() {
    setSuccessMessage("");

    if (validateInputAmount() !== false) {
      let newBalance = 0;
      let tempAccountHistory = [];


      if (changedCurrency.current.value === "USD") {
        newBalance =
          user.account[0].balance - parseInt(changedAmount.current.value * 100);
         tempAccountHistory = user.account[0].accountHistory;
        tempAccountHistory.push(parseInt(changedAmount.current.value * -100));
        db.collection("users")
          .doc(currentUser.uid)
          .update({
            "account.0.currency": user.account[0].currency,
            "account.0.balance": newBalance,
            "account.0.accountNumber": user.account[0].accountNumber,
            "account.0.accountHistory": tempAccountHistory,
            "account.1.currency": user.account[1].currency,
            "account.1.balance": user.account[1].balance,
            "account.1.accountNumber": user.account[1].accountNumber,
            "account.1.accountHistory": user.account[1].accountHistory,
          })
          .then(setSuccessMessage("Succesfull USD withdraw"));
      } else if (changedCurrency.current.value === "EUR") {
        newBalance =
          user.account[1].balance - parseInt(changedAmount.current.value * -100);
         tempAccountHistory = user.account[1].accountHistory;

        tempAccountHistory.push(parseInt(changedAmount.current.value * 100));
        db.collection("users")
          .doc(currentUser.uid)
          .update({
            "account.0.currency": user.account[0].currency,
            "account.0.balance": user.account[0].balance,
            "account.0.accountNumber": user.account[0].accountNumber,
            "account.0.accountHistory": user.account[0].accountHistory,
            "account.1.currency": user.account[1].currency,
            "account.1.balance": newBalance,
            "account.1.accountNumber": user.account[1].accountNumber,
            "account.1.accountHistory": tempAccountHistory,
          })
          .then(setSuccessMessage("Succesfull EUR withdraw"));
      }

      setError("");
      console.log("Entro al" + changedCurrency.current.value);


      setUser((user) => {
        let useTem = { ...user };
        if (changedCurrency.current.value === "USD") {
          useTem.account[0].balance = newBalance;
          useTem.account[0].accountHistory = tempAccountHistory;

        } else {useTem.account[1].balance = newBalance;
          useTem.account[1].accountHistory = tempAccountHistory;}
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
            <p className={styles.text}>Back</p>
          </Link>
          <DepositWithdrawTemplate
            title="How much would you like to withdraw"
            buttonText="Withdraw"
            handleFunction={() => handleWithdraw()}
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

import React, { useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import styles from "./Deposit.module.css";
import BalanceDisplay from "./BalanceDisplay";
import DepositWithdrawTemplate from "./DepositWidrawTemplate";

export default function Withdraw() {
  const changedAmount = useRef(0);
  const { currentUser, user, setUser } = useAuth();

  const handleWithdraw = () => {
    // e.preventDefault();
    if (!changedAmount.current.value) return;
    if (changedAmount.current.value > user.account[0].balance) {
      alert("Insufficient money");
      return;
    } else if (isNaN(changedAmount.current.value)) {
      alert("Write numbers only");
      return;
    } else if (changedAmount.current.value < 0) {
      alert("Write positive numbers only");
      return;
    }

    let newBalance =
      user.account[0].balance - parseInt(changedAmount.current.value * 100);

    db.collection("users").doc(currentUser.uid).update({
      "account.0.currency": user.account[0].currency,
      "account.0.balance": newBalance,
      "account.0.accountNumber": user.account[0].accountNumber,
      "account.1.currency": user.account[1].currency,
      "account.1.balance": user.account[1].balance,
      "account.1.accountNumber": user.account[1].accountNumber,
    });

    setUser((user) => {
      let useTem = { ...user };
      useTem.account[0].balance = newBalance;
      return useTem;
    });
    alert("Succesfull Withdraw");
  };

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
            title="How much would you like to withdraw"
            buttonText="Withdraw"
            handleFunction={() => handleWithdraw()}
            amount={changedAmount}
            err="Mensaje"
          ></DepositWithdrawTemplate>
        </div>
      </div>
    </div>
  );
}

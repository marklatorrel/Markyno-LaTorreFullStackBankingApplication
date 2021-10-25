import React, { useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import styles from "./Deposit.module.css";
import BalanceDisplay from "./BalanceDisplay";
import DepositWithdrawTemplate from "./DepositWidrawTemplate";

export default function Deposit() {
  const changedAmount = useRef(0);
  const { currentUser, user, setUser, getUserInfo } = useAuth();

  useEffect(() => {
    if (user.name === "-") {
       getUserInfo();
       console.log("Entro al user info")
    }
  }, []);

  useEffect(() => {
       console.log("Entro al use effect del user ", user)
  }, [user]);

   function handleDeposit() {
   // e.preventDefault();
    console.log("Entered the handle submit")
    // console.log(changedAmount.current.value)
    // if (!changedAmount.current.value) return;
    // if (isNaN(changedAmount.current.value)) {
    //   alert("Write numbers only");
    //   return;
    // } else if (changedAmount.current.value < 0) {
    //   alert("Write a positive number");
    //   return;
    // }
     let newBalance = user.account[0].balance + parseInt(changedAmount.current.value*100);
     db.collection("users").doc(currentUser.uid).update(
      { 
        "account.0.currency": user.account[0].currency,
        "account.0.balance": newBalance,
        "account.0.accountNumber": user.account[0].accountNumber,
        "account.1.currency": user.account[1].currency,
        "account.1.balance": user.account[1].balance,
        "account.1.accountNumber": user.account[1].accountNumber,
      }
    );


    setUser((user) => {
      
      let useTem = {...user};
      useTem.account[0].balance=newBalance;
     return useTem;
    });
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles["flex-container"]}>
        <div className={styles.balanceDisplayLocation}>
          <BalanceDisplay></BalanceDisplay>
        </div>
        <div className={styles.dashboardOptionsLocation}>
          <DepositWithdrawTemplate
            title="How much would you like to deposit"
            buttonText="Deposit"
            handleFunction={() => handleDeposit()}
            amount={changedAmount}
            err="Mensaje"
          ></DepositWithdrawTemplate>
        </div>
      </div>
    </div>
  );
}

import React, {useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import styles from "./Deposit.module.css";
import BalanceDisplay from "./BalanceDisplay";
import DepositWithdrawTemplate from "./DepositWidrawTemplate";

export default function Deposit() {
  const changedAmount = useRef(0);
  const { currentUser, user, setUser, getUserInfo } = useAuth();

  useEffect(() => {
    if(!user.name){
      console.log("No encontro usuario y entro")
      getUserInfo();
    }
  }, []);


  function handleSubmit() {
    //e.preventDefault();
    console.log("Entered the handle submit")
    console.log(changedAmount.current.value)
    if (!changedAmount.current.value) return;
    if (isNaN(changedAmount.current.value)) {
      alert("Write numbers only");
      return;
    } else if (changedAmount.current.value < 0) {
      alert("Write a positive number");
      return;
    }
    let newBalance = user.balance + parseInt(changedAmount.current.value*100);
    db.collection("users").doc(currentUser.uid).update({
      balance: newBalance,
    });

    setUser((user) => ({
      ...user,
      balance: newBalance
    }));


    alert("Succesfull Deposit");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles["flex-container"]}>
        <div className={styles.balanceDisplayLocation}>
          <BalanceDisplay></BalanceDisplay>
        </div>
        <div className={styles.dashboardOptionsLocation}>
        <DepositWithdrawTemplate handleFunction={()=>handleSubmit()} amount={changedAmount} err="Mensaje"></DepositWithdrawTemplate>

        </div>
      </div>
    </div>
  );
}
import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import BalanceDisplay from "./BalanceDisplay";
import AccountHistoryOptions from "./AccountHistoryOptions";
import styles from "./AccountHistory.module.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, getUserInfo,getUserAccount } = useAuth();

  useEffect(() => {
    getUserInfo();
    //getUserAccount();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles["flex-container"]}>
        <div className={styles.balanceDisplayLocation}>
          <BalanceDisplay></BalanceDisplay>
        </div>
        <div className={styles.dashboardOptionsLocation}>
          <Link to="/">
            <p className={styles.text}> Back</p>
          </Link>
          <AccountHistoryOptions></AccountHistoryOptions>
        </div>
      </div>
    </div>
  );
}

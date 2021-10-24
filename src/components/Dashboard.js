import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import BalanceDisplay from "./BalanceDisplay";
import DashboardOptions from "./DashboardOptions";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { user, getUserInfo } = useAuth();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles["flex-container"]}>
        <div className={styles.balanceDisplayLocation}>
          <BalanceDisplay></BalanceDisplay>
        </div>
        <div className={styles.dashboardOptionsLocation}>
          <DashboardOptions></DashboardOptions>
        </div>
      </div>
    </div>
  );
}

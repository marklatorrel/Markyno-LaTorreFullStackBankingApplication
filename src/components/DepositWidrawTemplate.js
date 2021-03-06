import { Dropdown } from "react-bootstrap";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./DepositWithdrawTemplate.module.css";

export default function DepositWithdrawTemplate(props) {
  const { user } = useAuth();

  return (
    <>
      <div className={styles.card}>
        <div className={styles.title}> {props.title}</div>
        <div className={styles.amountContainer}>
          <div className={styles.amountDropdown}>
            <select
              id="currencyType"
              className={styles.cardDropdown}
              ref={props.tempCurrency}
            >
              <option value="USD" defaultValue>
                USD
              </option>
              <option value="EUR">EUR</option>
            </select>
            <input
              className={styles.input}
              placeholder="Add an amount"
              type="number"
              ref={props.amount}
              required
            ></input>
          </div>
          {props.err && < div className={styles.errorDisplay}>{props.err}</div>}
          {props.success && < div className={styles.errorDisplay}>{props.success}</div>}
        </div>
        <button
          className={styles.button}
          onClick={() => props.handleFunction()}
        >
          {" "}
          {props.buttonText}
        </button>
      </div>
    </>
  );
}

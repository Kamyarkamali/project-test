import React from "react";
import styles from "./ErrorPopup.module.css";
import { ErrorPopupProps } from "../../types/interfaces";

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <p className={styles.message}>{message}</p>
        <button className={styles.okButton} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;

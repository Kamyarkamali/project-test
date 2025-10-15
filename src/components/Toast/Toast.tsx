import React, { useEffect, useState } from "react";
import styles from "./Toast.module.css";
import { ToastProps } from "../../types/interfaces";

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // فعال کردن انیمیشن ورود
    const timer = setTimeout(() => setVisible(false), 3000);
    const removeTimer = setTimeout(() => onClose(), 3300);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`${styles.toastContainer} ${styles[type]} ${
        visible ? styles.show : ""
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;

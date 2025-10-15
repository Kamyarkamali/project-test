import React from "react";
import styles from "./Loader.module.css";

// interface
import { LoaderProps } from "../../types/interfaces";

const Loader: React.FC<LoaderProps> = ({ size = 18, color = "#fff" }) => {
  return (
    <span
      className={styles.loader}
      style={{
        width: size,
        height: size,
        borderTopColor: color,
        borderWidth: size / 6,
      }}
    ></span>
  );
};

export default Loader;

import React, { useState } from "react";
import styles from "./Saidbar.module.css";
import { SidebarProps } from "../../types/interfaces";

const Sidebar: React.FC<SidebarProps> = ({ username, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <h2>Dashboard</h2>
        <div className={styles.userInfo}>
          <span className={styles.username}>Hi, {username}</span>
          <button className={styles.logoutButton} onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;

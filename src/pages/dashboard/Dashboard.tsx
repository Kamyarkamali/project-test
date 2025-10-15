import React, { useEffect, useState } from "react";
import styles from "./Dasgboard.module.css";
import Sidebar from "../../components/saidbar/Sidebar";
import { getUsername } from "../../services/auth";
import { Task } from "../../types/interfaces";
import List from "../../module/Lists";

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [visibleTasks, setVisibleTasks] = useState<number>(3);
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const name = await getUsername(token);
        setUsername(name);
      } catch {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const loadMore = () => setVisibleTasks((prev) => prev + 3);

  const toggleStatus = (id: string) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "open" ? "closed" : "open" }
          : task
      )
    );

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar username={username} onLogout={handleLogout} />
      <main className={styles.mainContent}>
        <List token={token} />
      </main>

      <main className={styles.mainContent}>
        {tasks.slice(0, visibleTasks).map((task) => (
          <div key={task.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{task.title}</h3>
            <p className={styles.cardDesc}>{task.description}</p>
            <p className={styles.cardStatus}>
              Status:{" "}
              <span
                className={
                  task.status === "open"
                    ? styles.openStatus
                    : styles.closedStatus
                }
              >
                {task.status}
              </span>
            </p>
            <button
              className={styles.toggleButton}
              onClick={() => toggleStatus(task.id)}
            >
              {task.status === "open" ? "Close" : "Open"}
            </button>
          </div>
        ))}

        {visibleTasks < tasks.length && (
          <button className={styles.loadMore} onClick={loadMore}>
            Load More
          </button>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

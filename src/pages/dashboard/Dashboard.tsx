import React, { useEffect, useState } from "react";
import styles from "./Dasgboard.module.css";
import { getUsername } from "../../services/auth";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
}

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [visibleTasks, setVisibleTasks] = useState<number>(3);

  useEffect(() => {
    // // گرفتن نام کاربری
    // const fetchUsername = async () => {
    //   const name = await getUsername();
    //   setUsername(name);
    // };

    // گرفتن لیست tasks
    const fetchTasks = async () => {
      //   const data: Task[] = await getList({ page: 1, size: 100 });
      //   setTasks(data);
    };

    // fetchUsername();
    fetchTasks();
  }, []);

  const loadMore = () => {
    setVisibleTasks((prev) => prev + 3);
  };

  const toggleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "open" ? "closed" : "open" }
          : task
      )
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome, {username}</h1>
        <button
          className={styles.logoutButton}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </header>

      <main className={styles.main}>
        {tasks.slice(0, visibleTasks).map((task) => (
          <div key={task.id} className={styles.card}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => toggleStatus(task.id)}>
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

import React, { useState } from "react";
import styles from "./Login.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Loader from "../../components/Loader/Loader";
import { login } from "../../services/auth";
import Toast from "../../components/Toast/Toast";
import { LoginResponse } from "../../types/interfaces";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("admin");
  const [password, setPassword] = useState<string>("123456");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      const data: LoginResponse = await login(username, password);

      if (data.result === "success" && data.token) {
        localStorage.setItem("token", data.token);
        setToastMessage("Login successful! Welcome!");
        setToastType("success");
      } else {
        setToastMessage("Incorrect username or password");
        setToastType("error");
      }
    } catch (err) {
      setToastMessage("Server error. Please try again.");
      setToastType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Company Graph Project</h2>

        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <span
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        <button
          onClick={handleLogin}
          className={styles.button}
          disabled={loading}
        >
          {loading ? (
            <>
              Logging in
              <Loader size={18} color="#fff" />
            </>
          ) : (
            "Login"
          )}
        </button>
      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};

export default Login;

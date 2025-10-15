import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Loader from "../../components/Loader/Loader";
import { login } from "../../services/auth";
import Toast from "../../components/Toast/Toast";
import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";
import { LoginResponse } from "../../types/interfaces";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("admin");
  const [password, setPassword] = useState<string>("123456");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [errorPopup, setErrorPopup] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async (): Promise<void> => {
    setLoading(true);
    try {
      const data: LoginResponse = await login(username, password);

      if (data.result === "success" && data.token) {
        localStorage.setItem("token", data.token);
        setToastMessage("Login successful! Welcome!");
        setToastType("success");

        // هدایت به داشبورد بعد از چند میلی‌ثانیه
        setTimeout(() => navigate("/dashboard"), 500);
      } else {
        setErrorPopup("Wrong username or password");
      }
    } catch (err) {
      setErrorPopup("Server error. Please try again.");
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
          disabled={loading || !username || !password}
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

      {errorPopup && (
        <ErrorPopup message={errorPopup} onClose={() => setErrorPopup("")} />
      )}
    </div>
  );
};

export default Login;

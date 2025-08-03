import React from "react";
import styles from "../../styles/auth/login.module.css";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <LoginForm />
    </div>
  );
}

import React from "react";
import styles from "../../styles/auth/login.module.css";
import LoginForm from "../../components/auth/LoginForm";
import BackgroundParticles from "../../components/global/BackgroundParticles";

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
        <BackgroundParticles />
      <LoginForm />
    </div>
  );
}

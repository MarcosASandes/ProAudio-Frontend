import React from "react";
import styles from "../../styles/auth/login.module.css";
import BackgroundParticles from "../../components/global/BackgroundParticles";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className={styles.loginPage}>
      <BackgroundParticles />
      <ForgotPasswordForm />
    </div>
  );
}

import React from "react";
import styles from "../../styles/auth/login.module.css";
import BackgroundParticles from "../../components/global/BackgroundParticles";
import RepeatPasswordForm from "../../components/auth/RepeatPasswordForm";

export default function RepeatPasswordPage() {
  return (
    <div className={styles.loginPage}>
      <BackgroundParticles />
      <RepeatPasswordForm />
    </div>
  );
}

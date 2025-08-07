import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../../validators/auth/forgotPasswordEmailValidator";
import proaudioLogo from "../../assets/proaudio-logo-1.png";
import proaudioLetter from "../../assets/proaudio-letter-blacked.png";
import styles from "../../styles/auth/login.module.css";
import useForgotPassword from "../../hooks/auth/useForgotPassword";
import BackButton from "../global/BackButton";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../features/auth/AuthSelector";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  const [jumpingIcon, setJumpingIcon] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const { userForgotPassword } = useForgotPassword();
  const [isSent, setIsSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [messageColor, setMessageColor] = useState("#eee");
  const loggedUser = useSelector(selectLoggedUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const triggerJump = (field) => {
    setJumpingIcon(field);
    setTimeout(() => setJumpingIcon(""), 300);
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (loggedUser || userToken) {
      navigate("/");
    }
  }, [loggedUser]);

  const onSubmit = async (data) => {
    try {
      const response = await userForgotPassword(data.email);
      console.log("Correo enviado a: ", data.email);

      if (response.status === 200) {
        setSuccessMessage("Se envió un correo, revisa tu email.");
        setMessageColor("#7b2cbfff");
        setIsSent(true);
      } else {
        setSuccessMessage("No se pudo enviar el correo.");
        setMessageColor("#8b0f0f");
        setIsSent(true);
      }
    } catch (error) {
      console.error("Error en la solicitud de recuperación:", error);
      setSuccessMessage("No se pudo enviar el correo.");
      setMessageColor("#8b0f0f");
      setIsSent(true);
    }
  };

  return (
    <form className={styles.loginContainer} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={"/auth/login"} />

      {/* Encabezado */}
      <div className={styles.loginHeader}>
        <img src={proaudioLogo} alt="logo" className={styles.logo} />
        <img
          src={proaudioLetter}
          alt="lettering"
          className={styles.lettering}
        />
      </div>

      <h2 className={styles.containerOptionalTitle}>Recuperar contraseña</h2>

      {/* Mensaje informativo */}
      <div
        className={isSent ? styles.changeBackgroundColor : ""}
        style={{
          backgroundColor: isSent ? messageColor : "#222",
          color: "#eee",
          borderRadius: "8px",
          padding: "12px",
          marginBottom: "16px",
          fontSize: "0.95rem",
          textAlign: "left",
        }}
      >
        {isSent
          ? successMessage
          : "Se te enviará un correo para recuperar la contraseña."}
      </div>

      {/* Email */}
      <div className={styles.inputGroup}>
        <Mail
          className={`${styles.inputIcon} 
            ${jumpingIcon === "email" ? styles.iconJumping : ""} 
            ${focusedField === "email" ? styles.iconFocused : ""}`}
          size={22}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email")}
          onInput={() => triggerJump("email")}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField("")}
          className={styles.loginInput}
        />
      </div>
      {errors.email && (
        <span style={{ color: "red", fontSize: "0.9rem" }}>
          {errors.email.message}
        </span>
      )}

      {/* Botón */}
      <button type="submit" className={styles.loginButton} disabled={isSent}>
        Enviar
      </button>
    </form>
  );
}

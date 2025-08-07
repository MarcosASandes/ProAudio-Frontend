/*import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { repeatPasswordSchema } from "../../validators/auth/repeatPasswordValidator";
import proaudioLogo from "../../assets/proaudio-logo-1.png";
import proaudioLetter from "../../assets/proaudio-letter-blacked.png";
import styles from "../../styles/auth/login.module.css";
import BackButton from "../global/BackButton";
import useChangePasswordWithToken from "../../hooks/auth/useChangePasswordWithToken";
import { useSearchParams } from "react-router-dom";

export default function RepeatPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [jumpingIcon, setJumpingIcon] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { changePass } = useChangePasswordWithToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(repeatPasswordSchema),
  });

  const triggerJump = (field) => {
    setJumpingIcon(field);
    setTimeout(() => setJumpingIcon(""), 300);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword((prev) => !prev);
  };

  const onSubmit = async (data) => {
    const response = await changePass(token, data.password, data.repeatPassword);
    console.log("Nuevo password:", data.password);
    console.log("Token:", token);
    setIsReset(true);
    setSuccessMessage(response.message);
  };

  const passwordValue = watch("password");
  const repeatPasswordValue = watch("repeatPassword");

  return (
    <form className={styles.loginContainer} onSubmit={handleSubmit(onSubmit)}>
      <BackButton target={"/auth/login"} />

      <div className={styles.loginHeader}>
        <img src={proaudioLogo} alt="logo" className={styles.logo} />
        <img src={proaudioLetter} alt="lettering" className={styles.lettering} />
      </div>

      <h2 className={styles.containerOptionalTitle}>Reestablecer contraseña</h2>

      <div
        className={isReset ? styles.changeBackgroundColor : ""}
        style={{
          backgroundColor: isReset ? "" : "#222",
          color: "#eee",
          borderRadius: "8px",
          padding: "12px",
          marginBottom: "16px",
          fontSize: "0.95rem",
          textAlign: "left",
        }}
      >
        {isReset
          ? successMessage
          : "Ingresa tu nueva contraseña y confírmala para completar el proceso."}
      </div>

      <div className={styles.inputGroup}>
        <Lock
          className={`${styles.inputIcon} 
            ${jumpingIcon === "password" ? styles.iconJumping : ""} 
            ${focusedField === "password" ? styles.iconFocused : ""}`}
          size={22}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Nueva contraseña"
          {...register("password")}
          onInput={() => triggerJump("password")}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField("")}
          className={styles.loginInput}
        />
        {showPassword ? (
          <EyeOff
            className={`${styles.inputIcon} ${styles.inputIconRight}`}
            size={20}
            onClick={togglePasswordVisibility}
          />
        ) : (
          <Eye
            className={`${styles.inputIcon} ${styles.inputIconRight}`}
            size={20}
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      {errors.password && (
        <span style={{ color: "red", fontSize: "0.9rem" }}>
          {errors.password.message}
        </span>
      )}

      <div className={styles.inputGroup}>
        <Lock
          className={`${styles.inputIcon} 
            ${jumpingIcon === "repeatPassword" ? styles.iconJumping : ""} 
            ${focusedField === "repeatPassword" ? styles.iconFocused : ""}`}
          size={22}
        />
        <input
          type={showRepeatPassword ? "text" : "password"}
          placeholder="Repite la nueva contraseña"
          {...register("repeatPassword")}
          onInput={() => triggerJump("repeatPassword")}
          onFocus={() => setFocusedField("repeatPassword")}
          onBlur={() => setFocusedField("")}
          className={styles.loginInput}
        />
        {showRepeatPassword ? (
          <EyeOff
            className={`${styles.inputIcon} ${styles.inputIconRight}`}
            size={20}
            onClick={toggleRepeatPasswordVisibility}
          />
        ) : (
          <Eye
            className={`${styles.inputIcon} ${styles.inputIconRight}`}
            size={20}
            onClick={toggleRepeatPasswordVisibility}
          />
        )}
      </div>
      {errors.repeatPassword && (
        <span style={{ color: "red", fontSize: "0.9rem" }}>
          {errors.repeatPassword.message}
        </span>
      )}

      <button
        type="submit"
        className={styles.loginButton}
        disabled={isReset}
      >
        Guardar contraseña
      </button>
    </form>
  );
}*/

/*--------------------------------------------------- */

import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { repeatPasswordSchema } from "../../validators/auth/repeatPasswordValidator";
import proaudioLogo from "../../assets/proaudio-logo-1.png";
import proaudioLetter from "../../assets/proaudio-letter-blacked.png";
import styles from "../../styles/auth/login.module.css";
import BackButton from "../global/BackButton";
import useChangePasswordWithToken from "../../hooks/auth/useChangePasswordWithToken";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedUser } from "../../features/auth/AuthSelector";
import { useNavigate } from "react-router-dom";

export default function RepeatPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [jumpingIcon, setJumpingIcon] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [messageColor, setMessageColor] = useState("#eee"); // color por defecto
  const loggedUser = useSelector(selectLoggedUser);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { changePass } = useChangePasswordWithToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(repeatPasswordSchema),
  });

  const triggerJump = (field) => {
    setJumpingIcon(field);
    setTimeout(() => setJumpingIcon(""), 300);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword((prev) => !prev);
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (loggedUser || userToken) {
      navigate("/");
    }
  }, [loggedUser]);

  const onSubmit = async (data) => {
    try {
      const response = await changePass(
        token,
        data.password,
        data.repeatPassword
      );

      if (response.status === 200) {
        setSuccessMessage(
          response.message || "Contraseña actualizada correctamente."
        );
        setMessageColor("#7b2cbfff");
        setIsReset(true);
      } else {
        setSuccessMessage("Hubo un problema, intenta nuevamente.");
        setMessageColor("#8b0f0f");
        setIsReset(true);
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setSuccessMessage("No se actualizó");
      setMessageColor("#8b0f0f");
      setIsReset(true);
    }
  };

  const passwordValue = watch("password");
  const repeatPasswordValue = watch("repeatPassword");

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

      <h2 className={styles.containerOptionalTitle}>Reestablecer contraseña</h2>

      {/* Mensaje */}
      <div
        className={isReset ? styles.changeBackgroundColor : ""}
        style={{
          backgroundColor: isReset ? messageColor : "#222",
          color: "#eee",
          borderRadius: "8px",
          padding: "12px",
          marginBottom: "16px",
          fontSize: "0.95rem",
          textAlign: "left",
        }}
      >
        {isReset
          ? successMessage
          : "Ingresa tu nueva contraseña y confírmala para completar el proceso."}
      </div>

      <div className={styles.inputGroup}>
        <Lock
          className={`${styles.inputIcon} 
            ${jumpingIcon === "password" ? styles.iconJumping : ""} 
            ${focusedField === "password" ? styles.iconFocused : ""}`}
          size={22}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Nueva contraseña"
          {...register("password")}
          onInput={() => triggerJump("password")}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField("")}
          className={styles.loginInput}
        />
        {showPassword ? (
          <EyeOff
            className={`${styles.inputIcon} ${styles.inputIconRight}`}
            size={20}
            onClick={togglePasswordVisibility}
          />
        ) : (
          <Eye
            className={`${styles.inputIcon} ${styles.inputIconRight}`}
            size={20}
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
      {errors.password && (
        <span style={{ color: "red", fontSize: "0.9rem" }}>
          {errors.password.message}
        </span>
      )}

      <div className={styles.inputGroup}>
        <Lock
          className={`${styles.inputIcon} 
            ${jumpingIcon === "repeatPassword" ? styles.iconJumping : ""} 
            ${focusedField === "repeatPassword" ? styles.iconFocused : ""}`}
          size={22}
        />
        <input
          type={showRepeatPassword ? "text" : "password"}
          placeholder="Repite la nueva contraseña"
          {...register("repeatPassword")}
          onInput={() => triggerJump("repeatPassword")}
          onFocus={() => setFocusedField("repeatPassword")}
          onBlur={() => setFocusedField("")}
          className={styles.loginInput}
        />
        {showRepeatPassword ? (
          <EyeOff
            className={`${styles.inputIcon} ${styles.inputIconRight}`}
            size={20}
            onClick={toggleRepeatPasswordVisibility}
          />
        ) : (
          <Eye
            className={`${styles.inputIcon} ${styles.inputIconRight}`}
            size={20}
            onClick={toggleRepeatPasswordVisibility}
          />
        )}
      </div>
      {errors.repeatPassword && (
        <span style={{ color: "red", fontSize: "0.9rem" }}>
          {errors.repeatPassword.message}
        </span>
      )}

      <button type="submit" className={styles.loginButton} disabled={isReset}>
        Guardar contraseña
      </button>
    </form>
  );
}

import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import proaudioLogo from "../../assets/proaudio-logo-1.png";
import proaudioLetter from "../../assets/proaudio-letter-blacked.png";
import styles from "../../styles/auth/login.module.css";
import { loginSchema } from "../../validators/auth/loginValidator";
import { showToastError } from "../../utils/toastUtils";
import useLogin from "../../hooks/auth/useLogin";
import { selectLoggedUser } from "../../features/auth/AuthSelector";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [jumpingIcon, setJumpingIcon] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const { loginUser } = useLogin();
  const loggedUser = useSelector(selectLoggedUser);
  const navigate = useNavigate();
  const location = useLocation();

  // Configuración del formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  //Probar en producción de que funcione solo UNA VEZ, en desarrollo se dispara dos veces por StrictMode.
  useEffect(() => {
    if (location.state?.message) {
      showToastError(location.state.message);
    }
  }, [location.state]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const triggerJump = (field) => {
    setJumpingIcon(field);
    setTimeout(() => setJumpingIcon(""), 300);
  };

  const onSubmit = async (data) => {
    const response = await loginUser(data.email, data.password);
    if (response) {
      console.log("Este es el response: ", response);
      localStorage.setItem("userName", response.name);
      localStorage.setItem("userMail", response.email);
      localStorage.setItem("userToken", response.token);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (loggedUser || userToken) {
      navigate("/");
    }
  }, [loggedUser]);

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const handleGoToForgot = () => navigate("/auth/forgot/password");

  return (
    <form className={styles.loginContainer} onSubmit={handleSubmit(onSubmit)}>
      {/* Encabezado */}
      <div className={styles.loginHeader}>
        <img src={proaudioLogo} alt="logo" className={styles.logo} />
        <img
          src={proaudioLetter}
          alt="lettering"
          className={styles.lettering}
        />
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

      {/* Password */}
      <div className={styles.inputGroup}>
        <Lock
          className={`${styles.inputIcon} 
            ${jumpingIcon === "password" ? styles.iconJumping : ""} 
            ${focusedField === "password" ? styles.iconFocused : ""}`}
          size={22}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
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

      {/* Link */}
      <div className={styles.forgotPassword}>
        <a className={styles.forgotPasswordLink} onClick={handleGoToForgot}>
          ¿Olvidaste la contraseña?
        </a>
      </div>

      {/* Botón */}
      <button type="submit" className={styles.loginButton}>
        Entrar
      </button>
    </form>
  );
}

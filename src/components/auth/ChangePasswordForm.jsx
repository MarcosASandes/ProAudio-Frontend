import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../styles/auth/changePassword.module.css";
import { changePasswordSchema } from "../../validators/auth/changePasswordValidator";
import useChangePasswordLogged from "../../hooks/auth/useChangePasswordLogged";

export default function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const { changePassLogged } = useChangePasswordLogged();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = async (data) => {
    const response = await changePassLogged(
      data.currentPassword,
      data.password,
      data.repeatPassword
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.title}>Cambiar contraseña</h2>

      {/* Contraseña actual */}
      <label htmlFor="currentPass" className={styles.label}>
        Contraseña actual
      </label>
      <div className={styles.inputGroup}>
        <Lock className={styles.inputIcon} size={20} />
        <input
          id="currentPass"
          type={showCurrent ? "text" : "password"}
          placeholder="Contraseña actual"
          {...register("currentPassword")}
          className={styles.input}
        />
        {showCurrent ? (
          <EyeOff
            className={styles.iconRight}
            onClick={() => setShowCurrent((prev) => !prev)}
          />
        ) : (
          <Eye
            className={styles.iconRight}
            onClick={() => setShowCurrent((prev) => !prev)}
          />
        )}
      </div>
      {errors.currentPassword && (
        <span className={styles.error}>{errors.currentPassword.message}</span>
      )}

      {/* Nueva contraseña */}
      <label htmlFor="newPass" className={styles.label}>
        Nueva contraseña
      </label>
      <div className={styles.inputGroup}>
        <Lock className={styles.inputIcon} size={20} />
        <input
          id="newPass"
          type={showPassword ? "text" : "password"}
          placeholder="Nueva contraseña"
          {...register("password")}
          className={styles.input}
        />
        {showPassword ? (
          <EyeOff
            className={styles.iconRight}
            onClick={() => setShowPassword((prev) => !prev)}
          />
        ) : (
          <Eye
            className={styles.iconRight}
            onClick={() => setShowPassword((prev) => !prev)}
          />
        )}
      </div>
      {errors.password && (
        <span className={styles.error}>{errors.password.message}</span>
      )}

      {/* Repite nueva contraseña */}
      <label htmlFor="newPassRepeat" className={styles.label}>
        Repite la nueva contraseña
      </label>
      <div className={styles.inputGroup}>
        <Lock className={styles.inputIcon} size={20} />
        <input
          id="newPassRepeat"
          type={showRepeatPassword ? "text" : "password"}
          placeholder="Repite la nueva contraseña"
          {...register("repeatPassword")}
          className={styles.input}
        />
        {showRepeatPassword ? (
          <EyeOff
            className={styles.iconRight}
            onClick={() => setShowRepeatPassword((prev) => !prev)}
          />
        ) : (
          <Eye
            className={styles.iconRight}
            onClick={() => setShowRepeatPassword((prev) => !prev)}
          />
        )}
      </div>
      {errors.repeatPassword && (
        <span className={styles.error}>{errors.repeatPassword.message}</span>
      )}

      {/* Botón */}
      <button type="submit" className={styles.submitButton}>
        Cambiar
      </button>
    </form>
  );
}

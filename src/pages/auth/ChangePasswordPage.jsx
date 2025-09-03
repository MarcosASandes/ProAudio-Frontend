import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import ChangePasswordForm from "../../components/auth/ChangePasswordForm";

const ChangePasswordPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePasswordPage;

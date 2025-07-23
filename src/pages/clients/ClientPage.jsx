import React from "react";
import { showToast, showToastError } from "../../utils/toastUtils";
import stylesButtons from "../../styles/generic/buttonsStyles.module.css";

export default function ClientPage() {

  return (
    <main>
      <h1 className="animated-underline">Clientes</h1>
      <p>En esta página se mostrarán los clientes.</p>
      <hr />
      <button className={stylesButtons.btnBlue} onClick={() => showToast("Saved suawdawdawdawed sawdawawdawawdawawdawawdawawdawawdawawdawawdawawdawawdawawdawawdawdaccessf")}>
        Show normal toast
      </button>

      <button className={stylesButtons.btnGreen} onClick={() => showToastError("SomethSaved suawdawdawed .")}>
        Show error toast
      </button>
    </main>
  );
}

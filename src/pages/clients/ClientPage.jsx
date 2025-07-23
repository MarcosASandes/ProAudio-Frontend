import React from "react";
import { showToast, showToastError } from "../../utils/toastUtils";

export default function ClientPage() {

  return (
    <main>
      <h1 className="animated-underline">Clientes</h1>
      <p>En esta página se mostrarán los clientes.</p>
      <hr />
      <button onClick={() => showToast("Saved suawdawdawdawed sawdawawdawawdawawdawawdawawdawawdawawdawawdawawdawawdawawdawawdawdaccessf")}>
        Show normal toast
      </button>

      <button onClick={() => showToastError("SomethSaved suawdawdawed .")}>
        Show error toast
      </button>
    </main>
  );
}

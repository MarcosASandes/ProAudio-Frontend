import React from "react";
import { showToast, showToastError } from "../../utils/toastUtils";

export default function ClientPage() {

  return (
    <main>
      <h1 className="animated-underline">Clientes</h1>
      <p>En esta página se mostrarán los clientes.</p>
      <hr />
      <button onClick={() => showToast("Saved suawdawdawdawdawdawdawdwadawdawdawdaccessfawdawdawdawdawdawdawdawdawdully! awdawdwadawdawdawdaccessf awdawdwadawdawdawdaccessf")}>
        Show normal toast
      </button>

      <button onClick={() => showToastError("SomethSaved suawdawdawdawdawdawdawdwadawdawdawdaccessfawdawdawdawdawdawdawdawdawdully! awding went wrong.")}>
        Show error toast
      </button>
    </main>
  );
}

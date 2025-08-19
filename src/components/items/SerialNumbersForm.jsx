/*import { useFieldArray, useWatch } from "react-hook-form";
import { Toast } from "bootstrap";
import { toast } from "react-toastify";
import { showToast, showToastError } from "../../utils/toastUtils";

const SerialNumbersForm = ({ nestIndex, control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `items[${nestIndex}].serial_numbers`,
  });

  const quantity = useWatch({
    control,
    name: `items[${nestIndex}].quantity`,
  });

  const handleAddSerial = () => {
    const parsedQuantity = parseInt(quantity, 10);

    if (!parsedQuantity || isNaN(parsedQuantity)) {
      showToastError("Primero debe ingresar una cantidad comprada válida.");
      return;
    }

    if (fields.length >= parsedQuantity) {
      showToastError("Ya se han agregado todos los números de serie según la cantidad indicada.");
      return;
    }

    append({ serial_number: "" });
  };

  return (
    <div className="border rounded p-3 mt-3">
      <h6>Números de serie</h6>

      {fields.map((field, index) => (
        <div key={field.id} className="d-flex align-items-start gap-2 mb-2">
          <input
            type="text"
            {...register(`items[${nestIndex}].serial_numbers[${index}].serial_number`)}
            className="form-control"
            placeholder={`Serial #${index + 1}`}
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => remove(index)}
          >
            Eliminar
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={handleAddSerial}
      >
        Agregar número de serie
      </button>
    </div>
  );
};

export default SerialNumbersForm;*/



/*-------------------------------------------------------------- */



/*import { useFieldArray, useWatch } from "react-hook-form";
import { showToastError } from "../../utils/toastUtils";

const SerialNumbersForm = ({ control, register, errors }) => {
  const quantity = parseInt(useWatch({
    control,
    name: "currentLote.quantity",
  }) || "0", 10);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "currentLote.serialNumbers",
  });

  const handleAddSerial = () => {
    if (!quantity || isNaN(quantity)) {
      showToastError("Primero debe ingresar una cantidad comprada válida.");
      return;
    }

    if (fields.length >= quantity) {
      showToastError(
        "Ya se han agregado todos los números de serie según la cantidad indicada."
      );
      return;
    }

    append({ serial_number: "" });
  };

  return (
    <div className="border rounded p-3 mt-3">
      <h6>Números de serie</h6>

      {fields.map((field, index) => (
        <div key={field.id} className="d-flex align-items-start gap-2 mb-2">
          <input
            type="text"
            {...register(`currentLote.serialNumbers[${index}].serial_number`)}
            className="form-control"
            placeholder={`Serial #${index + 1}`}
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => remove(index)}
          >
            Eliminar
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={handleAddSerial}
      >
        Agregar número de serie
      </button>

      {errors.currentLote?.serialNumbers && (
        <p className="text-danger">
          {errors.currentLote.serialNumbers.message}
        </p>
      )}
    </div>
  );
};

export default SerialNumbersForm;*/











/*--------------------------------------- */


/*
import { useFieldArray, useWatch } from "react-hook-form";
import { showToastError } from "../../utils/toastUtils";

const SerialNumbersForm = ({ nestIndex, control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `items[${nestIndex}].serialNumbers`,
  });

  const quantity = useWatch({
    control,
    name: `items[${nestIndex}].quantity`,
  });

  const handleAddSerial = () => {
    const parsedQuantity = parseInt(quantity, 10);
    if (!parsedQuantity || isNaN(parsedQuantity)) {
      showToastError("Primero debe ingresar una cantidad comprada válida.");
      return;
    }
    if (fields.length >= parsedQuantity) {
      showToastError("Ya se han agregado todos los números de serie según la cantidad indicada.");
      return;
    }
    append({ serial_number: "" });
  };

  return (
    <div className="border rounded p-3 mt-3">
      <h6>Números de serie</h6>
      {fields.map((field, index) => (
        <div key={field.id} className="d-flex align-items-start gap-2 mb-2">
          <input
            type="text"
            {...register(`items[${nestIndex}].serialNumbers[${index}].serial_number`)}
            className="form-control"
            placeholder={`Serial #${index + 1}`}
          />
          <button type="button" className="btn btn-danger" onClick={() => remove(index)}>
            Eliminar
          </button>
        </div>
      ))}
      <button type="button" className="btn btn-primary mt-2" onClick={handleAddSerial}>
        Agregar número de serie
      </button>
    </div>
  );
};

export default SerialNumbersForm;*/





















/*------------------------------------------------------ */


/*import React from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { showToastError } from "../../utils/toastUtils";

const SerialNumbersForm = ({ nestIndex, control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `items[${nestIndex}].serialNumbers`,
  });

  const quantity = useWatch({
    control,
    name: `items[${nestIndex}].quantity`,
  });

  const handleAddSerial = () => {
    const parsedQuantity = parseInt(quantity, 10);

    if (!parsedQuantity || isNaN(parsedQuantity)) {
      showToastError("Primero debe ingresar una cantidad comprada válida.");
      return;
    }

    if (fields.length >= parsedQuantity) {
      showToastError(
        "Ya se han agregado todos los números de serie según la cantidad indicada."
      );
      return;
    }

    append({ serial_number: "" });
  };

  return (
    <div className="border rounded p-3 mt-3">
      <h6>Números de serie</h6>

      {fields.map((field, index) => (
        <div key={field.id} className="d-flex align-items-start gap-2 mb-2">
          <input
            type="text"
            {...register(`items[${nestIndex}].serialNumbers[${index}].serial_number`)}
            className="form-control"
            placeholder={`Serial #${index + 1}`}
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => remove(index)}
          >
            Eliminar
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={handleAddSerial}
      >
        Agregar número de serie
      </button>
    </div>
  );
};

export default SerialNumbersForm;*/




















/*------------------------------------------------------- */




/*import React from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { showToastError } from "../../utils/toastUtils";

const SerialNumbersForm = ({ nestIndex, control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `items[${nestIndex}].serialNumbers[0].serial_numbers`,
  });

  const quantity = useWatch({
    control,
    name: `items[${nestIndex}].quantity`,
  });

  const handleAddSerial = () => {
    if (!quantity || isNaN(quantity)) {
      showToastError("Primero debe ingresar una cantidad comprada válida.");
      return;
    }

    if (fields.length >= quantity) {
      showToastError("Ya se han agregado todos los números de serie según la cantidad indicada.");
      return;
    }

    append({ serial_number: "" });
  };

  return (
    <div className="border rounded p-3 mt-3">
      <h6>Números de serie</h6>

      {fields.map((field, index) => (
        <div key={field.id} className="d-flex align-items-start gap-2 mb-2">
          <input
            type="text"
            {...register(`items[${nestIndex}].serialNumbers[0].serial_numbers[${index}].serial_number`)}
            className="form-control"
            placeholder={`Serial #${index + 1}`}
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => remove(index)}
          >
            Eliminar
          </button>
        </div>
      ))}

      <button type="button" className="btn btn-primary mt-2" onClick={handleAddSerial}>
        Agregar número de serie
      </button>
    </div>
  );
};

export default SerialNumbersForm;*/





















/*------------------------------------------- */





/*import React from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { showToastError } from "../../utils/toastUtils";

const SerialNumbersForm = ({ nestIndex, control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `items[${nestIndex}].serialNumbers[0].serial_numbers`,
  });

  const quantity = useWatch({
    control,
    name: `items[${nestIndex}].quantity`,
    defaultValue: 0,
  });

  const handleAddSerial = () => {
    const qty = parseInt(quantity, 10);
    if (!qty || isNaN(qty) || qty <= 0) {
      showToastError("Primero debe ingresar una cantidad comprada válida.");
      return;
    }

    if (fields.length >= qty) {
      showToastError("Ya se han agregado todos los números de serie según la cantidad indicada.");
      return;
    }

    append({ serial_number: "" });
  };

  return (
    <div className="border rounded p-3 mt-3">
      <h6>Números de serie</h6>
      {fields.map((field, index) => (
        <div key={field.id} className="d-flex align-items-start gap-2 mb-2">
          <input
            type="text"
            {...register(`items[${nestIndex}].serialNumbers[0].serial_numbers[${index}].serial_number`)}
            className="form-control"
            placeholder={`Serial #${index + 1}`}
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => remove(index)}
          >
            Eliminar
          </button>
        </div>
      ))}
      <button type="button" className="btn btn-primary mt-2" onClick={handleAddSerial}>
        Agregar número de serie
      </button>
    </div>
  );
};

export default SerialNumbersForm;*/




















/*---------------------------------------------- */



/*import React from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { showToastError } from "../../utils/toastUtils";
import styles from "../../styles/items/createItemsForm.module.css"; // ✅ Importando el módulo

const SerialNumbersForm = ({ nestIndex, control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `items[${nestIndex}].serialNumbers[0].serial_numbers`,
  });

  const quantity = useWatch({
    control,
    name: `items[${nestIndex}].quantity`,
  });

  const handleAddSerial = () => {
    const parsedQuantity = parseInt(quantity, 10);

    if (!parsedQuantity || isNaN(parsedQuantity) || parsedQuantity <= 0) {
      showToastError("Primero debe ingresar una cantidad comprada válida.");
      return;
    }

    if (fields.length >= parsedQuantity) {
      showToastError(
        "Ya se han agregado todos los números de serie según la cantidad indicada."
      );
      return;
    }

    append({ serial_number: "" });
  };

  return (
    <div className="border rounded p-3 mt-3">
      <h6>Números de serie</h6>

      <div className={styles.serialNumbersContainer}>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.serialBadge}>
            {field.serial_number || "—"}
          </div>
        ))}
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="d-flex align-items-center gap-2 mb-2">
          <input
            type="text"
            {...register(
              `items[${nestIndex}].serialNumbers[0].serial_numbers[${index}].serial_number`
            )}
            className="form-control"
            placeholder={`Serial #${index + 1}`}
          />
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => remove(index)}
          >
            Eliminar
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={handleAddSerial}
      >
        Agregar número de serie
      </button>
    </div>
  );
};

export default SerialNumbersForm;*/




/*--------------------------------------- */


/*import React, { useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { showToastError } from "../../utils/toastUtils";
import styles from "../../styles/items/createItemsForm.module.css";

const SerialNumbersForm = ({ nestIndex, control, register, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `items[${nestIndex}].serialNumbers[0].serial_numbers`,
  });

  const quantity = useWatch({
    control,
    name: `items[${nestIndex}].quantity`,
  });

  const [inputValue, setInputValue] = useState("");

  const handleAddSerial = () => {
    const parsedQuantity = parseInt(quantity, 10);

    if (!parsedQuantity || isNaN(parsedQuantity) || parsedQuantity <= 0) {
      showToastError("Primero debe ingresar una cantidad comprada válida.");
      return;
    }

    if (fields.length >= parsedQuantity) {
      showToastError(
        "Ya se han agregado todos los números de serie según la cantidad indicada."
      );
      return;
    }

    if (!inputValue.trim()) {
      showToastError("El número de serie no puede estar vacío.");
      return;
    }

    append({ serial_number: inputValue.trim() });
    setInputValue(""); // limpiar input
  };

  const handleRemoveSerial = (index) => {
    remove(index);
  };

  return (
    <div className="border rounded p-3 mt-3">
      <h6>Números de serie</h6>

      <div className={styles.serialNumbersContainer}>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.serialBadge}>
            {field.serial_number}
            <button
              type="button"
              className={styles.removeBadgeButton}
              onClick={() => handleRemoveSerial(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="d-flex gap-2 mt-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="form-control"
          placeholder="Nuevo número de serie"
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddSerial}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default SerialNumbersForm;*/




/*--------------------------------- */


import React, { useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { showToastError } from "../../utils/toastUtils";
import styles from "../../styles/items/createItemsForm.module.css";

const SerialNumbersForm = ({ nestIndex, control, register, setValue }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `items[${nestIndex}].serialNumbers[0].serial_numbers`,
  });

  const quantity = useWatch({
    control,
    name: `items[${nestIndex}].quantity`,
  });

  const [inputValue, setInputValue] = useState("");

  const handleAddSerial = () => {
    const parsedQuantity = parseInt(quantity, 10);

    if (!parsedQuantity || isNaN(parsedQuantity) || parsedQuantity <= 0) {
      showToastError("Primero debe ingresar una cantidad comprada válida.");
      return;
    }

    if (fields.length >= parsedQuantity) {
      showToastError(
        "Ya se han agregado todos los números de serie según la cantidad indicada."
      );
      return;
    }

    if (!inputValue.trim()) {
      showToastError("El número de serie no puede estar vacío.");
      return;
    }

    append({ serial_number: inputValue.trim() });
    setInputValue(""); // limpiar input
  };

  const handleRemoveSerial = (index) => {
    remove(index);
  };

  return (
    <div  className={styles.serialNumberSectionContainer}>
      <h6>Números de serie</h6>

      {/* Contenedor con scroll horizontal solo para los badges className="border rounded p-3 mt-3"*/}
      <div className={styles.serialNumbersScrollContainer}>
        {fields.map((field, index) => (
          <div key={field.id} className={styles.serialBadge}>
            {field.serial_number}
            <button
              type="button"
              className={styles.removeBadgeButton}
              onClick={() => handleRemoveSerial(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Input único para agregar */}
      <div className="d-flex gap-2 mt-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="form-control"
          placeholder="Nuevo número de serie"
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddSerial}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default SerialNumbersForm;

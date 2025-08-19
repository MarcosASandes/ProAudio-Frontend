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

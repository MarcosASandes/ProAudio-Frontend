/*import { useFieldArray } from "react-hook-form";

const SerialNumbersForm = ({ nestIndex, control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `items[${nestIndex}].serialNumbers`,
  });

  return (
    <div className="mb-3">
      <label className="form-label">Números de serie</label>

      {fields.map((field, i) => (
        <div key={field.id} className="d-flex align-items-center mb-2">
          <input
            type="text"
            {...register(`items[${nestIndex}].serialNumbers[${i}]`)}
            className="form-control me-2"
          />
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => remove(i)}
          >
            Eliminar
          </button>
        </div>
      ))}

      {errors.items?.[nestIndex]?.serialNumbers && (
        <p className="text-danger">
          {errors.items[nestIndex].serialNumbers.message}
        </p>
      )}

      <button
        type="button"
        className="btn btn-sm btn-outline-primary mt-2"
        onClick={() => append("")}
      >
        Agregar número de serie
      </button>
    </div>
  );
};

export default SerialNumbersForm;*/

/*---------------------------- */

import { useFieldArray, useWatch } from "react-hook-form";
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

export default SerialNumbersForm;

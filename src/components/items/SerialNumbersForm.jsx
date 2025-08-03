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

import * as yup from "yup";

export const createItemsSchema = yup.object().shape({
  description: yup.string().required("La descripción del lote de artículos es obligatoria"),
  purchase_price: yup
    .number()
    .typeError("El precio de compra de los artículos debe ser un número")
    .min(0, "El precio de compra de los artículos no puede ser negativo")
    .required("El precio de compra de los artículos es obligatorio"),
  purchase_date: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .required("La fecha de compra es obligatoria"),
  quantity: yup
    .number()
    .typeError("La cantidad comprada debe ser un número")
    .integer("La cantidad comprada debe ser entero")
    .positive("La cantidad comprada debe ser positiva")
    .required("La cantidad comprada es obligatoria"),
  itemRange: yup.string().required("El rango de transmisión es obligatorio"),
  serialNumbers: yup.array().of(
    yup.object().shape({
      serial_numbers: yup.array().of(
        yup.object().shape({
          serial_number: yup.string().required("Los números de serie son obligatorios"),
        })
      ),
    })
  )
  .test(
    "match-quantity",
    "La cantidad de números de serie no coincide con la cantidad comprada",
    function (serialNumbers) {
      const quantity = this.parent.quantity;
      // Si no hay números de serie todavía, no hay error
      if (!serialNumbers || serialNumbers.length === 0) return true;

      let totalSerials = 0;
      serialNumbers.forEach(s => {
        if (Array.isArray(s.serial_numbers)) {
          totalSerials += s.serial_numbers.length;
        }
      });
      return totalSerials === quantity;
    }
  ),
});

export const createItemsSchemaArray = yup.object().shape({
  items: yup
    .array()
    .of(createItemsSchema)
    .min(1, "Debe agregar al menos un lote de artículos"),
});

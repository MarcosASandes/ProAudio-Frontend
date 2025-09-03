import * as Yup from "yup";

export const productSchema = Yup.object().shape({
  model: Yup.string()
    .max(50, "El modelo debe tener como máximo 50 caracteres")
    .required("El modelo es obligatorio"),

  comments: Yup.string()
    .max(150, "Los comentarios deben tener como máximo 150 caracteres")
    .notRequired(),

  replacement_value: Yup.number()
    .typeError("El valor de reposición debe ser un número válido")
    .min(0, "El valor de reposición debe ser mayor o igual a 0")
    .max(
      99999999.99,
      "El máximo valor permitido para el valor de reposición es: 99999999.99"
    )
    .test("max-decimals", "Máximo dos decimales", (value) =>
      /^\d+(\.\d{1,2})?$/.test(value?.toString() || "")
    ),

  prices: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number()
          .typeError("El valor del precio debe ser un número válido")
          .min(0, "El valor del precio debe ser mayor o igual a 0")
          .max(
            99999999.99,
            "Máximo valor permitido para el precio es: 99999999.99"
          )
          .test("max-decimals", "Máximo dos decimales", (value) =>
            /^\d+(\.\d{1,2})?$/.test(value?.toString() || "")
          )
          .required("El valor del precio es obligatorio"),

        description: Yup.string().required(
          "La descripción del precio es obligatoria"
        ),
      })
    )
    .min(1, "Debe agregar al menos un precio al producto")
    .required("Debe especificar al menos un precio del producto"),

  photos: Yup.mixed()
    .test(
      "fileSizePerFile",
      "Cada archivo debe pesar menos de 10 MB",
      (value) => {
        if (!value || value.length === 0) return true;
        return Array.from(value).every((file) => file.size <= 10 * 1024 * 1024);
      }
    )
    .test(
      "fileSizeTotal",
      "El tamaño total de las imágenes no debe superar 10 MB",
      (value) => {
        if (!value || value.length === 0) return true;
        const totalSize = Array.from(value).reduce(
          (acc, file) => acc + file.size,
          0
        );
        return totalSize <= 10 * 1024 * 1024;
      }
    )
    .test("fileType", "Solo se permiten imágenes", (value) => {
      if (!value || value.length === 0) return true;
      return Array.from(value).every((file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        )
      );
    }),
});

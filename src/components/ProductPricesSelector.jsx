export default function ProductPricesSelector({
  priceFields,
  appendPrice,
  removePrice,
  register,
  errors,
}) {
  return (
    <div className="mb-3">
      <label className="form-label text-light fw-semibold">Precios</label>
      <button
        type="button"
        className="btn btn-secondary btn-sm mb-2"
        onClick={() => appendPrice({ value: "", description: "" })}
      >
        Agregar precio
      </button>

      {priceFields.map((price, index) => (
        <div key={price.id} className="border p-2 mb-2 rounded">
          <div className="mb-2">
            <label className="form-label text-light">Valor</label>
            <input
              type="number"
              step="0.01"
              className={`form-control bg-dark text-light border-secondary ${errors?.prices?.[index]?.value ? "is-invalid" : ""}`}
              {...register(`prices.${index}.value`)}
              placeholder="Ej: 100.00"
            />
            {errors?.prices?.[index]?.value && (
              <div className="invalid-feedback">
                {errors.prices[index].value.message}
              </div>
            )}
          </div>
          <div className="mb-2">
            <label className="form-label text-light">Descripción</label>
            <input
              type="text"
              className={`form-control bg-dark text-light border-secondary ${errors?.prices?.[index]?.description ? "is-invalid" : ""}`}
              {...register(`prices.${index}.description`)}
              placeholder="Ej: Precio minorista, precio mayorista..."
            />
            {errors?.prices?.[index]?.description && (
              <div className="invalid-feedback">
                {errors.prices[index].description.message}
              </div>
            )}
          </div>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => removePrice(index)}
          >
            Quitar precio
          </button>
        </div>
      ))}
    </div>
  );
}

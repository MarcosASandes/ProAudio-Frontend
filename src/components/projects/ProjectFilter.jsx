export default function ProjectFilter({ searchTerm, onSearchChange }) {
  return (
    <div className="mb-4">
      <div className="row g-2">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar proyecto..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        {/* Deja lugar para fechas y filtros avanzados más adelante */}
      </div>
    </div>
  );
}

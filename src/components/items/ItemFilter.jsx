import { getItemsStatusLabel } from "../../utils/startingProjectStatusLabel";

export default function ItemFilter({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  onOpenAdvancedFilter,
  statuses = [],
}) {
  return (
    <div className="mb-4">
      <div className="row g-2">
        {/*<div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar artículo..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>*/}

        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="">Todos los estados</option>
            {statuses.status_list && statuses.status_list.length > 0
              ? statuses.status_list.map((status) => (
                  <option key={status} value={status}>
                    {getItemsStatusLabel(status)}
                  </option>
                ))
              : null}
          </select>
        </div>

        <div className="col-md-2">
          <button
            className="btn btn-secondary w-100"
            onClick={onOpenAdvancedFilter}
          >
            Filtros avanzados
          </button>
        </div>
      </div>
    </div>
  );
}

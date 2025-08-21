import React, { useState } from "react";
import { useSelector } from "react-redux";
import useGetAllEvents from "../../hooks/events/useGetAllEvents";
import Pagination from "../global/Pagination";
import {
  selectEvents,
  selectEventsPageable,
  selectEventsLoading,
  selectEventsError,
} from "../../features/events/eventSelector";
import ClientPagination from "../clients/ClientPagination";

const EventSelectorModal = ({ onSelect }) => {
  const [page, setPage] = useState(1);
  const size = 10;

  useGetAllEvents(page, size);

  const events = useSelector(selectEvents);
  const pageable = useSelector(selectEventsPageable);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);

  return (
    <>
      {loading && <p>Cargando eventos...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Distancia</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {events?.map((event) => (
                  <tr key={event.event_id}>
                    <td>{event.event_id}</td>
                    <td>{event.name}</td>
                    <td>{event.address}</td>
                    <td>{event.distance} km</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onSelect(event)}
                      >
                        Seleccionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ClientPagination pageable={pageable} onPageChange={setPage} />
        </>
      )}
    </>
  );
};

export default EventSelectorModal;

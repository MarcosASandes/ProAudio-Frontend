import React from "react";
import ClientTable from "./ClientTable";

// Mock de ejemplo
const clients = [
  {
    id: 1,
    name: "Juan Pérez",
    address: "Calle Falsa 1234567890123456789012345678901234567890",
    email: "juan@example.com",
    phone: "+598 123 456 789",
  },
  {
    id: 2,
    name: "Ana Gómez",
    address: "Av. Siempre Viva 742",
    email: "ana@example.com",
    phone: "+598 987 654 321",
  },
];

const ClientView = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ClientTable clients={clients} />
    </div>
  );
};

export default ClientView;

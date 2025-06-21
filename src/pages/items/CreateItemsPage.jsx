import React from "react";
import CreateItemsForm from "../../components/items/CreateItemsForm";
import "../../styles/createItems.css";


const CreateItemsPage = () => {

  return (
    <div className="create-items-main-section">
      <div className="container mt-4">
        <CreateItemsForm />
      </div>
    </div>
  );
};

export default CreateItemsPage;

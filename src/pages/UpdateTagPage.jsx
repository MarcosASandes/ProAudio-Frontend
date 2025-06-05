import React from "react";
import { useParams } from "react-router-dom";
import UpdateTagForm from "../components/UpdateTagForm";

const UpdateTagPage = () => {
  const { tagId } = useParams();

  return (
    <div className="container my-4">
      <UpdateTagForm tagId={tagId} />
    </div>
  );
};

export default UpdateTagPage;

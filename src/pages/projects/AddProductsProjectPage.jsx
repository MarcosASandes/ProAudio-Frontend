import React from 'react';
import { useParams } from 'react-router-dom';
import AddProductsProjectForm from '../../components/projects/AddProductsProjectForm';

const AddProductsProjectPage = () => {
  const { id } = useParams();

    return (
    <div>
      <AddProductsProjectForm id={id} />
    </div>
  );
};

export default AddProductsProjectPage;

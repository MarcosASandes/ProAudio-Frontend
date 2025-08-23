/*import React from 'react';
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

export default AddProductsProjectPage;*/


/*---------------------------------------------------- */


import React from "react";
import stylesScrollableContainer from "../../styles/generic/scrollableContainer.module.css";
import AddProductsProjectForm from '../../components/projects/AddProductsProjectForm';

const AddProductsProjectPage = () => {
  return (
    <div className={stylesScrollableContainer.container}>
      <AddProductsProjectForm />
    </div>
  );
};

export default AddProductsProjectPage;
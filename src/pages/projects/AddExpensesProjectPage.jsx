import React from 'react';
import { useParams } from 'react-router-dom';
import AddExpensesProjectForm from '../../components/projects/AddExpensesProjectForm';

const AddExpensesProjectPage = () => {
  const { id } = useParams();

    return (
    <div>
      <AddExpensesProjectForm id={id} />;
    </div>
  );
};

export default AddExpensesProjectPage;

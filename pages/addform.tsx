import React from "react";
import FormComponent from '@/components/FormComponent';

const AddEmployee: React.FC = () => {
  return (
    <div className="container mt-4">
      <div className="mb-3">
        <h5>Create Employee Profile</h5>
        <FormComponent />
      </div>
   </div>
  );
};

export default AddEmployee;

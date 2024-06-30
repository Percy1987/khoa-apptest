// /pages/edit/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormEditComponent from "../../components/FormEditComponent";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import employeesData from "../../data/employees.json";

const EditEmployeePage = () => {
  const router = useRouter();
  //   const { id } = router.query; // Extract id from route parameter
  //   const [employee, setEmployee] = useState(null);

  //   useEffect(() => {
  //     if (id) {
  //       const selectedEmployee = employeesData.find(emp => emp.id === parseInt(id as string));
  //       if (selectedEmployee) {
  //         setEmployee(selectedEmployee);
  //       } else {
  //         router.push('/');
  //       }
  //     }
  //   }, [id]);

  const formData = useSelector((state: RootState) => state.formData.data);

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <h5>Edit Employee Profile</h5>
        <FormEditComponent formData={formData} />
      </div>
    </div>
  );
};

export default EditEmployeePage;

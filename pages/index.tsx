import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

import React, { useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import DisplayData from "../components/displayData";

const inter = Inter({ subsets: ["latin"] });

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const formData = useSelector((state: RootState) => state.formData.data);

  console.log(formData);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <h5>Employee List</h5>
      </div>
      <div className="row">
        <div className="col-md-6">
        </div>
        <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
          <Link href="/addform">
            <button className="btn btn-success">Add Employee</button>
          </Link>
        </div>
      </div>
      {formData ? (
        <DisplayData formData={formData} />
      ) : (
        <div>No form data available</div>
      )}
    </div>
  );
};

export default HomePage;

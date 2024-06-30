import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import Link from "next/link";

interface SearchBarProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {

  return (
    <div className="row">
      <div className="col-md-6">
        <Form className="d-flex">
        <span className="mt-2 me-3">Search </span>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder={placeholder}
            />
            <Button variant="primary" className="btn btn-primary ms-3">
              Search
            </Button>
          </InputGroup>
        </Form>
      </div>
      <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
        <Link href="/addform">
          <button className="btn btn-success">Add Employee</button>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;

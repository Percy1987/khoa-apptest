import React from "react";
import { Col, Form, Row } from "react-bootstrap";

interface FormRowProps {
  label: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const FormRow: React.FC<FormRowProps> = ({ label, children, actions }) => {
  return (
    <Form.Group as={Row} className="mb-3 align-items-center">
      <Form.Label column sm={2}>
        {label}
      </Form.Label>
      <Col sm={8}>{children}</Col>
      {actions && (
        <Col sm={2} className="text-end">
          {actions}
        </Col>
      )}
    </Form.Group>
  );
};

export default FormRow;

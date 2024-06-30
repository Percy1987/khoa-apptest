import React from 'react';
import { Form } from 'react-bootstrap';

interface SelectBoxProps {
  options: string[];
  onChange: (value: string) => void;
  placeholder: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({ options, onChange, placeholder }) => {
  return (
    <Form.Select onChange={(e) => onChange(e.target.value)}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </Form.Select>
  );
};

export default SelectBox;

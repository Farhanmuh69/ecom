import React from "react";
import Label from "./Label";
import Input from "./Input";

function InputForm({ name, label, type, placeholder }) {
  return (
    <div className="mb-6">
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} placeholder={placeholder} name={name}/>
    </div>
  );
}

export default InputForm;

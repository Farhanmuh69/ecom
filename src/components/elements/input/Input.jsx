import React from "react";

function Input({ type, placeholder, name }) {
  return (
    <input
      type={type}
      className="text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder:opacity-50"
      placeholder={placeholder}
      name={name}
      id={name}
      required
    />
  );
}

export default Input;

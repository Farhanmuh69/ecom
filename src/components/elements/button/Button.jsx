import React from "react";

function Button({
  children,
  className = "bg-black", // Menggunakan className, bukan classname
  onClick = () => {},
  type = "button",
}) {
  return (
    <button
      className={`h-10 px-6 font-semibold  rounded-md duration-100 flex items-center hover:opacity-50 justify-center ${className} text-white`} // Menggunakan className, bukan classname
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;


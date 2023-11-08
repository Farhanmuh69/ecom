import React from "react";
import InputForm from "../elements/input";
import Button from "../elements/button/Button";

function FormRegister() {
  return (
    <form action="">
      <InputForm
        label="Fullname"
        type="text"
        placeholder="Your name"
        name="fullname"
      />
      <InputForm
        label="Email"
        type="email"
        placeholder="Example@mail.com"
        name="email"
      />
      <InputForm
        label="Password"
        type="password"
        placeholder="********"
        name="password"
      />
      <InputForm
        label="Confirm password"
        type="password"
        placeholder="********"
        name="confirmPassword"
      />
      <Button classname="bg-blue-600 w-full">Register</Button>
    </form>
  );
}

export default FormRegister;

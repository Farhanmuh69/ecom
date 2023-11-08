import React from "react";
import AuthLayout from "../components/layouts/AuthLayout";
import FormRegister from "../components/fragments/FormRegister";

function RegisterPage() {
  return (
    <AuthLayout title="Register" type="register">
      <FormRegister />
    </AuthLayout>
  );
}

export default RegisterPage;

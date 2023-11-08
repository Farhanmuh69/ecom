import React, { useEffect, useState } from "react";
// import Button from "../elements/button/Button";
import InputForm from "../elements/input";
import { login } from "../../services/auth.service";

function FormLogin() {
  const [loginFailed, setLoginFailed] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    if (data.username === "admin" && data.password === "admin") {
      localStorage.setItem("token", "admin");
      window.location.href = "/stock";
    } else {
      login(data, (status, res) => {
        if (status) {
          localStorage.setItem("token", res);
          window.location.href = "/";
        } else {
          setLoginFailed(res.response.data);
          console.log(res.response.data);
        }
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/products";
    }
  }, []);

  return (
    <div className="w-full">
      <form onSubmit={handleLogin}>
        <InputForm
          label="Username"
          type="text"
          placeholder="Username"
          name="username"

        />
        <InputForm
          label="Password"
          type="password"
          placeholder="********"
          name="password"

        />
        <div className="mt-6">
          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
            Login
          </button>
        </div>
      </form>
      <p className="mt-8 text-xs font-light text-center text-gray-700">
      {"Don't have an account?"}{" "}{" "}
        <a href="#" className="font-medium text-purple-600 hover:underline">
          Sign up
        </a>
      </p>
      {loginFailed && (
        <p className="text-red-500 text-center mt-5 font-bold">{loginFailed}</p>
      )}
    </div>
  );
}

export default FormLogin;

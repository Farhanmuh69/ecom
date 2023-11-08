import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="flex flex-col justify-center min-h-screen items-center">
      <h1 className="text-3xl font-bold mb-2">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error.error.message}</p>
    </div>
  );
}

export default ErrorPage;

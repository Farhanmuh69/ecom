import React from "react";
import bglogin from "../../assets/bglogin.jpg";

function AuthLayout({ children, title }) {
  const backgroundStyle = {
    backgroundImage: `url(${bglogin})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="flex justify-end min-h-screen items-center sm:justify-center md:justify-center" style={backgroundStyle}>
        <div className="w-[500px] h-[600px] mx-8 md:mx-6">
          <div className="mt-5 ml-5 h-[500px] bg-white shadow-lg p-5 border rounded-3xl border-blue-500 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-2 text-blue-600">{title}</h1>
            <p className="font-medium text-black mb-8">
              Welcome, please enter your details
            </p>
              <div className="w-full">
              {children}
              </div>
          </div>
        </div>
      </div>
  );
}

export default AuthLayout;




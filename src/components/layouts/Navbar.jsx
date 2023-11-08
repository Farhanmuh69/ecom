import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsername } from "../../services/auth.service";
import { CiShoppingCart } from "react-icons/ci";
import User from "../elements/button/User";






function Navbar() {
  const [totalCart, setTotalCart] = useState(0);
  const token = localStorage.getItem("token");
  const currentUser = token === "admin" ? "admin" : token && getUsername(token);
  const cart = useSelector((state) => {
    const userCart = state.cart.data.find((user) => user.user === currentUser);
    return userCart ? userCart.cart : [];
  });



  useEffect(() => {
    if (cart.length > 0) {
      const sum = cart.reduce((acc, item) => acc + item.qty, 0);
      if (totalCart !== sum) {
        setTotalCart(sum);
      }
    } else {
      if (totalCart !== 0) {
        setTotalCart(0);
      }
    }
  }, [cart, totalCart]);

  // const handleLogout = () => {
  //     localStorage.removeItem("token");
  //     window.location.href = "/login";
  // };
  return (
    <>
      <div className="bg-blue-600 text-white">
        <div className="flex items-center justify-between container mx-auto px-4 py-3 sm:px-0 md:px-6">
          <div className="flex space-x-4">
            {localStorage.getItem("token") === "admin" ? (
              <Link to="/stock" className="font-bold ">
                Admin
              </Link>
            ) : (
              <Link to="/" className="font-bold ">
                Home
              </Link>
            )}
            {localStorage.getItem("token") === "admin" ? (
              <>
                <Link to="/stock">Stock</Link>
                <Link to="/report">Report</Link>
              </>
            ) : null}
          </div>
          <div className="flex items-center space-x-5">
            {localStorage.getItem("token") &&
            localStorage.getItem("token") !== "admin" ? (
              <Link to="/cart">
                <div className="relative py-2 cursor-pointer">
                  <div className="t-0 absolute left-6">
                    <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                      {totalCart}
                    </p>
                  </div>
                  <CiShoppingCart
                    size={50}
                    
                  />
                  
                </div>
                
              </Link>
            ) : null}
            <User/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

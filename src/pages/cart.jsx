import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUsername } from "../services/auth.service";
import { useLogin } from "../hooks/useLogin";
import ItemCart from "../components/fragments/ItemCart";

function Cart() {
  useLogin();
  const token = localStorage.getItem("token");
  const currentUser = token === "admin" ? "admin" : token && getUsername(token);
  const cart = useSelector((state) => {
    const userCart = state.cart.data.find((user) => user.user === currentUser);
    return userCart ? userCart.cart : [];
  });
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (localStorage.getItem("token") === "admin") {
      window.location.href = "/stock";
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {products.length > 0 &&
              cart.map((item) => {
                const product = products.find(
                  (product) => product.id === item.id
                );
                return (
                  <ItemCart
                    key={item.id}
                  
                  >
                    <ItemCart.Header image={product.image} />
                    <ItemCart.Body
                      title={product.title}
                      description={product.description}
                      price={product.price}
                      qty={item.qty}
                      id={item.id}
                    />
                  </ItemCart>
                );
              })}
            {cart.length === 0 ? (
              <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      Tidak ada item
                    </h2>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <ItemCart.Action/>
        </div>
      </div>
    </>
  );
}

export default Cart;



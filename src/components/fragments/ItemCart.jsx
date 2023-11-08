import React, { useEffect, useState } from "react";
import { getUsername } from "../../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCart,
  removeCartItem,
  removerCartByUser,
} from "../../redux/slices/cartSlice";
import { addToOrder } from "../../redux/slices/orderSlice";
import { updateStock } from "../../redux/slices/productsSlice";

function ItemCart({ children }) {
  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      {children}
    </div>
  );
}

function Header({ image }) {
  return (
    <>
      <img
        src={image}
        alt="product-image"
        className="w-full rounded-lg sm:w-40"
      />
    </>
  );
}

function Body({ title, description, price, qty, id }) {
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem("token");
  const user = isLogin ? getUsername(localStorage.getItem("token")) : null;
  const handleIncrement = () => {
    if (isLogin) {
      dispatch(addToCart({ user, orderItems: [{ id, qty: 1 }] }));
    }
  };
  const handleDecrement = () => {
    if (isLogin) {
      dispatch(decreaseCart({ user, orderItems: [{ id, qty: 1 }] }));
    }
  };

  const handleRemoveItem = () => {
    if (isLogin) {
      dispatch(removeCartItem({ user, itemId: id }));
    }
  };
  return (
    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
      <div className="mt-5 sm:mt-0">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <p className="mt-1 text-xs text-gray-700 line-clamp-3">{description}</p>
      </div>
      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
      <div className="flex px-5 items-center justify-center rounded-lg cursor-pointer border border-opacity-10 border-black w-[7rem]">
                  <span
                    onClick={handleDecrement}
                    className="py-1 px-3.5 duration-100 hover-bg-thirdColor hover-text-blue-50 font-bold text-2xl"
                  >-</span>
                  <input
                    className="h-10 w-10 text-center cursor-pointer text-xl font-semibold"
                    type="text"
                    value={qty}
                  />
                  <span
                    onClick={handleIncrement}
                    className="py-1 px-3.5 duration-100 hover-bg-thirdColor cursor-pointer hover-text-blue-50 font-bold text-2xl"
                  >+</span>
                </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm">${price}</p>
          <button onClick={handleRemoveItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Action() {
  const token = localStorage.getItem("token");
  const currentUser = token === "admin" ? "admin" : token && getUsername(token);
  const cart = useSelector((state) => {
    const userCart = state.cart.data.find((user) => user.user === currentUser);
    return userCart ? userCart.cart : [];
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const handleOrder = () => {
    if (cart.length > 0) {
      let canProcessOrder = true;

      // Check if all items in the cart have quantity less than or equal to product quantity
      for (const item of cart) {
        const product = products.find((product) => product.id === item.id);

        if (!product || item.qty > product.qty) {
          canProcessOrder = false;
          break;
        }
      }

      if (canProcessOrder) {
        const orderItems = cart.map((item) => ({ id: item.id, qty: item.qty }));

        // Dispatch addToOrder action
        dispatch(addToOrder(orderItems));

        // Dispatch updateStock action for each item in the cart
        cart.forEach((item) => {
          const product = products.find((product) => product.id === item.id);
          dispatch(updateStock({ id: item.id, qty: product.qty - item.qty })); // Reduce the stock by the ordered quantity
        });

        // Dispatch removeAllCart action
        dispatch(removerCartByUser(currentUser));
      } else {
        console.log(
          "Order cannot be processed. Item quantity exceeds available stock."
        );
      }
    } else {
      console.log("Cart is empty. Unable to place an order.");
    }
  };

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
    }
  }, [cart, products]);
  return (
    <>
      {cart.length > 0 && (
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total price</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">
                $
                {totalPrice.toLocaleString("en-US", {
                  styles: "currency",
                  currency: "USD",
                })}{" "}
                USD
              </p>
            </div>
          </div>
          <hr className="my-2" />
          <button
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            onClick={handleOrder}
          >
            Check out
          </button>
        </div>
      )}
    </>
  );
}

ItemCart.Header = Header;
ItemCart.Body = Body;
ItemCart.Action = Action;

export default ItemCart;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "../../redux/slices/cartSlice";
import { useLogin } from "../../hooks/useLogin";

function TableCart() {
  useLogin();
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      setTotalPrice(0);
    }
  }, [cart, products]);

  return (
    <table className="text-left table-auto border-separate border-spacing-x-5">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 &&
          cart.map((item) => {
            const product = products.find((product) => product.id === item.id);
            return (
              <tr key={item.id}>
                <td>{product.title.substring(0, 15)}...</td>
                <td>
                  ${" "}
                  {product.price.toLocaleString("en-US", {
                    styles: "currency",
                    currency: "USD",
                  })}
                </td>
                <td>{item.qty}</td>
                <td>
                  ${" "}
                  {(product.price * item.qty).toLocaleString("en-US", {
                    styles: "currency",
                    currency: "USD",
                  })}
                </td>
                <td>
                  <button
                    className="bg-blue-500 p-4"
                    onClick={() => {
                      dispatch(removeCart(item.id));
                    }}
                  >
                    del
                  </button>
                </td>
              </tr>
            );
          })}
        <tr>
          <td colSpan={3}>
            <b>Total price</b>
          </td>
          <td>
            <b>
              ${" "}
              {totalPrice.toLocaleString("en-US", {
                styles: "currency",
                currency: "USD",
              })}
            </b>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
export default TableCart;

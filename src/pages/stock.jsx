import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStock } from "../redux/slices/productsSlice";
import Button from "../components/elements/button/Button";

function StockPage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [stock, setStock] = useState(0);

  const handleUpdateStock = (id) => {
    dispatch(updateStock({ id, qty: stock }));
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== "admin") {
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <div className="flex flex-col justify-centeritems-center pt-4">
        <div className="relative flex flex-col items-center  rounded-[10px] border-[1px] border-gray-200 container mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
          <div className="flex items-center justify-between bg-blue-500 rounded-t-3xl p-3 w-full">
            <div className="text-lg font-bold text-navy-700  dark:text-white">
              Stock
            </div>
          </div>
              {products.length > 0 &&
                products.map((product) => (
                  <div
                    className=" items-center border hover:border-b-4  align-bottom justify-between rounded-md p-4 mr-0 ml-0 w-full"
                    key={product.id}
                  >
                    {/* <div className="bg-red-400 items-center border hover:border-blue-500 align-bottom justify-between rounded-md p-4 mr-0 ml-0 w-full"> */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-24 w-24 items-center justify-center">
                          <img
                            className="h-full w-full rounded-xl"
                            src={product.image}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col align-middle">
                          <h5 className="text-base font-bold text-navy-700 text-black">
                            {product.title}
                          </h5>
                          <p className="mt-1 mb-6 text-lg font-semibold text-black">
                            Stock: {product.qty}
                          </p>
                          <p className="text-lg font-semibold text-black">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                      <div className=" flex items-center justify-end text-navy-700 text-black space-x-2">
                      <input
                          type="number"
                          className="border w-10 h-10 text-center rounded-lg"
                          defaultValue={product.qty}
                          onChange={(e) => setStock(Number(e.target.value))}
                        />
                        {/* <button
                          className="px-4 py-1 bg-blue-300 rounded-lg"
                          onClick={() => handleUpdateStock(product.id, product.qty)}
                        >
                          Update
                        </button> */}
                        <Button
                        onClick={() => handleUpdateStock(product.id, product.qty)}
                        className="bg-blue-500"
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                  // </div>
                ))}
        </div>
      </div>
    </>
  );
}

export default StockPage;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ReportPage() {
  const order = useSelector((state) => state.order.orderItems);
  const [totalPrice, setTotalPrice] = useState(0);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (products.length > 0 && order.length > 0) {
      const sum = order.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("order", JSON.stringify(order));
    } else {
      setTotalPrice(0);
    }
  }, [order, products]);

  useEffect(() => {
    if (localStorage.getItem("token") !== "admin") {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center pt-4 ">
        <div className="relative flex flex-col items-center rounded-[10px] border-[1px] container mx-auto p-4 bg-clip-border shadow-md shadow-[#F3F3F3] border-[#ffffff33]  text-white">
          <div className="flex items-center justify-between rounded-t-3xl p-3 w-full bg-blue-500">
            <div className="text-lg font-bold text-navy-700 text-white ">
              Total Penjualan
            </div>
            <div className="text-lg font-bold text-navy-700 text-white">
              $
              {totalPrice.toLocaleString("en-US", {
                styles: "currency",
                currency: "USD",
              })}{" "}
              USD
            </div>
          </div>
          {products.length > 0 &&
            order.map((item) => {
              const product = products.find(
                (product) => product.id === item.id
              );
              return (
                <div
                  className="flex flex-col space-y-4 justify-between sm:flex-row h-full w-full items-start rounded-md border hover:border-b-4 px-3 py-[20px] transition-all duration-150 hover:border-gray-200 "
                  key={item.id}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center">
                      <img
                        className="h-full w-full rounded-xl"
                        src={product.image}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col">
                      <h5 className="text-base font-bold text-navy-700 text-black">
                        {product.title}
                      </h5>
                      <p className="mt-1 text-sm font-normal text-gray-600">
                        $
                        {(product.price * item.qty).toLocaleString("en-US", {
                          styles: "currency",
                          currency: "USD",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="mt-1 mr-10 font-semibold text-black space-x-2">
                    <h2>{item.qty}</h2>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default ReportPage;

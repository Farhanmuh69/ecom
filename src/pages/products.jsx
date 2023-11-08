import React, { useEffect } from "react";
import CardProduct from "../components/fragments/CardProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";
import { toast,Toaster } from 'react-hot-toast';
import Category from "../components/layouts/SideBar";


function ProductsPage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const fetchData =  () => {
    try {
      const checkLocalStorage =  localStorage.getItem("products");
      if (!checkLocalStorage) {
        dispatch(fetchProducts());
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleOutOfStockNotification = () => {
    toast.error(`Product is out of stock`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token") === "admin") {
      window.location.href = "/stock";
    }
  }, []);

  return (
    <div className="w-screen">
      <div className="container w-full h-full mx-auto">
        <div className="flex flex-wrap">
          <div className="w-1/6">
            <Category />
          </div>
          <div className="w-3/4">
            <div className="section grid grid-cols-1 md:grid-cols-2 px-0 lg:grid-cols-4 py-4 sm:px-0 gap-7 mx-4 my-4">
              <Toaster position="bottom-right" />
              {products.length > 0 &&
                products.map((product) => (
                  <CardProduct key={product.id}>
                    <CardProduct.Header image={product.image} id={product.id} />
                    <CardProduct.Body
                      name={product.title}
                      description={product.description}
                      stock={product.qty}
                      id={product.id}
                    />
                    <CardProduct.Footer
                      price={product.price}
                      id={product.id}
                      onOutOfStockNotification={() => handleOutOfStockNotification(product.title)}
                    />
                  </CardProduct>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;

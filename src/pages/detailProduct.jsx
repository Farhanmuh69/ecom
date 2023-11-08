import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";
import { getUsername } from "../services/auth.service";
import { Toaster, toast } from 'react-hot-toast';
import { CiShoppingCart } from "react-icons/ci";
import ProductsPage from "./products";

function ProductDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1); // State untuk jumlah barang yang akan ditambahkan ke keranjang

  const handleAddToCart = () => {
    const isLogin = localStorage.getItem("token");
    const user = isLogin ? getUsername(localStorage.getItem("token")) : null;
    if (isLogin) {
      if (quantity <= 0) {
        // Tambahkan notifikasi jika kuantitas tidak valid
        toast.error("Invalid quantity");
      } else if (quantity > filteredProducts[0].qty) {
        // Tambahkan notifikasi jika stok habis
        toast.error("Product out of stock");
      } else {
        dispatch(
          addToCart({ user, orderItems: [{ id: Number(id), qty: quantity }] })
        );
        notify();
        setQuantity(1);
      }
    } else {
      window.location.href = "/login";
    }
  };
  const notify = () => {
    toast('Added to the cart!', {
        icon: '🛒',
    });
  };

  const filteredProducts = products.filter(
    (product) => product.id === Number(id)
  );

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increment = () => {
    if (filteredProducts.length > 0) {
      const product = filteredProducts[0];
      if (quantity < product.qty) {
        setQuantity(quantity + 1);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === "admin") {
      window.location.href = "/stock";
    }
  }, []);

  return (
    <div className="gap-10">
    <div className="flex flex-col ml-5 mr-5 md:flex-row mt-5 mx-auto md:mb-10">
      {filteredProducts.length > 0 &&
        filteredProducts.map((product) => (
          <div className="flex flex-col md:flex-row px-5 md:ml-10 md:mr-10 md:mb-24 shadow-md" key={product.id}>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <div className="bg-slate-400 w-full h-[350px] mb-24 md:w-1/2 md:h-[600px] sm:w-[200px] sm:mr-5">
            {/* <div className="rounded-t-lg h-[600px] mt-5 ml-5 mr-5 w-full bg-slate-400 cursor-pointer flex items-center justify-center sm:h-[250px] sm:mr-5 sm:ml-5 sm:w-[250px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px]"> */}
              {/* Gambar */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full" /* Menambahkan h-full untuk tinggi */
              />
            </div>
            <div className="md:w-1/2 w-full p-4">
              {/* Deskripsi */}
              <h1 className="text-2xl font-bold mb-3 md:text-4xl">{product.title}</h1>
              <div className="text-2xl font-semibold md:text-4xl">${product.price}</div>
              <div className="flex items-center mt-2">
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      fill="currentColor"
                      stroke="currentColor"
                      className={`w-4 h-4 ${product.rating && product.rating.rate >= star && product.rating.rate <= 5 ? 'text-yellow-300' : 'text-gray-400'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  ))}
                  <span className="text-gray-600 ml-3">{product.rating.rate}</span>
                </div>
              </div>
              <div className="mt-4 mb-6">
                <p className="text-sm">{product.description}</p>
              </div>
              <div className="flex px-5 items-center justify-center rounded-lg cursor-pointer border border-opacity-10 border-black w-[7rem]">
                  <span
                    onClick={decrement}
                    className="py-1 px-3.5 duration-100 hover-bg-thirdColor hover-text-blue-50 font-bold text-2xl"
                  >-</span>
                  <input
                    className="h-10 w-10 text-center cursor-pointer text-xl font-semibold"
                    type="text"
                    value={quantity}
                  />
                  <span
                    onClick={increment}
                    className="py-1 px-3.5 duration-100 hover-bg-thirdColor cursor-pointer hover-text-blue-50 font-bold text-2xl"
                  >+</span>
                </div>
              <div className="flex items-center space-x-4 mt-6 text-sm font-medium">
                <button
                  className="h-10 px-6 font-semibold rounded-md border bg-blue-500 border-slate-200 text-white text-sm hover:bg-blue-600 hover:text-white duration-100 flex items-center justify-center"
                  type="button"
                  onClick={handleAddToCart}
                >
                  <span>Add to Cart</span>
                  <CiShoppingCart
                    size={32}
                    style={{ marginRight: '4px' }} // Menambahkan margin kanan ke ikon
                  />
                </button>
                <p className="text-slate-700">Stok barang: {product.qty}</p>
              </div>
            </div>
          </div>
        ))}
        
    </div>
      <div className=" ml-5 mr-5">
        <div className="mb-10 px-5 md:ml-10 md:mr-10 md:mb-10 shadow-md">
          <h1 className="font-bold text-2xl mt-5">Produk Lainnya</h1>
        <ProductsPage/>
      </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;

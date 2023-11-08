import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { getUsername } from "../../services/auth.service";
import { useState } from "react";
import { toast } from 'react-hot-toast';
import { CiShoppingCart } from "react-icons/ci";
import Button from "../elements/button/Button";

function CardProduct({ children }) {
  return (
    <div className="font-nunito flex flex-col justify-between w-full h-auto max-w-sm bg-white border border-gray-200 rounded-lg hover:border hover:border-blue-500 shadow-lg">
      {children}
    </div>
  );
}

function Header({ image, id }) {
  const navigate = useNavigate();
  const handleDetail = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="px-1 rounded-t-lg flex items-center justify-center h-[280px]  w-full min-h-[200px] md:h-[280px] cursor-pointer">
    <img
      src={image}
      alt="product"
      className="W-full h-full"
      onClick={handleDetail}
    />
    </div>
  );
}

function Body({ name, id }) {
  return (
    <div className="px-4 pb-5 mb-10 h-[3.5rem]">
      <Link to={`/products/${id}`}>
        <h5 className="text-xl font-semibold tracking-tight text-secondColor text-center">
          {name}
        </h5>
        
      </Link>
    </div>
  );
}

function Footer({ id , onOutOfStockNotification }) {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1); // State untuk jumlah barang yang akan ditambahkan ke keranjang

  const handleAddToCart = () => {
    const isLogin = localStorage.getItem("token");
    const user = isLogin ? getUsername(localStorage.getItem("token")) : null;
    if (isLogin) {
      if (quantity <= 0) {
        toast.error("Invalid quantity");
      } else if (quantity > filteredProducts[0].qty) {
        onOutOfStockNotification(); // Panggil notifikasi produk habis
      } else {
        dispatch(
          addToCart({ user, orderItems: [{ id: Number(id), qty: quantity }] })
        );
        setQuantity(1);
        notify();
      }
    } else {
      window.location.href = "/login";
    }
  };
  const filteredProducts = products.filter(
    (product) => product.id === Number(id)
  );
  const notify = () => {
    toast('Added to the cart!', {
        icon: '🛒',
    });
  };

  return (
    <div className="mt-5">
      {filteredProducts.length > 0 &&
        filteredProducts.map((product) => (
          <div key={product.id} className="">
            <div key={product.id} className="flex items-center mt-10 justify-between px-5 pb-5">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  fill="currentColor"
                  stroke="currentColor"
                  className={`w-4 h-4 ${
                    product.rating && product.rating.rate >= star && product.rating.rate <= 5
                      ? 'text-yellow-300'
                      : 'text-gray-400'
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              ))}
              <span className="text-gray-600 ml-3">
                {product.rating && product.rating.rate ? product.rating.rate : 'No rating'}
              </span>
            </div>
            <p className="text-sm text-black font-bold">Sisa : {product.qty}</p>
          </div>
          <div className="flex flex-col justify-between px-5 pb-5 lg:flex-col md:flex-col">
            <span className="text-xl font-bold text-black mb-2 sm:mb-0 sm:mr-4">
              {" "}
              {product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </span>

            <Button className="bg-blue-500" onClick={handleAddToCart}>
              <div className="hidden sm:block sm:hidden:md:block">Add To Cart</div>
              <div className="md:hidden sm:md:block">Cart</div>
              <CiShoppingCart size={32} style={{ marginRight: '4px' }} />
            </Button>
          </div>
          </div>
        ))}
    </div>
  );
}  

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;

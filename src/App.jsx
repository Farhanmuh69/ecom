import React from "react";
import Navbar from "./components/layouts/Navbar";
import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/products";
import LoginPage from "./pages/login";
import Cart from "./pages/cart";
import ProductDetailPage from "./pages/detailProduct";
import StockPage from "./pages/stock";
import ReportPage from "./pages/report";
import { Footer } from "./components/layouts/Footer";
// import Sidebar from "./components/layouts/SideBar";


function App() {
  return (
    <>
      <Navbar />
      {/* <Sidebar/> */}
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

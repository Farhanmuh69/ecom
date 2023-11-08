import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../../redux/slices/categorySlice";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { getCategories } from "../../redux/slices/categorySlice";

function Category() {
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector((state) => state.categories);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Ubah ke ukuran layar yang sesuai dengan perangkat seluler
    };
    handleResize(); // Panggil satu kali saat komponen pertama kali dimuat
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCategoryClick = (category) => {
    if (category === "All Categories") {
      dispatch(setSelectedCategory(null));
      dispatch(fetchProducts(null));
    } else {
      dispatch(setSelectedCategory(category));
      dispatch(fetchProducts(category));
    }
  };

  return (
    <div className="w-1/6 font-nunito ml-7">
      <div className="text-xl font-bold mb-2 border-b-4">Category</div>
      {isMobile ? ( // Tampilkan dropdown pada tampilan perangkat seluler
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryClick(e.target.value)}
          className="block w-full p-2 ml-1 text-lg text-firstColor hover:bg-secondColor hover:text-firstColor hover:rounded-lg hover:duration-150"
        >
          <option value={null}>All Categories</option>
          {categories?.map((category, i) => (
            <option value={category} key={i}>
              {category}
            </option>
          ))}
        </select>
      ) : (
        <div>
          <div
            onClick={() => handleCategoryClick("All Categories")}
            className={`flex items-center cursor-pointer p-2 ml-1 text-lg ${
              selectedCategory === null ? "text-firstColor" : "hover:bg-secondColor hover:text-firstColor hover:rounded-lg hover:duration-150"
            }`}
          >
            All Categories
          </div>
          {categories?.map((category, i) => (
            <div
              onClick={() => handleCategoryClick(category)}
              className={`flex items-center cursor-pointer p-2 ml-1 text-lg ${
                selectedCategory === category ? "text-firstColor" : "hover:bg-secondColor hover:text-firstColor hover:rounded-lg hover:duration-150"
              }`}
              key={i}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default Category;
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productsReducer from "./slices/productsSlice";
import orderReducer from "./slices/orderSlice";
import categorySlice from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    order: orderReducer,
    categories: categorySlice,
  }
})

export default store
// orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderItems: JSON.parse(localStorage.getItem('order') || '[]'),
  },
  reducers: {
    addToOrder: (state, action) => {
      const itemsToAdd = action.payload;
      itemsToAdd.forEach(itemToAdd => {
        const existingItem = state.orderItems.find(item => item.id === itemToAdd.id);

        if (existingItem) {
          existingItem.qty += itemToAdd.qty;
        } else {
          state.orderItems.push(itemToAdd);
        }
      });
      localStorage.setItem('order', JSON.stringify(state.orderItems));
    },
  },
});

export const { addToOrder } = orderSlice.actions;
export default orderSlice.reducer;

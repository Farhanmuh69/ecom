import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: JSON.parse(localStorage.getItem('cart') || '[]'),
  },
  reducers: {
    addToCart: (state, action) => {
      const { user, orderItems } = action.payload;
      const existingUser = state.data.find(item => item.user === user);

      if (existingUser) {
        // If user exists, check if the cart ID is the same
        const existingCartItem = existingUser.cart.find(item => item.id === orderItems[0].id);

        if (existingCartItem) {
          // If cart item exists, update the quantity
          existingCartItem.qty += orderItems[0].qty;
        } else {
          // If cart item doesn't exist, add a new item to the user's cart
          existingUser.cart.push({ id: orderItems[0].id, qty: orderItems[0].qty });
        }
      } else {
        // If user doesn't exist, add a new entry to the state data array
        state.data.push({ user, cart: [{ id: orderItems[0].id, qty: orderItems[0].qty }] });
      }
      localStorage.setItem('cart', JSON.stringify(state.data));
      return state;
    },

    decreaseCart: (state, action) => {
      const { user, orderItems } = action.payload;
      const existingUser = state.data.find(item => item.user === user);

      if (existingUser) {
        // If user exists, check if the cart ID is the same
        const existingCartItem = existingUser.cart.find(item => item.id === orderItems[0].id);

        if (existingCartItem) {
          // If cart item exists, decrement the quantity
          existingCartItem.qty--;

          // If quantity becomes zero, remove the item from the cart
          if (existingCartItem.qty === 0) {
            existingUser.cart = existingUser.cart.filter(item => item.id !== orderItems[0].id);
          }
        } else {
          // If cart item doesn't exist, add a new item to the user's cart
          existingUser.cart.push({ id: orderItems[0].id, qty: 1 });
        }
      } else {
        // If user doesn't exist, add a new entry to the state data array
        state.data.push({ user, cart: [{ id: orderItems[0].id, qty: 1 }] });
      }

      localStorage.setItem('cart', JSON.stringify(state.data));
    },

    removeCartItem: (state, action) => {
      const { user, itemId } = action.payload;
      const existingUser = state.data.find(item => item.user === user);

      if (existingUser) {
        // If user exists, find the cart item by ID
        const updatedCart = existingUser.cart.filter(item => item.id !== itemId);

        // Update the user's cart with the filtered cart items
        existingUser.cart = updatedCart;
      }

      // Update the local storage and state
      localStorage.setItem('cart', JSON.stringify(state.data));
    },

    removerCartByUser: (state, action) => {
      const userToRemove = action.payload;
      state.data = state.data.filter(item => item.user !== userToRemove);
      localStorage.setItem('cart', JSON.stringify(state.data));
    }
  }
})

export const { addToCart, removeCartItem, decreaseCart, removerCartByUser } = cartSlice.actions;
export default cartSlice.reducer;
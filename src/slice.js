import toolkit from "@reduxjs/toolkit";

const { configureStore, createSlice } = toolkit;

const cartSlicer = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlicer.reducer,
  },
})

console.log('ON CREATE STORE', store.getState());

store.subscribe(() => {
  console.log("STORE CHANGED", store.getState());
})

store.dispatch(cartSlicer.actions.addToCart({ id: 1, qty: 20 }))
store.dispatch(cartSlicer.actions.addToCart({ id: 2, qty: 20 }))
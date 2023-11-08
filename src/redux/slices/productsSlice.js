// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   products: JSON.parse(localStorage.getItem("products")) || [],
//   error: '',
//   isLoading: false,
// }

// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     clearProducts: (state) => {
//       state.products = initialState.products;
//     },
//     updateStock: (state, action) => {
//       const itemInCart = state.products.find(item => item.id === action.payload.id);
//       if (itemInCart) {
//         itemInCart.qty = action.payload.qty;
//       }
//       localStorage.setItem("products", JSON.stringify(state.products));
//     }
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchProducts.rejected, (state, action) => {
//       state.error = action.payload;
//       state.isLoading = false;
//     }).addCase(fetchProducts.fulfilled, (state, action) => {
//       state.products = action.payload;
//       state.isLoading = false;
//     }).addCase(fetchProducts.pending, (state) => {
//       state.isLoading = true;
//     })
//   }

// })

// export const { clearProducts, updateStock } = productsSlice.actions;
// export default productsSlice.reducer;

// export const fetchProducts = createAsyncThunk('products/fetchProducts', async (category) => {
//   let apiUrl = 'https://fakestoreapi.com/products';
  
//   if (category) {
//     apiUrl = `https://fakestoreapi.com/products/category/${category}`;
//   }

//   const res = await fetch(apiUrl);
//   const data = await res.json();
//   const addStock = data.map((item) => {
//     return {
//       ...item,
//       qty: 20
//     };
//   });
//   localStorage.setItem("products", JSON.stringify(addStock));
//   return addStock;
// });

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: JSON.parse(localStorage.getItem("products")) || [],
  error: '',
  isLoading: false,
}


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = initialState.products;
    },
    updateStock: (state, action) => {
      const itemInCart = state.products.find(item => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.qty = action.payload.qty;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }).addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    }).addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    })
  }

})

export const { clearProducts, updateStock } = productsSlice.actions;
export default productsSlice.reducer;

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (category) => {
  // Gantilah URL berdasarkan kategori yang dipilih atau semuanya jika category adalah null
  let apiUrl = 'https://fakestoreapi.com/products';
  
  if (category) {
    apiUrl = `https://fakestoreapi.com/products/category/${category}`;
  }

  const res = await fetch(apiUrl);
  const data = await res.json();
  const addStock = data.map((item) => {
    return {
      ...item,
      qty: 20
    };
  });
  localStorage.setItem("products", JSON.stringify(addStock));
  return addStock;
});


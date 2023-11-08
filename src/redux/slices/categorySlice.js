import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  catgoies: []
}

export const getCategories = createAsyncThunk('category', async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  const data = await response.json();
  return data;
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;

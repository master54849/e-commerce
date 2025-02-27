import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${category}?limit=600`);
      const data = await response.json();
      return { category, products: data.products };
    } catch {
      alert("Getting a fetching error!");
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    categories: [
      'beauty', 'fragrances', 'furniture', 'groceries',
      'home-decoration', 'kitchen-accessories', 'laptops',
      'mens-shirts', 'mens-shoes', 'mens-watches', 'mobile-accessories',
      'motorcycle', 'skin-care', 'smartphones', 'sports-accessories',
      'sunglasses', 'tablets', 'tops', 'vehicle', 
      'womens-bags', 'womens-dresses', 'womens-jewellery', 
      'womens-shoes', 'womens-watches'
    ],
    productsByCategory: {},
    loading: false,
    error: null,
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(item => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        const newItem = { ...action.payload, quantity: 1 }; 
        state.cart.push(newItem);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id); 
    },
    updateCartQuantity: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity; 
      }
    },
    clearCart: (state) => {
      state.cart = []; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.productsByCategory[action.payload.category] = action.payload.products;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = productsSlice.actions;

export default productsSlice.reducer;

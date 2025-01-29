import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalPrice = state.cartItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.cartItems = state.cartItems.filter(item => item.id !== id);
        state.totalPrice = state.cartItems.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      if (existingItem) {
        existingItem.totalPrice = existingItem.price * quantity;
        existingItem.quantity = quantity;
        state.totalPrice = state.cartItems.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

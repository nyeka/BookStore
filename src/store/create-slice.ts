import { createSlice } from "@reduxjs/toolkit";

const sliceStore = createSlice({
  name: "sliceStore",
  initialState: {
    cartitem: [] as any[],
    totalQuantity: 0,
    showCart: false,
  },
  reducers: {
    addTocart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartitem.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.cartitem.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          name: newItem.name,
          totalPrice: newItem.price,
          image: newItem.image,
          author: newItem.author,
        });
      }
      state.totalQuantity++;
    },

    setShowCart(state) {
      state.showCart = !state.showCart;
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartitem.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.cartitem = state.cartitem.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        state.totalQuantity--;
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },

    clearCart(state) {
      state.cartitem = [];
      state.totalQuantity = 0;
    },
  },
});

export const sliceActions = sliceStore.actions;

export default sliceStore;

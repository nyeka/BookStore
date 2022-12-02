import { configureStore } from "@reduxjs/toolkit";
import sliceStore from "./create-slice";

const store = configureStore({
  reducer: {
    cart: sliceStore.reducer,
  },
});

export default store;

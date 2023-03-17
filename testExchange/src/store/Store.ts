import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import coinsSlice from "../slice/coinsSlice";

const store = configureStore({
  reducer: {
    coin: coinsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

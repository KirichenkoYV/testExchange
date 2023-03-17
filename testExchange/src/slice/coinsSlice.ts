import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CoinsState } from "../Types";
import * as coinsApi from "../api/apiExchange";

const initialState: CoinsState = {
  availableCoins: undefined,
  error: undefined,
};

export const getAvailableCoins = createAsyncThunk(
  "coins/available",
  async () => {
    const availableCoins = await coinsApi.requestListOfAvailableCurrencies();
    return availableCoins;
  }
);

export const getPairTicketCoins = createAsyncThunk(
  "coins/min-amount",
  async (pairCoins: string) => {
    const minAmoutPair = await coinsApi.requestMinimalExchangeAmount(pairCoins);
    return minAmoutPair;
  }
);

export const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableCoins.fulfilled, (state, action) => {
        const availableCoins = action.payload;
        state.availableCoins = availableCoins;
      })
      .addCase(getAvailableCoins.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default coinsSlice.reducer;

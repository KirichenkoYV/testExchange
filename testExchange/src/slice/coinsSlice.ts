import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CoinsState, TypeExchangeData } from "../types/Types";
import * as coinsApi from "../api/apiExchange";

const initialState: CoinsState = {
  availableCoins: [],
  error: undefined,
  minAmount: "",
  resExchange: "",
  errorPairs: undefined,
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
export const getExchangeData = createAsyncThunk(
  "coins/exchange-amount",
  async (exchangeData: TypeExchangeData) => {
    const resExchange = await coinsApi.requestEstimatedExchangeAmount(
      exchangeData
    );
    return resExchange;
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
        state.errorPairs = undefined;
      })
      .addCase(getAvailableCoins.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getPairTicketCoins.fulfilled, (state, action) => {
        const minAmount = action.payload;
        state.minAmount = minAmount;
        state.errorPairs = undefined;
      })
      .addCase(getPairTicketCoins.rejected, (state, action) => {
        state.errorPairs = "This pair is disabled now";
      })
      .addCase(getExchangeData.fulfilled, (state, action) => {
        const resExchange = action.payload;
        state.resExchange = resExchange;
        state.errorPairs = undefined;
      })
      .addCase(getExchangeData.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default coinsSlice.reducer;

import { keyAPI } from "../common/common";
import { TypeExchangeData } from "../types/Types";

export const requestListOfAvailableCurrencies = async () => {
  const url = "https://api.changenow.io/v1/currencies?active=true";
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const requestMinimalExchangeAmount = async (pairCoins: string) => {
  const url = `https://api.changenow.io/v1/min-amount/${pairCoins}?api_key=${keyAPI}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data.minAmount;
};

export const requestEstimatedExchangeAmount = async (
  exchangeData: TypeExchangeData
) => {
  const url = `https://api.changenow.io/v1/exchange-amount/${exchangeData.exchangeAmout}/${exchangeData.firstCoin}_${exchangeData.secondCoin}?api_key=${keyAPI}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data.estimatedAmount;
};

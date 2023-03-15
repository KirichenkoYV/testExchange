import { keyAPI } from "../common/common";

export const requestListOfAvailableCurrencies = async () => {
  const url = "https://api.changenow.io/v1/currencies?active=true";
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const requestMinimalExchangeAmount = async () => {
  const url = `https://api.changenow.io/v1/min-amount/${WhatChange}?api_key=${keyAPI}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const requestEstimatedExchangeAmount = async () => {
  const url = `https://api.changenow.io/v1/exchange-amount/${summa}/${WhatChange}?api_key=${keyAPI}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

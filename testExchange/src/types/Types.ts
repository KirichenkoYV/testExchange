export type CoinsState = {
  availableCoins: [];
  error: string | undefined;
  minAmount: string;
  resExchange: string;
  errorPairs: string | null;
};

export type TypeCoin = {
  featured: boolean;
  hasExternalId: boolean;
  image: string;
  isFiat: boolean;
  isStable: boolean;
  name: string;
  supportsFixedRate: boolean;
  ticker: string;
};

export type TypeDefaultCoin = {
  image: string;
  ticker: string;
};

export type TypeExchangeData = {
  firstCoin: string;
  secondCoin: string;
  exchangeAmout: string | undefined;
};

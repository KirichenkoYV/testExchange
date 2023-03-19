export type CoinsState = {
  availableCoins: [] | undefined;
  error: string | undefined;
  minAmount: number | undefined;
  resExchange: string | undefined;
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

export type TypeExchangeData = {
  firstCoin: string;
  secondCoin: string;
  exchangeAmout: string;
};

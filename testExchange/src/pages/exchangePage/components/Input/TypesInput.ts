import { TypeCoin, TypeDefaultCoin } from "../../../../types/Types";

export type TypeProps = {
  allAvailableCoins: TypeCoin[];
  Input: string;
  setButtonContent: (coin: TypeCoin) => void;
  setContentLi: (coin: string) => void;
  setInput: (value: string) => void;
  contentLi: string;
  buttonContent: TypeDefaultCoin;
  setLastActivInput: (option: string) => void;
  lastActiv: string;
};

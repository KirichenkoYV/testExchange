import { TypeCoin, TypeDefaultCoin } from "../../../../types/Types";

export type TypeProps = {
  allAvailableCoins: TypeCoin[];
  rigthInput: string;
  setButtonContentRight: (coin: TypeCoin) => void;
  setContentLiRight: (coin: string) => void;
  setRightInput: (value: string) => void;
  contentLiRight: string;
  buttonContentRight: TypeDefaultCoin;
  setLastActivInput: (option: string) => void;
};

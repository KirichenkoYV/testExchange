import { TypeCoin, TypeDefaultCoin } from "../../../../Types";

export type TypeProps = {
  allAvailableCoins: TypeCoin[] | undefined;
  rightInput: string;
  setButtonContentRight: (coin: TypeCoin) => void;
  setContentLiRight: (coin: string) => void;
  setRightInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  contentLiRight: string;
  buttonContentRight: TypeDefaultCoin;
  setLastActivInput: (option: string) => void;
};

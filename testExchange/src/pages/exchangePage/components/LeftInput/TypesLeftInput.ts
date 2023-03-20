import { TypeCoin, TypeDefaultCoin } from "../../../../types/Types";

export type TypeProps = {
  allAvailableCoins: TypeCoin[] | undefined;
  leftInput: string;
  setButtonContentLeft: (coin: TypeCoin) => void;
  setContentLiLeft: (coin: string) => void;
  setLeftInput: (value: string) => void;
  contentLiLeft: string;
  buttonContentLeft: TypeDefaultCoin;
  setLastActivInput: (option: string) => void;
};

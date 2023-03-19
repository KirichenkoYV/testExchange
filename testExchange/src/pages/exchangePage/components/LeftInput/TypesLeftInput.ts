import { TypeCoin, TypeDefaultCoin } from "../../../../Types";

export type TypeProps = {
  allAvailableCoins: TypeCoin[] | undefined;
  leftInput: string;
  setButtonContentLeft: (coin: TypeCoin) => void;
  setContentLiLeft: ({}) => void;
  setLeftInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  contentLiLeft: string;
  buttonContentLeft: TypeDefaultCoin;
};

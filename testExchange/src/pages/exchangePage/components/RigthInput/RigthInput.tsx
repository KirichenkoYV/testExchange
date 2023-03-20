import { useState } from "react";
import { useAppDispatch } from "../../../../store/Store";
import { TypeCoin } from "../../../../Types";

import style from "./RigthInput.module.scss";
import { TypeProps } from "./TypesRigthInputs";

function RigthInput({
  setButtonContentRight,
  setContentLiRight,
  setRightInput,
  buttonContentRight,
  allAvailableCoins,
  contentLiRight,
  rigthInput,
  setLastActivInput,
} : TypeProps) {
  const [showSelectCoins, setSelectCoins] = useState(false);

  function readContextRight(coin: TypeCoin): void {
    setButtonContentRight(coin);
    setContentLiRight(coin.ticker);
  }

  function changeRigthInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setRightInput(event.target.value);
  }
  const onFocus = () => setLastActivInput("left");

  function changeShowSelectCoins() {
    setSelectCoins((prev) => !prev);
  }

  return (
    <div className={style.ExchangePageInputRigth}>
      <div className={style.ExchangePageInputRigthBtnInput}>
        <input
          className={style.ExchangePageInputRigthIptCoin}
          value={rigthInput}
          onChange={changeRigthInput}
          onFocus={onFocus}
        ></input>
        <div
          onClick={changeShowSelectCoins}
          className={style.ExchangePageInputRigthBtn}
        >
          <img
            className={style.ExchangePageInputRigthBtnImg}
            src={buttonContentRight.image}
          ></img>
          <span className={style.ExchangePageInputRigthCoinTicker}>
            {buttonContentRight.ticker}
          </span>
          <img
            className={style.ExchangePageInputRigthBtnArrow}
            src="Vector.svg"
            alt="arrow"
          ></img>
        </div>
      </div>
      {showSelectCoins && (
        <div className={style.ExchangePageInputRigthModal}>
          <ul>
            {allAvailableCoins?.map((coin: TypeCoin) => (
              <li
                className={style.ExchangePageInputRigthCoinSelection}
                key={coin.ticker}
                value={contentLiRight}
                onClick={() => {
                  readContextRight(coin);
                }}
              >
                <div>
                  <img src={coin.image}></img>
                </div>
                <div>
                  <span className={style.ExchangePageInputRigthCoinTicker}>
                    {coin.ticker}
                  </span>
                  <span className={style.ExchangePageInputRigthCoinName}>
                    {coin.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RigthInput;

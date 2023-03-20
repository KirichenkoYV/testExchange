import { useState } from "react";
import { TypeCoin } from "../../../../Types";
import { TypeProps } from "./TypesLeftInput";

import style from "./LeftInput.module.scss";

function LeftInput({
  allAvailableCoins,
  leftInput,
  setButtonContentLeft,
  setContentLiLeft,
  setLeftInput,
  contentLiLeft,
  buttonContentLeft,
  setLastActivInput,
}: TypeProps) {
  const [showSelectCoins, setSelectCoins] = useState(false);

  function readContextLeft(coin: TypeCoin): void {
    setButtonContentLeft(coin);
    setContentLiLeft(coin.ticker);
  }

  function changeLeftInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setLeftInput(event.target.value);
  }
  function onFocus(): void {
    setLastActivInput("rigth");
  }

  function changeShowSelectCoins() {
    setSelectCoins((prev) => !prev);
  }

  return (
    <div className={style.ExchangePageInputLeft}>
      <div className={style.ExchangePageInputLeftBtnInput}>
        <input
          className={style.ExchangePageInputLeftIptCoin}
          value={leftInput}
          onChange={changeLeftInput}
          onFocus={onFocus}
        ></input>
        <div
          onClick={changeShowSelectCoins}
          className={style.ExchangePageInputLeftBtn}
        >
          <img
            className={style.ExchangePageInputLeftBtnImg}
            src={buttonContentLeft.image}
          ></img>
          <span className={style.ExchangePageInputLeftCoinTicker}>
            {buttonContentLeft.ticker}
          </span>
          <img
            className={style.ExchangePageInputLeftBtnArrow}
            src="Vector.svg"
            alt="arrow"
          ></img>
        </div>
      </div>
      {showSelectCoins && (
        <div className={style.ExchangePageInputLeftModal}>
          <ul>
            {allAvailableCoins?.map((coin: TypeCoin) => (
              <li
                className={style.ExchangePageInputLeftCoinSelection}
                key={coin.ticker}
                value={contentLiLeft}
                onClick={() => {
                  readContextLeft(coin);
                }}
              >
                <div>
                  <img src={coin.image}></img>
                </div>
                <div>
                  <span className={style.ExchangePageInputLeftCoinTicker}>
                    {coin.ticker}
                  </span>
                  <span className={style.ExchangePageInputLeftCoinName}>
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

export default LeftInput;

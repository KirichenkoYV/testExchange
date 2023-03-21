import { useState } from "react";
import { TypeCoin } from "../../../../types/Types";
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
  const [searchValue, setSearchValue] = useState("");

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
  function closeModal() {
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
            <li className={style.ExchangePageInputLeftModalSearch}>
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className={style.ExchangePageInputLeftModalInpSearch}
                placeholder="Search by coin name"
              />{" "}
              <img
                className={style.ExchangePageInputLeftModalImgClose}
                onClick={closeModal}
                src="VectorClose.svg"
                alt="arrow"
              ></img>
            </li>
            {searchValue
              ? allAvailableCoins
                  .filter((el) => {
                    return el.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase());
                  })
                  .map((coin: TypeCoin) => (
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
                  ))
              : allAvailableCoins.map((coin: TypeCoin) => (
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

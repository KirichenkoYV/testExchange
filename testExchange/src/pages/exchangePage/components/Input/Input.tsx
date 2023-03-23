import { useEffect, useRef, useState } from "react";
import { TypeCoin } from "../../../../types/Types";
import { TypeProps } from "./TypesInput";

import style from "./Input.module.scss";

function Input({
  allAvailableCoins,
  Input,
  setButtonContent,
  setContentLi,
  setInput,
  contentLi,
  buttonContent,
  setLastActivInput,
  lastActiv,
}: TypeProps) {
  const [showSelectCoins, setSelectCoins] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // const modalRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   const closeModal = (e) => {
  //     console.log(e);

  //     if (e.path !== modalRef) {
  //     }
  //   };

  //   document.body.addEventListener("click", closeModal);
  // }, []);

  function readContext(coin: TypeCoin): void {
    setButtonContent(coin);
    setContentLi(coin.ticker);
  }
  function changeInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setInput(event.target.value);
  }
  function onFocus(): void {
    setLastActivInput(lastActiv);
  }
  function changeShowSelectCoins() {
    setSelectCoins((prev) => !prev);
  }
  function closeModal() {
    setSelectCoins((prev) => !prev);
  }

  return (
    <div className={style.ExchangePageInput}>
      <div className={style.ExchangePageInputBtnInput}>
        <input
          className={style.ExchangePageInputIptCoin}
          value={Input}
          onChange={changeInput}
          onFocus={onFocus}
        ></input>
        <div
          onClick={changeShowSelectCoins}
          className={style.ExchangePageInputBtn}
        >
          {buttonContent?.ticker.length < 7 ? (
            <div className={style.ExchangePageInputBtnImage}>
              <img
                className={style.ExchangePageInputBtnImg}
                src={buttonContent?.image}
              ></img>
              <span className={style.ExchangePageInputCoinTicker}>
                {buttonContent?.ticker}
              </span>
            </div>
          ) : (
            <div className={style.ExchangePageInputBtnImageLongs}>
              <img
                className={style.ExchangePageInputBtnImg}
                src={buttonContent?.image}
              ></img>
              <span className={style.ExchangePageInputCoinTicker}>
                {buttonContent?.ticker}
              </span>
            </div>
          )}
          <img
            className={style.ExchangePageInputBtnArrow}
            src="Vector.svg"
            alt="arrow"
          ></img>
        </div>
      </div>
      {showSelectCoins && (
        <div
          // ref={modalRef}
          className={style.ExchangePageInputModal}
        >
          <ul className={style.ExchangePageInputModalUl}>
            <li className={style.ExchangePageInputModalSearch}>
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className={style.ExchangePageInputModalInpSearch}
                placeholder="Search by coin name"
              />{" "}
              <img
                className={style.ExchangePageInputModalImgClose}
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
                      className={style.ExchangePageInputCoinSelection}
                      key={coin.ticker}
                      value={contentLi}
                      onClick={() => {
                        readContext(coin);
                      }}
                    >
                      <div>
                        <img src={coin.image}></img>
                      </div>
                      <div>
                        <span className={style.ExchangePageInputCoinTicker}>
                          {coin.ticker}
                        </span>
                        <span className={style.ExchangePageInputCoinName}>
                          {coin.name}
                        </span>
                      </div>
                    </li>
                  ))
              : allAvailableCoins.map((coin: TypeCoin) => (
                  <li
                    className={style.ExchangePageInputCoinSelection}
                    key={coin.ticker}
                    value={contentLi}
                    onClick={() => {
                      readContext(coin);
                    }}
                  >
                    <div>
                      <img src={coin.image}></img>
                    </div>
                    <div>
                      <span className={style.ExchangePageInputCoinTicker}>
                        {coin.ticker}
                      </span>
                      <span className={style.ExchangePageInputCoinName}>
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

export default Input;

import { useState } from "react";
import { TypeCoin } from "../../../../types/Types";

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
}: TypeProps) {
  const [showSelectCoins, setSelectCoins] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  function readContextRight(coin: TypeCoin): void {
    setButtonContentRight(coin);
    setContentLiRight(coin.ticker);
  }
  function changeRigthInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setRightInput(event.target.value);
  }
  function onFocus() {
    setLastActivInput("left");
  }
  function changeShowSelectCoins() {
    setSelectCoins((prev) => !prev);
  }

  function closeModal() {
    setSelectCoins((prev) => !prev);
  }

  return (
    <div className={style.ExchangePageInputRight}>
      <div className={style.ExchangePageInputRightBtnInput}>
        <input
          className={style.ExchangePageInputRightIptCoin}
          value={rigthInput}
          onChange={changeRigthInput}
          onFocus={onFocus}
        ></input>
        <div
          onClick={changeShowSelectCoins}
          className={style.ExchangePageInputRightBtn}
        >
          <img
            className={style.ExchangePageInputRightBtnImg}
            src={buttonContentRight.image}
          ></img>
          <span className={style.ExchangePageInputRightCoinTicker}>
            {buttonContentRight.ticker}
          </span>
          <img
            className={style.ExchangePageInputRightBtnArrow}
            src="Vector.svg"
            alt="arrow"
          ></img>
        </div>
      </div>
      {showSelectCoins && (
        <div className={style.ExchangePageInputRightModal}>
          <ul>
            <li className={style.ExchangePageInputRightModalSearch}>
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className={style.ExchangePageInputRightModalInpSearch}
                placeholder="Search by coin name"
              />{" "}
              <img
                className={style.ExchangePageInputRightModalImgClose}
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
                      className={style.ExchangePageInputRightCoinSelection}
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
                        <span
                          className={style.ExchangePageInputRightCoinTicker}
                        >
                          {coin.ticker}
                        </span>
                        <span className={style.ExchangePageInputRightCoinName}>
                          {coin.name}
                        </span>
                      </div>
                    </li>
                  ))
              : allAvailableCoins.map((coin: TypeCoin) => (
                  <li
                    className={style.ExchangePageInputRightCoinSelection}
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
                      <span className={style.ExchangePageInputRightCoinTicker}>
                        {coin.ticker}
                      </span>
                      <span className={style.ExchangePageInputRightCoinName}>
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

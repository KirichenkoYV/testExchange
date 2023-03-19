import { TypeCoin } from "../../../../Types";

import style from "./LeftInput.module.scss";
import { TypeProps } from "./TypesLeftInput";

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
  function readContextLeft(coin: TypeCoin): void {
    setButtonContentLeft(coin);
    setContentLiLeft(coin.ticker);
  }

  function changeLeftInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setLeftInput(event.target.value);
  }
  const onFocus = () => setLastActivInput("rigth");

  return (
    <div className={style.ExchangePageInputLeft}>
      <div className={style.ExchangePageInputLeftBtnInput}>
        <input
          value={leftInput}
          onChange={changeLeftInput}
          onFocus={onFocus}
        ></input>
        <div className={style.ExchangePageInputLeftBtn}>
          <img src={buttonContentLeft.image}></img>
          <div className={style.ExchangePageInputLeftCoinTicker}>
            {buttonContentLeft.ticker}
          </div>
        </div>
      </div>
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
    </div>
  );
}

export default LeftInput;

import { useAppDispatch } from "../../../../store/Store";
import { TypeCoin } from "../../../../Types";

import style from "./RigthInput.module.scss";

function RigthInput({
  setButtonContentRight,
  setContentLiRight,
  setRightInput,
  resExchange,
  buttonContentRight,
  allAvailableCoins,
  contentLiRight,
  rigthInput,
  setLastActivInput,
}) {
  function readContextRight(coin: TypeCoin): void {
    setButtonContentRight(coin);
    setContentLiRight(coin.ticker);
  }

  function changeRigthInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setRightInput(event.target.value);
  }
  const onFocus = () => setLastActivInput("left");

  return (
    <div className={style.ExchangePageInputRigth}>
      <div className={style.ExchangePageInputRigthBtnInput}>
        <input className={style.ExchangePageInputRigthIptCoin}
          value={rigthInput}
          onChange={changeRigthInput}
          onFocus={onFocus}
        ></input>
        <img src="Line 1.svg" alt="line 1" width="20" height="20" />
        <div className={style.ExchangePageInputRigthBtn}>
          <img src={buttonContentRight.image}></img>
          <div className={style.ExchangePageInputRigthCoinTicker}>
            {buttonContentRight.ticker}
          </div>
        </div>
      </div>
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
    </div>
  );
}

export default RigthInput;

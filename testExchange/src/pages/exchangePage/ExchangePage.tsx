import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store/Store";
import {
  getAvailableCoins,
  getExchangeData,
  getPairTicketCoins,
} from "../../slice/coinsSlice";
import { useSelector } from "react-redux";
import { TypeCoin } from "../../Types";

import style from "./ExchangePage.module.scss";

function ExchangePage() {
  const [addressEth, setAdressEth] = useState<string>("");
  const [buttonContentLeft, setButtonContentLeft] = useState({
    ticker: "btc",
    image: "https://content-api.changenow.io/uploads/btc_d8db07f87d.svg",
  });
  const [buttonContentRight, setButtonContentRight] = useState({
    ticker: "eth",
    image: "https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg",
  });

  let resExchange = useSelector((state: RootState) => state.coin.resExchange);

  console.log(resExchange);

  const [contentLiRight, setContentLiRight] = useState("eth");
  const [contentLiLeft, setContentLiLeft] = useState("btc");
  const [leftInput, setLeftInput] = useState<string>("0.01");
  const [rigthInput, setRightInput] = useState<string | undefined>(resExchange);

  console.log(rigthInput, "resultat input");

  const dispatch = useAppDispatch();

  const allAvailableCoins = useSelector(
    (state: RootState) => state.coin.availableCoins
  );

  useEffect(() => {
    dispatch(getAvailableCoins());
    const pairCoins = `${contentLiLeft}_${contentLiRight}`;
    console.log(pairCoins);
    dispatch(getPairTicketCoins(pairCoins));
    const exchangeData = {
      firstCoin: contentLiLeft,
      secondCoin: contentLiRight,
      exchangeAmout: leftInput,
    };
    dispatch(getExchangeData(exchangeData));
  }, [contentLiRight, contentLiLeft, leftInput, resExchange]);

  function changeAdressEth(event: React.ChangeEvent<HTMLInputElement>): void {
    setAdressEth(event?.target.value);
  }

  function readContextLeft(coin: TypeCoin): void {
    setButtonContentLeft(coin);
    setContentLiLeft(coin.ticker);
  }
  function readContextRight(coin: TypeCoin): void {
    setButtonContentRight(coin);
    setContentLiRight(coin.ticker);
  }

  function changeLeftInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setLeftInput(event.target.value);
  }
  function changeRigthInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setRightInput(event.target.value);
  }

  return (
    <div className={style.ExchangePage}>
      <div className={style.ExchangePageTitle}> Crypto Exchange</div>
      <div className={style.ExchangePageMotto}>Exchange fast and easy</div>
      <div className={style.ExchangePageInputs}>
        <div className={style.ExchangePageInputLeft}>
          <div className={style.ExchangePageInputLefthBtnInput}>
            <input value={leftInput} onChange={changeLeftInput}></input>
            <div className={style.ExchangePageInputLefthBtn}>
              <img src={buttonContentLeft.image}></img>
              <div>{buttonContentLeft.ticker}</div>
            </div>
          </div>
          <div style={{ overflowY: "auto", maxHeight: "200px" }}>
            <ul>
              {allAvailableCoins?.map((coin: TypeCoin) => (
                <li
                  key={coin.ticker}
                  value={contentLiLeft}
                  onClick={() => {
                    readContextLeft(coin);
                  }}
                >
                  <div>
                    <div>
                      <img src={coin.image}></img>
                    </div>
                    <div>
                      <span>{coin.ticker} </span>
                      <span>{coin.name}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className={style.ExchangePageBtnReverse}> <img src="swap.svg" alt="reverse" width="20" height="20"/></button>

        <div className={style.ExchangePageInputRigth}>
          <div className={style.ExchangePageInputRigthBtnInput}>
            <input value={resExchange} onChange={changeRigthInput}></input>
            <div className={style.ExchangePageInputRigthBtn}>
              <img src={buttonContentRight.image}></img>
              <div>{buttonContentRight.ticker}</div>
            </div>
          </div>
          <div style={{ overflowY: "auto", maxHeight: "200px" }}>
            <ul>
              {allAvailableCoins?.map((coin: TypeCoin) => (
                <li
                  key={coin.ticker}
                  value={contentLiRight}
                  onClick={() => {
                    readContextRight(coin);
                  }}
                >
                  <div>
                    <div>
                      <img src={coin.image}></img>
                    </div>
                    <div>
                      <span>{coin.ticker} </span>
                      <span>{coin.name}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div>Your Ethereum address</div>
        <div className={style.ExchangePageUserAddress}>
          <input
            value={addressEth}
            onChange={changeAdressEth}
            className={style.ExchangePageInputAddress}
          ></input>
          <button className={style.ExchangePageBtnExchange}>Exchange</button>
        </div>
      </div>
    </div>
  );
}

export default ExchangePage;

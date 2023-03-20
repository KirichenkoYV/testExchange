import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store/Store";
import {
  getAvailableCoins,
  getExchangeData,
  getPairTicketCoins,
} from "../../slice/coinsSlice";
import { useSelector } from "react-redux";
import LeftInput from "./components/LeftInput/LeftInput";
import RigthInput from "./components/RigthInput/RigthInput";

import style from "./ExchangePage.module.scss";

function ExchangePage() {
  const dispatch = useAppDispatch();

  const [showErrorMin, setshowErrorMin] = useState<boolean>(false);
  const [lastActivInput, setLastActivInput] = useState<string>("left");
  const [addressEth, setAdressEth] = useState<string>("");

  const resExchange = useSelector((state: RootState) => state.coin.resExchange);
  const minAmout = useSelector((state: RootState) => state.coin.minAmount);
  const allAvailableCoins = useSelector(
    (state: RootState) => state.coin.availableCoins
  );

  const [contentLiLeft, setContentLiLeft] = useState<string>("btc");
  const [leftInput, setLeftInput] = useState<string>("" || resExchange);
  const [buttonContentLeft, setButtonContentLeft] = useState({
    ticker: "btc",
    image: "https://content-api.changenow.io/uploads/btc_d8db07f87d.svg",
  });

  const [buttonContentRight, setButtonContentRight] = useState({
    ticker: "eth",
    image: "https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg",
  });
  const [contentLiRight, setContentLiRight] = useState<string>("eth");
  const [rigthInput, setRightInput] = useState<string>(resExchange);

  useEffect(() => {
    dispatch(getAvailableCoins());
  }, []);

  useEffect(() => {
    if (lastActivInput === "left") {
      const exchangeData = {
        firstCoin: contentLiRight,
        secondCoin: contentLiLeft,
        exchangeAmout: rigthInput,
      };
      dispatch(getExchangeData(exchangeData));
      setLeftInput(resExchange);
    }
  }, [contentLiRight, contentLiLeft, rigthInput, resExchange]);

  useEffect(() => {
    setshowErrorMin(false);
    if (lastActivInput === "rigth") {
      const pairCoins = `${contentLiLeft}_${contentLiRight}`;
      dispatch(getPairTicketCoins(pairCoins));
      const exchangeData = {
        firstCoin: contentLiLeft,
        secondCoin: contentLiRight,
        exchangeAmout: leftInput,
      };
      dispatch(getExchangeData(exchangeData));
      if (leftInput < minAmout) {
        setRightInput("-");
        setshowErrorMin(true);
      } else {
        setRightInput(resExchange);
      }
    }
  }, [contentLiRight, contentLiLeft, leftInput, resExchange]);

  useEffect(() => {
    const pairCoins = `${contentLiLeft}_${contentLiRight}`;
    dispatch(getPairTicketCoins(pairCoins));
    setLeftInput(minAmout);
  }, [contentLiLeft, minAmout]);

  function changeAdressEth(event: React.ChangeEvent<HTMLInputElement>): void {
    setAdressEth(event?.target.value);
  }
  return (
    <div className={style.ExchangePage}>
      <h1 className={style.ExchangePageTitle}>Crypto Exchange</h1>
      <h3 className={style.ExchangePageMotto}>Exchange fast and easy</h3>
      <div className={style.ExchangePageInputs}>
        <LeftInput
          allAvailableCoins={allAvailableCoins}
          leftInput={leftInput}
          setButtonContentLeft={setButtonContentLeft}
          setContentLiLeft={setContentLiLeft}
          setLeftInput={setLeftInput}
          contentLiLeft={contentLiLeft}
          buttonContentLeft={buttonContentLeft}
          setLastActivInput={setLastActivInput}
        />
        <button className={style.ExchangePageBtnReverse}>
          <img src="swap.svg" alt="reverse" width="20" height="20" />
        </button>
        <RigthInput
          setButtonContentRight={setButtonContentRight}
          setContentLiRight={setContentLiRight}
          setRightInput={setRightInput}
          buttonContentRight={buttonContentRight}
          allAvailableCoins={allAvailableCoins}
          contentLiRight={contentLiRight}
          rigthInput={rigthInput}
          setLastActivInput={setLastActivInput}
        />
      </div>
      {showErrorMin ? (
        <div className={style.ExchangePageError}>
          {" "}
          Enter amounts above{" "}
          <span className={style.ExchangePageTextError}>{minAmout}</span>
        </div>
      ) : (
        <div className={style.ExchangePageError}>
          <span className={style.ExchangePageTextError}></span>
        </div>
      )}
      <div>
        <h3 className={style.ExchangePageTitleAdress}>Your Ethereum address</h3>
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

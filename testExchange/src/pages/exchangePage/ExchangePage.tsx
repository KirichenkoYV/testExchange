import React, { useEffect, useLayoutEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store/Store";
import {
  getAvailableCoins,
  getExchangeData,
  getPairTicketCoins,
} from "../../slice/coinsSlice";
import { useSelector } from "react-redux";

import style from "./ExchangePage.module.scss";
import { TypeCoin } from "../../types/Types";
import Input from "./components/Input/Input";

function ExchangePage() {
  const dispatch = useAppDispatch();

  const [showError, setShowError] = useState<boolean>(false);

  const [lastActivInput, setLastActivInput] = useState<string>("left");
  const [addressEth, setAdressEth] = useState<string>("");

  const resExchange = useSelector((state: RootState) => state.coin.resExchange);
  const error = useSelector((state: RootState) => state.coin.errorPairs);

  const minAmout = useSelector((state: RootState) => state.coin.minAmount);
  const allAvailableCoins = useSelector(
    (state: RootState): TypeCoin[] => state.coin.availableCoins
  );

  const [contentLiLeft, setContentLiLeft] = useState<string>("btc");
  const [leftInput, setLeftInput] = useState<string>(minAmout || resExchange);
  const [buttonContentLeft, setButtonContentLeft] = useState<TypeCoin>(
    allAvailableCoins[0]
  );

  const [buttonContentRight, setButtonContentRight] = useState<TypeCoin>(
    allAvailableCoins[1]
  );
  const [contentLiRight, setContentLiRight] = useState<string>("eth");
  const [rigthInput, setRightInput] = useState<string>(resExchange);

  useLayoutEffect(() => {
    dispatch(getAvailableCoins());
  }, []);

  useEffect(() => {
    setButtonContentLeft(allAvailableCoins[0]);
    setButtonContentRight(allAvailableCoins[1]);
  }, [allAvailableCoins]);

  useEffect(() => {
    if (lastActivInput === "left") {
      const exchangeData = {
        firstCoin: contentLiRight,
        secondCoin: contentLiLeft,
        exchangeAmout: rigthInput,
      };
      if (exchangeData.exchangeAmout) {
        dispatch(getExchangeData(exchangeData));
      }
    }
  }, [contentLiLeft, rigthInput]);

  useEffect(() => {
    setShowError(false);
    if (lastActivInput === "rigth") {
      if (leftInput > minAmout) {
        const exchangeData = {
          firstCoin: contentLiLeft,
          secondCoin: contentLiRight,
          exchangeAmout: leftInput,
        };
        if (
          exchangeData.firstCoin &&
          exchangeData.secondCoin &&
          exchangeData.exchangeAmout.length > 0 &&
          leftInput > minAmout
        ) {
          dispatch(getExchangeData(exchangeData));
        }
      } else {
        setRightInput("-");
        setShowError(true);
      }
      if (error) {
        setRightInput("-");
        setLeftInput("-");
        setShowError(true);
      }
    }
  }, [contentLiRight, leftInput, error]);

  useEffect(() => {
    if (lastActivInput === "rigth") {
      setRightInput(resExchange);
    } else {
      setLeftInput(resExchange);
    }
  }, [resExchange]);

  useEffect(() => {
    const pairCoins = `${contentLiLeft}_${contentLiRight}`;
    dispatch(getPairTicketCoins(pairCoins));
    setLeftInput(minAmout);
  }, [contentLiLeft, contentLiRight]);

  useEffect(() => {
    setLeftInput(minAmout);
  }, [minAmout]);

  function changeAdressEth(event: React.ChangeEvent<HTMLInputElement>): void {
    setAdressEth(event?.target.value);
  }
  return (
    <div className={style.ExchangePage}>
      <h1 className={style.ExchangePageTitle}>Crypto Exchange</h1>
      <h3 className={style.ExchangePageMotto}>Exchange fast and easy</h3>
      <div className={style.ExchangePageInputs}>
        <Input
          allAvailableCoins={allAvailableCoins}
          Input={leftInput}
          setButtonContent={setButtonContentLeft}
          setContentLi={setContentLiLeft}
          setInput={setLeftInput}
          contentLi={contentLiLeft}
          buttonContent={buttonContentLeft}
          setLastActivInput={setLastActivInput}
          lastActiv={"rigth"}
        />
        <button className={style.ExchangePageBtnReverse}>
          <img src="swap.svg" alt="reverse" width="20" height="20" />
        </button>
        <Input
          setButtonContent={setButtonContentRight}
          setContentLi={setContentLiRight}
          setInput={setRightInput}
          buttonContent={buttonContentRight}
          allAvailableCoins={allAvailableCoins}
          contentLi={contentLiRight}
          Input={rigthInput}
          setLastActivInput={setLastActivInput}
          lastActiv={"left"}
        />
      </div>
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
        {showError ? (
          <div className={style.ExchangePageError}>
            <span>{error}</span>
          </div>
        ) : (
          <div className={style.ExchangePageError} />
        )}
        {showError && !error ? (
          <div className={style.ExchangePageErrorMin}>
            Enter amounts above<span>{minAmout}</span>
          </div>
        ) : (
          <div className={style.ExchangePageError} />
        )}
      </div>
    </div>
  );
}

export default ExchangePage;

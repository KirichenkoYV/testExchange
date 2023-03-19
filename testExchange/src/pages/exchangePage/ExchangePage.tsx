import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store/Store";
import {
  getAvailableCoins,
  getExchangeData,
  getPairTicketCoins,
} from "../../slice/coinsSlice";
import { useSelector } from "react-redux";

import style from "./ExchangePage.module.scss";
import LeftInput from "./components/LeftInput/LeftInput";
import RigthInput from "./components/RigthInput/RigthInput";

function ExchangePage() {
  const dispatch = useAppDispatch();

  let resExchange = useSelector((state: RootState) => state.coin.resExchange);
  const allAvailableCoins = useSelector(
    (state: RootState) => state.coin.availableCoins
  );

  const [contentLiLeft, setContentLiLeft] = useState("btc");
  const [leftInput, setLeftInput] = useState<string>("0.01" || resExchange);
  const [buttonContentLeft, setButtonContentLeft] = useState({
    ticker: "btc",
    image: "https://content-api.changenow.io/uploads/btc_d8db07f87d.svg",
  });
  const [lastActivInput, setLastActivInput] = useState("left");

  const [buttonContentRight, setButtonContentRight] = useState({
    ticker: "eth",
    image: "https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg",
  });
  const [contentLiRight, setContentLiRight] = useState("eth");
  const [rigthInput, setRightInput] = useState<string | undefined>(resExchange);
  console.log(resExchange);

  const [addressEth, setAdressEth] = useState<string>("");

  useEffect(() => {
    if (lastActivInput === "left") {
      dispatch(getAvailableCoins());
      const pairCoins = `${contentLiRight}_${contentLiLeft}`;
      dispatch(getPairTicketCoins(pairCoins));
      const exchangeData = {
        firstCoin: contentLiRight,
        secondCoin: contentLiLeft,
        exchangeAmout: rigthInput,
      };
      dispatch(getExchangeData(exchangeData));
      setLeftInput(resExchange);
      console.log(rigthInput, "rigthInput");
    }
  }, [contentLiRight, contentLiLeft, rigthInput, resExchange]);

  useEffect(() => {
    if (lastActivInput === "rigth") {
      dispatch(getAvailableCoins());
      const pairCoins = `${contentLiLeft}_${contentLiRight}`;
      dispatch(getPairTicketCoins(pairCoins));
      const exchangeData = {
        firstCoin: contentLiLeft,
        secondCoin: contentLiRight,
        exchangeAmout: leftInput,
      };
      console.log(exchangeData);
      dispatch(getExchangeData(exchangeData));
      setRightInput(resExchange);
    }
  }, [contentLiRight, contentLiLeft, leftInput, resExchange]);

  function changeAdressEth(event: React.ChangeEvent<HTMLInputElement>): void {
    setAdressEth(event?.target.value);
  }

  return (
    <div className={style.ExchangePage}>
      <div className={style.ExchangePageTitle}> Crypto Exchange</div>
      <div className={style.ExchangePageMotto}>Exchange fast and easy</div>
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
          resExchange={resExchange}
          buttonContentRight={buttonContentRight}
          allAvailableCoins={allAvailableCoins}
          contentLiRight={contentLiRight}
          rigthInput={rigthInput}
          setLastActivInput={setLastActivInput}
        />
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

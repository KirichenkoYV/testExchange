import React, { useState } from "react";

import style from "ExchangePage.module.scss";

function ExchangePage() {

    
  const [addressEth, setAdressEth] = useState<string>("");

  function changeAdressEth(event: React.ChangeEvent<HTMLInputElement>): void {
    setAdressEth(event?.target.value);
  }

  return (
    <div>
      Crypto Exchange
      <div>Exchange fast and easy</div>
      <input></input>
      <input></input>
      <div>Your Ethereum address</div>
      <input value={addressEth} onChange={changeAdressEth}></input>
      <button>Exchange</button>
    </div>
  );
}

export default ExchangePage;

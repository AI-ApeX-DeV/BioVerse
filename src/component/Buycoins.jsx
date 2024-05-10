import React from "react";
import { useState } from "react";

const Buycoins = () => {
  const [countBuyCoin, setCountBuyCoin] = useState(0);

  const handleIncrement = () => {
    setCountBuyCoin((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (countBuyCoin > 0) {
      setCountBuyCoin((prevCount) => prevCount - 1);
    }
  };
  return (
    <div className="relative w-full h-[229px] text-left text-sm text-black font-inter">
      <div className="absolute top-[0px] left-[0px] rounded-2xl [background:linear-gradient(180.13deg,_#202020,_#181818)] box-border w-[271px] h-[229px] overflow-hidden border-t-[2px] border-solid border-gray border-r-[1px] border-l-[1px]">
        <img
          className="absolute top-[13px] left-[50px] w-[128.45px] h-[135.89px] object-cover"
          alt=""
          src="   https://cdn.discordapp.com/attachments/1184864067295395960/1185642599332192307/image.png?ex=65905ab7&is=657de5b7&hm=71c7d9bab26434a937493f7b7ebc1d5622601814306a96ae565828467e900eb7&"
        />
        <img
          className="absolute top-[10px] left-[60px] w-[174.96px] h-[178.22px] object-cover"
          alt=""
          src="https://cdn.discordapp.com/attachments/1184864067295395960/1185641928847527936/image.png?ex=65905a17&is=657de517&hm=652d84dd8d1a39a6d6ea2850e469a17fb054c4a708f566aab57bc6428afdcb0e&"
        />
        <div className="absolute top-[174px] left-[147px] rounded-md [background:linear-gradient(106.75deg,_#fdd835,_#fff_49.15%,_#ffd000)] box-border w-[103px] h-[41px] overflow-hidden border-t-[1px] border-solid border-cornsilk border-r-[1px] border-l-[1px]">
          <div className="absolute top-[12px] left-[18px] font-medium">
            Buy Coins
          </div>
        </div>

        <div className="absolute top-[174px] left-[24px] rounded-md bg-white box-border w-[103px] h-[41px] overflow-hidden border-t-[1px] border-solid border-gainsboro border-r-[1px] border-l-[1px]">
          <div className="absolute top-[12px] left-[45px] font-semibold">
            {countBuyCoin}
          </div>
          <img
            className="absolute top-[11px] left-[70px] w-[19px] h-[19px] overflow-hidden object-cover"
            alt=""
            src="https://i.imgur.com/nH921xD.png"
            onClick={handleIncrement}
          />
          <img
            className="absolute top-[12px] left-[10px] w-[19px] h-[18px] overflow-hidden object-cover"
            alt=""
            src="   https://cdn.discordapp.com/attachments/1184864067295395960/1185645933438971944/image.png?ex=65905dd2&is=657de8d2&hm=d19e79ee3cb4775a71d1934bddd314bf468c9fecc807534b9f4ceb23e3f66790&"
            onClick={handleDecrement}
          />
        </div>
      </div>
    </div>
  );
};

export default Buycoins;

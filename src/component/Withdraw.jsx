import React from "react";
import { useState } from "react";

const Withdraw = () => {
  const [countWithdraw, setCountWithdraw] = useState(10);

  const handleIncrementWithdraw = () => {
    setCountWithdraw((prevCount) => prevCount + 1);
  };

  const handleDecrementWithdraw = () => {
    if (countWithdraw > 10) {
      setCountWithdraw((prevCount) => prevCount - 1);
    }
  };



  
  return (

//     <div className="relative w-full h-[539px]">
//     <div className="absolute top-[0px] left-[0px] rounded-[10px] bg-white w-[339px] h-[539px] overflow-hidden" />
//   </div>


    <div className="relative w-full h-[539px] bg-white text-left text-base text-black font-inter">
      <div className="absolute top-[0px] left-[0px] w-[339px] h-[539px]">
        <div className="absolute top-[0px] left-[0px] rounded-3xs bg-white w-[339px] h-[539px] overflow-hidden">
          <div className="absolute top-[0px] left-[0px] rounded-3xs [background:linear-gradient(179.93deg,_#ffb600,_rgba(255,_211,_102,_0))] w-[339px] h-[539px] overflow-hidden">
            <div className="absolute top-[8px] left-[95px] text-lg font-semibold text-white">
              Withdraw Money
            </div>
            <div className="absolute top-[197px] left-[90px] font-semibold">
              Ordinary Withdrawal
            </div>
            <div className="absolute top-[300px] left-[65px] text-[11px] text-darkgray-200">
              Enter the amount you want to withdraw
            </div>
            <div className="absolute top-[341px] left-[108px] font-semibold">
              Withdraw Mode
            </div>
            <div className="absolute top-[392px] left-[20px] flex flex-col items-center justify-start gap-[31px] text-[14px] text-royalblue">
              <div className="shrink-0 flex flex-row items-start justify-start gap-[23px]">
                <div className="relative rounded-6xs bg-cornflowerblue-200 box-border w-[138px] h-[47px] overflow-hidden shrink-0 border-[1px] border-solid border-cornflowerblue">
                  <img
                    className="absolute top-[7px] left-[3px] w-11 h-[33px] object-cover"
                    alt=""
                    src="  https://cdn.discordapp.com/attachments/1184864067295395960/1185665701252448407/image.png?ex=6590703b&is=657dfb3b&hm=42fd12de2795c438f9204e06092abbf23b7f8ad07dbb1407ca515bbe023a1a33&"
                  />
                  <div className="absolute top-[15px] left-[43px] font-medium">
                    ETH Testnet
                  </div>
                </div>
                <div className="relative rounded-6xs bg-darkgray-300 box-border w-[138px] h-[47px] overflow-hidden shrink-0 border-[1px] border-solid border-lightgray">
                  <img
                    className="absolute top-[1px] left-[39px] w-[60px] h-[45px] object-cover"
                    alt=""
                    src=" https://cdn.discordapp.com/attachments/1184864067295395960/1185665751508602950/image.png?ex=65907047&is=657dfb47&hm=062c58ec15535c2c1468f404a507437eb6fc7c548f65753500662f03fd51da47&"
                  />
                </div>
              </div>
              <div className="relative rounded-6xs [background:linear-gradient(93.84deg,_#ffb602,_rgba(255,_182,_2,_0))] box-border w-[293px] h-[45px] overflow-hidden shrink-0 text-lg text-white border-t-[1px] border-solid border-peachpuff">
                <div className="absolute top-[12px] left-[72px] font-semibold">
                  Withdraw Money
                </div>
              </div>
            </div>
            <div className="absolute top-[44px] left-[20px] rounded-3xs bg-white w-[299px] h-[119px] overflow-hidden text-silver">
              <div className="absolute top-[16px] left-[107px] font-medium">
                Total Coins
              </div>
              <div className="absolute top-[69px] left-[129px] font-medium text-darkgray-100">
                =0.5
              </div>
              <div className="absolute top-[39px] left-[131px] text-[25px] font-medium text-black">
                50
              </div>
              <img
                className="absolute top-[39px] left-[163px] w-[29px] h-[30px] object-cover"
                alt=""
                src=" https://cdn.discordapp.com/attachments/1184864067295395960/1185665494058012752/image.png?ex=6590700a&is=657dfb0a&hm=39a0cdc425b686099d1aac2ea822a55ab3a8671f35ece3b9192a4f48484afd58&"
              />
              <img
                className="absolute top-[70px] left-[164px] w-[23px] h-[17px] object-cover"
                alt=""
                src="  https://cdn.discordapp.com/attachments/1184864067295395960/1185665526022815894/image.png?ex=65907012&is=657dfb12&hm=80e42a75b6e2845d6bd9eb8ed9e19af3c12939dd164512ad56e073d56372ae03&"
              />
            </div>
          
            <div className="absolute top-[248px] left-[101px] rounded-6xs bg-darkgray-300 box-border w-[138px] h-[47px] overflow-hidden text-lg border-[1px] border-solid border-lightgray">
              <img
                className="absolute top-[13px] left-[98px] w-[21px] h-[21px] overflow-hidden object-cover"
                alt=""
                src="https://i.imgur.com/nH921xD.png"
                onClick={handleIncrementWithdraw}
              />
              <img
                className="absolute top-[13px] left-[18px] w-[21px] h-5 overflow-hidden object-cover"
                alt=""
                src="https://i.imgur.com/VC3xDiw.png"
                onClick={handleDecrementWithdraw}
              />
              <img
                className="absolute top-[58.5px] left-[81px] w-3.5 h-[13px] object-cover"
                alt=""
                src="https://i.imgur.com/VC3xDiw.png"
              />
              <div className="absolute top-[12px] left-[58px] font-medium">
                {countWithdraw}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;

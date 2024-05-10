import React from "react";

const P2Pcard = () => {
  return (
    <div
      className="w-[291px]  gap-3 relative rounded-2xl [background:linear-gradient(180.13deg,_#202020,_#181818)] box-border h-max- overflow-hidden text-left text-[0.5rem] text-white font-inter border-t-[2px] border-solid border-[#282828] border-r-[1px] border-l-[1px] flex flex-col p-4
    "
    >
      <div className="flex gap-2">
        <div>
          <img
            className="w-9 object-cover"
            src="https://i.imgur.com/u387Zel.png"
            alt=""
          />
        </div>

        <div className="flex flex-col">
          <b className="w-[5.313rem] relative text-[1rem] inline-block font-inter text-white text-left">
            Amit Sinha
          </b>
          <div className="w-[5.625rem] relative text-[0.75rem] font-inter text-[#757575] text-left inline-block">
            @amitsinha.dso
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-0 items-center">
            <div className="w-[40px] relative rounded-sm [background:linear-gradient(179.57deg,_#5d5d5d)] h-[0.875rem] overflow-hidden text-left text-[0.5rem] text-white font-inter">
              <div className="absolute top-[18.466rem] left-[28.563rem] w-[5.916rem] h-[7.065rem] [transform:_rotate(-10.01deg)] [transform-origin:0_0]" />
              <div className="absolute top-[0.125rem] left-[1rem] font-medium">
                USD
              </div>
              <img
                className="absolute top-[0.125rem] left-[0.313rem] rounded-[72px] w-[0.625rem] h-[0.625rem] object-cover"
                alt=""
                src="https://i.imgur.com/7Cp0Dgd.png"
              />
            </div>

            <div className="relative bottom-0">
              <img
                className="w-[6px] object-cover"
                src="https://i.imgur.com/67n3ln4.png"
                alt=""
              />
            </div>

            <div className="w-[40px] relative rounded-sm [background:linear-gradient(179.57deg,_#5d5d5d)] h-[0.875rem] overflow-hidden text-left text-[0.5rem] text-white font-inter">
              <div className="absolute top-[18.466rem] left-[28.563rem] w-[5.916rem] h-[7.065rem] [transform:_rotate(-10.01deg)] [transform-origin:0_0]" />
              <div className="absolute top-[0.125rem] left-[1rem] font-medium">
                INR
              </div>
              <img
                className="absolute top-[0.125rem] left-[0.313rem] rounded-[72px] w-[0.625rem] h-[0.625rem] object-cover"
                alt=""
                src="https://i.imgur.com/kOgkMVN.png"
              />
            </div>
          </div>
          <div className="w-[5.438rem] relative text-[0.563rem] font-medium font-inter text-white text-left inline-block">
            Payable Fees - 0.5%
          </div>
        </div>
      </div>
      <div className="w-[78px] mb-6 flex items-center justify-center relative rounded-[35px] [background:linear-gradient(176.52deg,_#ffd000,_#181818)] h-[0.938rem] overflow-hidden text-left text-[0.5rem] text-white font-inter">
        <div className=" font-medium">Profile Score - 20</div>
      </div>
      <div className="flex gap-[7px] items-center">
        <div className="w-[67px] flex items-center justify-center relative rounded-[3px] bg-white [background:linear-gradient(179.57deg,_#fff)] h-[1.563rem] overflow-hidden text-left text-[0.625rem] text-black font-inter">
          <div className=" font-medium">Exchange</div>
        </div>

        <div className="w-[67px] flex items-center justify-center relative rounded-[3px] bg-[#006DFF] [background:linear-gradient(179.57deg,_#006dff)] h-[1.563rem] overflow-hidden text-left text-[0.625rem] text-white font-inter">
          <div className=" font-medium">Chat</div>
        </div>
      </div>
    </div>
  );
};

export default P2Pcard;

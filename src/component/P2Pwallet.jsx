import React from 'react'

const P2Pwallet = (props) => {
  return (
    <div className=' p-5 flex flex-col w-[265px] rounded-2xl [background:linear-gradient(180.13deg,_#202020,_#181818)] box-border h-[13.688rem] overflow-hidden text-left text-[0.875rem] text-white font-inter border-t-[2px] border-solid border-[#282828] border-r-[1px] border-l-[1px]'>
      <div className="flex mb-7 items-center ">
      <b className="w-2/3 relative text-[1rem] inline-block font-inter text-white text-right">Your Wallet</b>
      <img onClick={props.close}  className='w-[14.2px] cursor-pointer mx-auto pl-8 object-cover relative' src="https://i.imgur.com/9UTCyDM.png" alt="" />
      </div>
      <div className="flex flex-col gap-4">
      <div className="w-[159px] mx-auto relative rounded-sm bg-[#494949] [background:linear-gradient(179.57deg,_#494949)] h-[1.313rem] overflow-hidden text-left text-[0.875rem] text-white font-inter">
<div className="absolute top-[18.466rem] left-[28.563rem] w-[5.916rem] h-[7.065rem] [transform:_rotate(-10.01deg)] [transform-origin:0_0]" />
<img className="absolute top-[0.188rem] left-[0.5rem] w-[0.938rem] h-[0.938rem] overflow-hidden" alt="" src="https://i.imgur.com/kOgkMVN.png" />
<div className="absolute top-[0.125rem] left-[1.625rem] font-medium">INR</div>
<div className="absolute top-[0.25rem] left-[6.188rem] text-[0.75rem] font-medium">10 INR</div>
</div>

<div className="w-[159px] mx-auto relative rounded-sm bg-[#494949] [background:linear-gradient(179.57deg,_#494949)] h-[1.313rem] overflow-hidden text-left text-[0.875rem] text-white font-inter">
<div className="absolute top-[18.466rem] left-[28.563rem] w-[5.916rem] h-[7.065rem] [transform:_rotate(-10.01deg)] [transform-origin:0_0]" />
<img className="absolute top-[0.188rem] left-[0.5rem] w-[0.938rem] h-[0.938rem] overflow-hidden" alt="" src="https://i.imgur.com/7Cp0Dgd.png" />
<div className="absolute top-[0.125rem] left-[1.625rem] font-medium">USD</div>
<div className="absolute top-[0.25rem] left-[6.188rem] text-[0.75rem] font-medium">10 USD</div>
</div>

<div className="w-[159px] mx-auto relative rounded-sm bg-[#494949] [background:linear-gradient(179.57deg,_#494949)] h-[1.313rem] overflow-hidden text-left text-[0.875rem] text-white font-inter">
<div className="absolute top-[18.466rem] left-[28.563rem] w-[5.916rem] h-[7.065rem] [transform:_rotate(-10.01deg)] [transform-origin:0_0]" />
<img className="absolute top-[0.188rem] left-[0.5rem] w-[0.938rem] h-[0.938rem] overflow-hidden" alt="" src="https://i.imgur.com/ndrYDvs.png" />
<div className="absolute top-[0.125rem] left-[1.625rem] font-medium">AUD</div>
<div className="absolute top-[0.25rem] left-[6.188rem] text-[0.75rem] font-medium">10 AUD</div>
</div>

<div className="w-[159px] mx-auto relative rounded-sm bg-[#494949] [background:linear-gradient(179.57deg,_#494949)] h-[1.313rem] overflow-hidden text-left text-[0.875rem] text-white font-inter">
<div className="absolute top-[18.466rem] left-[28.563rem] w-[5.916rem] h-[7.065rem] [transform:_rotate(-10.01deg)] [transform-origin:0_0]" />
<img className="absolute top-[0.188rem] left-[0.5rem] w-[0.938rem] h-[0.938rem] overflow-hidden" alt="" src="https://i.imgur.com/29eoqyi.png" />
<div className="absolute top-[0.125rem] left-[1.625rem] font-medium">EUR</div>
<div className="absolute top-[0.25rem] left-[6.188rem] text-[0.75rem] font-medium">10 EUR</div>
</div>
      </div>
    </div>
  )
}

export default P2Pwallet

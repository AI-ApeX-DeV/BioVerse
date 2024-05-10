/* eslint-disable react/prop-types */
import React from "react";
const RepeatCompo2 = (props) => {
  // eslint-disable-next-line react/prop-types


  
  console.log(props);
  const timestamp = props.timestamp; // Replace this with your timestamp
  const timestampInMilliseconds = timestamp * 1000;

  // Create a new Date object with the timestamp in milliseconds
  const date = new Date(timestampInMilliseconds);

  // Get hours and minutes from the Date object
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format hours and minutes (add leading zeros if necessary)
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  console.log("hours", formattedHours);

  return (
    <div>
      <a href={`https://etherscan.io/tx/${props.hash}`} target='_blank'>
      <div className="w-full flex items-center justify-center relative bg-gray h-[2.313rem]  text-left text-[0.75rem] text-white font-ibm-plex-mono">
        <img
          className="absolute top-[0.5rem] left-[0.75rem] w-[1.313rem] h-[1.313rem] object-cover"
          alt=""
          src="https://i.imgur.com/QinPqJY.png"
        />
        <div className="absolute top-[0.75rem] left-[3.188rem] text-royalblue">
          {formattedHours}:{formattedMinutes}
        </div>
        <div className="absolute top-[0.75rem] left-[7.438rem]">
        {props.to && `${props.to.slice(0, 6)}...${props.to.slice(-4)}`}
        </div>
        <div className="absolute top-[0.75rem] left-[16.063rem]">
        {props.from && `${props.from.slice(0, 6)}...${props.from.slice(-4)}`}
        </div>
        <div className="absolute w-[1.37rem] overflow-hidden top-[0.75rem] left-[24.438rem]">{Number((props.value / 1e-18).toFixed(2))}</div>
        <div className="absolute top-[0.75rem] left-[30.375rem]">0.21</div>
        <img
          className="absolute top-[0.563rem] left-[27.438rem] rounded-[32px] w-[1.313rem] h-[1.313rem] object-cover"
          alt=""
          src='https://i.imgur.com/7Cp0Dgd.png'
        />
      </div></a>
    </div>
  );
};

export default RepeatCompo2;
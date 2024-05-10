import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import "./css/Card.css";
import "./css/Card.css"
import Progress_bar from "./Progress_bar";
import { Context } from "../context/ContextProvider";
// import { CrowdfundingContext } from "../context/CrowdfundingContext";

function Card(props) {
  const navigate = useNavigate()
  const { timeRemaining,noOfContributors } = useContext(Context);
  const percent =((30-timeRemaining)/30)*100;

  function handleClick() {
    // const queryString = `?index=${props.index}`;
    navigate(`/card/${props.index}`);
  }
 

  return (
    <div onClick={handleClick}  className="card" id="cardd">
      <img src={props.img} />
  

      <p className="desc">{props.description} </p>

      <div className="megaCategoryDiv">
        <div className="categoryDiv">
          <p>{props.type}</p>
        </div>
      </div>

      <div className="userDiv">
        <img
          src="https://cdn.discordapp.com/attachments/1096324843877703713/1148936170470908035/image.png"
          alt="user"
        />
        <p className="user">Posted by {props.user}</p>
      </div>

      <div className="preFund">
        <div className="fund">
          <p>{props.fundReq}</p>

          <div className="ethh">
            <img
              src="https://cdn.discordapp.com/attachments/1096324843877703713/1148948740338634792/image.png"
              alt="ETH"
            />
            <p>ETH</p>
          </div>
        </div>
      </div>

      <div className="megaProgress">
        <div className="progress">
          <Progress_bar bgcolor="#16BDCA" progress={percent} height={30} />
          
        </div>

        <p>{timeRemaining} days</p>
      </div>

      <div className="vote">
        <p>{props.votes}/{noOfContributors} votes</p>
      </div>
    </div>
  );
}

export default Card;

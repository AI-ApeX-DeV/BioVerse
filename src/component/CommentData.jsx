import { Context } from "../context/ContextProvider";
import React, { useState, useContext, useEffect } from "react";

const CommentData =  (props) => {
    const {checkIfWalletIsConnected,ConnectWallet, currentAccount, isNewUser ,createUser,createPost,likePost,getUserData,userPost,getUserComment} =
    useContext(Context);
    
    // const [userData, setUserData] = useState(null);

    const [dates,setDates]=useState('');
    const [time,setTime]=useState('');
    console.log('inside object map', props.comment);
    useEffect(() => {

        const date = new Date(props.comment[3] * 1000); // Convert to milliseconds
        const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with zero if needed
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (+1 as it's zero-indexed) and pad with zero if needed
        const year = date.getFullYear().toString().slice(-2); // Get year and extract last 2 digits
        
        const formattedDate = `${day}/${month}/${year}`; 
    const hours = date.getHours().toString().padStart(2, '0'); // Get hours and pad with zero if needed
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with zero if needed
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Get seconds and pad with zero if needed
    
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    setDates(formattedDate);
    setTime(formattedTime);
        // const fetchData = async () => {
        //     const ll = await getUserData(currentAccount);
        //     setUserData(ll);
        //     console.log('ll', ll);
        // };

        // fetchData();

    }, [props.comment]);
    
    return (
      <div className="text-white  mb-[1rem] bg-slate-500 p-4" > 
    
      <div className="flex  flex-col">
        <div className="flex gap-4">
          <img className="h-[2rem] w-auto rounded-full" src={props.comment[1]} alt="" />
          <div> {props.comment[0]}</div>
          </div>
          <div
          className="p-4 my-auto">{props.comment[2]}</div>
          <div className="text-[0.7rem] text-black">{dates} {time}</div>
      </div>
      </div>
    )
    
 
}

export default CommentData;

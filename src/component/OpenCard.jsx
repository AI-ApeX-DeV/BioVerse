import PostCard from "./PostCard";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import "reactjs-popup/dist/index.css";
import PostComponent from "./PostComponent";
import ProfilePost from "./ProfilePost";
import Withdraw from "./Withdraw";
import Alert from "@mui/material/Alert";
import Card from "./CR_card";
import "./css/Card.css"
import Progress_bar from "./Progress_bar";
import { useParams } from "react-router-dom";
import "./css/OpenCard.css";



const OpenCard = () => {
  const navigate = useNavigate();
  const [commentOpen, setCommentOpen] = useState(false);
  const [userBal, setUserBal] = useState(0);
  const [likess, setLikess] = useState(477);
  const [isRegister, setIsRegister] = useState(1);
  const [regUsername, setRegUsername] = useState("");
  const [num, setNum] = useState(0);
  const [allUserPublicPost, setAllUserPublicPost] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const [allPrivatePost, setAllPrivatePost] = useState([]);
  const [userPrivatePost, setUserPrivatePost] = useState([]);
  const [userData, setUserData] = useState([]);
  const [count, setCount] = useState(10);
  const [isWithdrawCoinModal, setIsWithdrawCoinModal] = useState(false);
  const [countWithdraw, setCountWithdraw] = useState(10);
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const [successAlertContent, setSuccessAlertContent] = useState("");
  const [isAlertInfo, setIsAlertInfo] = useState(false);
  const [spin, setSpin] = useState(false);
  const [rewardLikes, setRewardLikes] = useState(0);
  const [rewardComments, setRewardComments] = useState(0);
  //   const {getManager,manager} = useContext(Context);
  const { index } = useParams();

  const [image1, setImage1] = useState({
    main:
      "https://i.imgur.com/2ksquEu.png",
    alternate:
      "https://cdn.discordapp.com/attachments/1184864067295395960/1185693981800149102/image.png?ex=65908a92&is=657e1592&hm=6932cde68b59daabb1f360bbad1d341547b721343003999b85bb19d5ac546ff8&",
  });
  const [image2, setImage2] = useState({
    main:
      "https://i.imgur.com/2ksquEu.png",
    alternate:
      "https://cdn.discordapp.com/attachments/1184864067295395960/1185693981800149102/image.png?ex=65908a92&is=657e1592&hm=6932cde68b59daabb1f360bbad1d341547b721343003999b85bb19d5ac546ff8&",
  });
  const [image3, setImage3] = useState({
    main:
      "https://i.imgur.com/2ksquEu.png",
    alternate:
      "https://cdn.discordapp.com/attachments/1184864067295395960/1185693981800149102/image.png?ex=65908a92&is=657e1592&hm=6932cde68b59daabb1f360bbad1d341547b721343003999b85bb19d5ac546ff8&",
  });
  const [image4, setImage4] = useState({
    main:
      "https://i.imgur.com/2ksquEu.png",
    alternate:
      "https://cdn.discordapp.com/attachments/1184864067295395960/1185693981800149102/image.png?ex=65908a92&is=657e1592&hm=6932cde68b59daabb1f360bbad1d341547b721343003999b85bb19d5ac546ff8&",
  });

  const handleIncrementWithdraw = () => {
    setCountWithdraw((prevCount) => prevCount + 1);
  };
  const showSuccessPopup = (successMessage) => {
    console.log("ShowSuccess", successMessage);
    setSuccessAlertContent(successMessage);
    setIsAlertSuccess(true);
    setTimeout(() => {
      setIsAlertSuccess(false);
    }, 5000);
  };

  const handleDecrementWithdraw = () => {
    if (countWithdraw > 10) {
      setCountWithdraw((prevCount) => prevCount - 1);
    }
  };

  console.log("num", num, "type", typeof num);
  function handleUsername(e) {
    console.log("handleusername", e.target.value);
    setRegUsername(e.target.value);
  }

  const [imageUrl, setImageUrl] = useState(
    "https://i.imgur.com/2ksquEu.png"
  );

  const handleClick = () => {
    // Change the image URL to the new image source when the button is clicked
    setImageUrl(
      "https://cdn.discordapp.com/attachments/1184864067295395960/1185693981800149102/image.png?ex=65908a92&is=657e1592&hm=6932cde68b59daabb1f360bbad1d341547b721343003999b85bb19d5ac546ff8&"
    ); // Replace with your desired new image source URL
  };

  const imgLinks = [
    "https://cdn.discordapp.com/attachments/1148598201314725913/1164977604483371068/image.png?ex=65452cf1&is=6532b7f1&hm=89fd657197685f46d1a5b5f8e88e9a0ed71f85854024cba35069197b1a10e1a7&",
    "https://cdn.discordapp.com/attachments/1148598201314725913/1164977580626153592/image.png?ex=65452ceb&is=6532b7eb&hm=711bb8f7cf53910f9ddf7eb6c079fc1f6d02046545a025cea182e49b53347a97&",
    "https://cdn.discordapp.com/attachments/1148598201314725913/1164977560195702884/image.png?ex=65452ce6&is=6532b7e6&hm=71ac448a37bb1692b9550d5f2037f118bf7b2804d384de88583866d4828a7fcb&",
    "https://cdn.discordapp.com/attachments/1148598201314725913/1164977456139223040/image.png?ex=65452ccd&is=6532b7cd&hm=630f816d2cd6a0a323af298284eb3a1896e0e4e93ecb91b1e632c547603b4170&",
    "https://cdn.discordapp.com/attachments/1148598201314725913/1164977453094162442/image.png?ex=65452ccd&is=6532b7cd&hm=5e5bb5f5c37ebcedf3339a9a162112e29c54f79942748654aa43ca375b5ec269&",
    "https://cdn.discordapp.com/attachments/1148598201314725913/1164977098146975744/image.png?ex=65452c78&is=6532b778&hm=74ca2b0fcb94ef05c6e65fc5e7f56e31a1b513d70f717e260c318b6e55be914e&",
  ];
  const {
    checkIfWalletIsConnected,
    ConnectWallet,
    currentAccount,
    createUser,
    createPost,
    likePost,
    numRequests,
    makePayment,
    noOfContributors,
    manager,
    getUserData,
    userPost,
    getAllPost,
    refresh,
    requests,
    getUserPost,
    getAllPrivatePost,
    getUserPrivatePost,
    getNumRequests,
    getRequests,
    vote,
    timeRemaining,
    // withdrawCoins,
    getRewardStatus,
  } = useContext(Context);
  async function voteNow() {
    await vote(index,showSuccessPopup,showErrorPopup);
  }

  var data;
  const percent = ((30 - timeRemaining) / 30) * 100;
//   let nextData;
  if (!requests || isNaN(Number(index))) {
    const call = async () => {
      await getRequests();
    };
    call();
  }
  // Voters(index, currentAccount);
  let cachedContractData,dummyData ;
  
 
  try {
    // console.log("Index",index,"Requests",requests);
    if(!requests){
      cachedContractData = localStorage.getItem("request");
    console.log("cachedContractData",cachedContractData);
    if (cachedContractData) {
       dummyData = JSON.parse(cachedContractData);
       data = dummyData[Number(index)];
    //    nextData = dummyData[nextIndex];
    }
    }
    else{
    data = requests[Number(index)];
    // nextData = requests[nextIndex];
}
    // console.log("Data",data);
  } catch (error) {
    console.log("Error", error);
  }

 

  const showErrorPopup = (errorMessage) => {
    const errorPopup = document.getElementById("error-popup");
    // errorPopup.querySelector("span").textContent = `Error! ${errorMessage}`;
    // errorPopup.classList.remove("hidden");
    console.log(errorPopup);
    setTimeout(() => {
    //   errorPopup.classList.add("hidden");
    }, 8000); 
  };

  const handleConnectWallet = async () => {
    await ConnectWallet();
  };
  useEffect(() => {
    if (currentAccount === "") {
     const run = async ()=>{await checkIfWalletIsConnected();
           }
           run();
                 console.log("currentAccount",currentAccount)


    }
    const run1 = async ()=>{
   await getNumRequests();
    await getRequests();
    }
    run1();
  }, [currentAccount]);
//   const nextIndex = (Number(index) + 1) % numRequests;

  useEffect(() => {
    const getBal = async () => {
      console.log("currentAccount useeffect", currentAccount);
      if (currentAccount) {
        const bal = await getUserData(currentAccount);
        const post = await getAllPost();
        const privatePost = await getAllPrivatePost();
        const userPrivate = await getUserPrivatePost(currentAccount);
        const _reward = await getRewardStatus(currentAccount);
        console.log("reward score", Number(_reward));

        const _tempLike = Math.floor(_reward / 1000);
        const _tempComment = _reward % 1000;

        console.log("reward score ceil", _tempLike, " comment", _tempComment);
        setRewardComments(_tempComment);
        setRewardLikes(_tempLike);

        //  const login =async ()=>{num= await isNewUser()} ;
        //  login();
        // let num= await isNewUser();
        setNum(Number(bal.user_id));
        setUserData(bal);

        setAllPost(post);
        setUserPrivatePost(userPrivate);
        console.log("user private post", userPrivate);
        console.log("post in useffect: ", post);
        console.log("private post", privatePost);
        setAllPrivatePost(privatePost);

        console.log("numm", num, "type", typeof num);
        const publicUserPost = await getUserPost(currentAccount);
        console.log("public user post", publicUserPost);
        setAllUserPublicPost(publicUserPost);

        if (!num) {
          //  const create = async()=>{
          //    await createUser('tt',1);
          //  }
          //  create();

          setIsRegister(0);

          // navigate("/register");
        }
        console.log("bal", Number(bal.token));
        setUserBal(Number(bal.token));
        userPost();
      }
    };
    getBal();
  }, [currentAccount, refresh, num]);
  return (
    <div className="bg-black   ">
      <div className="flex ">
        {/* alert success */}
        <div
          className={`absolute z-20 ml-[34rem] mt-10 ${
            isAlertSuccess ? "flex" : "hidden"
          }`}
        >
          <Alert severity="success">{successAlertContent}</Alert>
        </div>
        {/* alert success end */}
        {/* alert info */}
        <div
          className={`absolute z-20 ml-[34rem] mt-10 ${
            isAlertInfo ? "flex" : "hidden"
          }`}
        >
          <Alert severity="info">Waiting for Metamask...</Alert>
        </div>
        {/* alert info end */}
        {/* spinner */}
        <div
          className={` absolute   items-center justify-center h-full w-full  z-50  ${
            spin ? "flex" : "hidden"
          }`}
        >
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        {/* spinner end */}
        {/* register modal */}
        <div
          // style={containerStyle}
          className={`bg-white absolute left-[37rem] top-[10rem] mx-auto z-10 flex flex-col items-center justify-center min-h-[50vh] ${
            isRegister === 0 && num === 0 && currentAccount !== ""
              ? "block"
              : "hidden"
          }`}
        >
          <div className="bg-white p-5 rounded-2xl max-w-md text-center">
            <div className="text-black text-lg font-semibold max-w-[434px] mb-4">
              Share your details and avail 50 Socoins for free
            </div>
            <div className="bg-violet-200 w-[283px] h-[38px] mx-auto mb-4 rounded-xl relative overflow-hidden">
              <input
                type="text"
                className="w-full h-full p-2 text-black font-bold bg-transparent outline-none"
                placeholder="Username"
                onChange={handleUsername}
              />
            </div>
            <div className="bg-violet-200 w-[283px] h-[38px] mx-auto mb-4 rounded-xl relative overflow-hidden">
              <input
                type="email"
                className="w-full h-full p-2 text-black font-bold bg-transparent outline-none"
                placeholder="Email"
              />
            </div>
            <div className="bg-violet-200 w-[283px] h-[38px] mx-auto mb-4 rounded-xl relative overflow-hidden">
              <input
                type="tel"
                className="w-full h-full p-2 text-black font-bold bg-transparent outline-none"
                placeholder="Phone Number"
              />
            </div>
            <div className="bg-violet-200 w-[283px] h-[38px] mx-auto mb-4 rounded-xl relative overflow-hidden">
              <input
                type="number"
                className="w-full h-full p-2 text-black font-bold bg-transparent outline-none"
                placeholder="Age"
              />
            </div>
            <button className="border border-[color:var(--gray-600,#4B5563)] bg-white w-[127px] self-center px-5 py-2.5 rounded-3xl">
              <div
                // onClick={() => {
                //   createUser(regUsername);
                //   console.log(regUsername);
                //   setIsRegister(1);
                // }}
                className="text-black text-sm font-medium self-center"
              >
                Continue
              </div>
            </button>
          </div>
        </div>
        {/* register modal end */}

        {/* options */}
        <div className="flex flex-col min-w-[20.25rem] min-h-max h-full bg-black items-center justify-around border-r-[1px] border-solid border-gray-700 box-border">
          <div className="flex ">
            <img
              className="relative bottom-[3rem] w-full h-[9.25rem] object-cover"
              src="https://i.imgur.com/6YjIbLD.png"
              alt=""
            />
          </div>

          <div className="relative bottom-[5rem] w-full flex  items-start justify-center  ">
            <div className="flex flex-col gap-[2.25rem] text-left text-[1.25rem] text-white font-inter">
              <div className="flex flex-row items-center justify-start gap-[0.63rem]">
                <img
                  className="relative bottom-[0.2rem] w-[1.31rem] h-[1.31rem] overflow-hidden shrink-0"
                  alt=""
                  src="https://i.imgur.com/rt4TPme.jpeg"
                />
                <div className="relative font-medium ">Home</div>
              </div>
              <div className="flex flex-row items-center justify-start gap-[0.63rem]">
                <img
                  className="relative w-[1rem] h-[1.19rem]"
                  alt=""
                  src="https://cdn.discordapp.com/attachments/1177493315898314792/1184069785865171014/image.png?ex=658aa1eb&is=65782ceb&hm=dadb492ce11b1f2b9b06b98152270e097702aaa581d1de59d339ebcdba8924fa&"
                />
                <div className="relative font-medium">Notifications</div>
              </div>
              <div className="flex flex-row items-center justify-start gap-[0.63rem]">
                <img
                  className="relative w-[1.06rem] h-[1rem]"
                  alt=""
                  src="https://i.imgur.com/6XKA7yr.png"
                />
                <div className="relative font-medium">Messages</div>
              </div>
              <div className="flex flex-row items-start justify-start gap-[0.63rem]">
                <img
                  className="relative w-[1.25rem] h-[1.19rem]"
                  alt=""
                  src="https://i.imgur.com/GZZIM0x.png"
                />
                <div className="relative font-medium">Communities</div>
              </div>
              {/* <div className="flex flex-row items-start justify-start gap-[0.63rem]">
<img className="relative w-[1.25rem] h-[1.25rem]" alt="" src="https://cdn.discordapp.com/attachments/1177493315898314792/1184069996142415983/image.png?ex=658aa21e&is=65782d1e&hm=0ce679d0e2e97dd09997ae88aa90f3cd824d6d5ab5263d9948b64fa0db0bd636&" />
<div className="relative font-medium">Profile</div>
</div> */}
            </div>

            <div></div>
          </div>

          <div className="relative rounded-[97px] bg-cornflowerblue box-border w-[13rem] h-[3.06rem] overflow-hidden text-left text-[1.25rem] text-white font-inter border-t-[1px] border-solid border-lightskyblue border-r-[1px] border-l-[1px]">
            <div className="absolute py-[0.81rem] px-[5.13rem] font-semibold">
              Post
            </div>
          </div>

          <div className="relative w-[12rem] h-[2.25rem] text-left text-[0.8rem] text-white font-inter">
            <b className="absolute top-[0rem] left-[2.56rem] h-max w-max">
              {" "}
              {userData.name}
            </b>
            <div className="absolute top-[1.31rem] left-[2.5rem] text-[0.75rem] text-colours-gray-500">
              @{userData.username}.dso
            </div>
            <div className="absolute top-[0rem] left-[0rem] rounded-[69px] bg-white w-[2.06rem] h-[2.06rem] overflow-hidden">
              <img
                className="absolute top-[0rem] left-[0rem] rounded-[30px] w-[2.25rem] h-[2.25rem] object-cover"
                alt=""
                src={userData.profile}
              />
            </div>
            <img
              className="absolute cursor-pointer top-[0rem] left-[11.75rem] w-[1.5rem] h-[1.5rem] overflow-hidden"
              alt=""
              src="https://i.imgur.com/UU8RPw0.png"
            />
          </div>
        </div>
        {/* options end */}

        {/* mid portion */}
        <div className="flex flex-col min-w-[48.138rem] w-full bg-black border-r-[1px] border-solid border-gray-700 box-border">
          {/* top section */}
          <div className="relative  flex w-full h-[81px] text-left text-[24px] text-white font-inter">
            <div className="flex px-4 pt-2 gap-[15px] h-full w-max items-center">
              <img
                className="w-[28px] object-cover"
                src="https://i.imgur.com/gJPjNCF.png"
                alt=""
              />
              <div className="w-[8.5rem] relative text-[1.25rem] font-medium font-inter text-white text-left inline-block">
                Crowdfunding
              </div>
            </div>
            {/* wallet */}
            <div className="flex pr-4 w-full justify-end h-[5.75rem] items-center">
              {/* <div className="relative rounded-md [background:linear-gradient(106.75deg,_#fdd835,_#fff_49.15%,_#ffd000)] box-border  h-[2.563rem] w-[8.438rem] overflow-hidden text-left text-[0.88rem] text-black font-inter border-t-[1px] border-solid border-cornsilk border-r-[1px] border-l-[1px]">
              <div className="absolute top-[0.75rem] left-[1.38rem] font-medium">
                {userBal | 0} coins
              </div>
              <img
                className="absolute top-[0.5rem] left-[4.9999rem] w-[1.65rem] h-[1.74rem] object-cover"
                alt=""
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184074100763795456/image.png?ex=658aa5f0&is=657830f0&hm=56f437a8feb464628765049711c4cf1d08f05c532a8972598d0b44065b616292&"
              />
            </div> */}

              {num === 0 ? (
                <div
                  onClick={handleConnectWallet}
                  className="relative rounded-lg hover:bg-violet-400 transition-transform transform hover:scale-75 bg-blueviolet box-border w-[9.875rem] h-[2.56rem] overflow-hidden text-left text-[1rem] text-white font-inter border-t-[1px] border-solid border-mediumslateblue border-r-[1px] border-l-[1px]"
                >
                  <div className="absolute top-[0.69rem] left-[0.69rem] font-medium">
                    Connect to wallet
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => window.location.reload()}
                  className="relative rounded-lg hover:bg-violet-400 transition-transform transform hover:scale-75 bg-blueviolet box-border w-[9.875rem] h-[2.56rem] overflow-hidden text-left text-[1rem] text-white font-inter border-t-[1px] border-solid border-mediumslateblue border-r-[1px] border-l-[1px]"
                >
                  <div className="text-center relative top-2 font-medium">
                    Logout
                  </div>
                </div>
              )}
            </div>
            {/* wallet end */}
            <div className="w-full absolute bottom-0 bg-[#D0D0D0] box-border h-[0.063rem] border-t-[1px] border-solid border-white" />
          </div>
          {/* top section end */}
          <div className="flex flex-col p-[26px] ">
            {/* campaign info start */}
            <div className="flex flex-col">
              

              <div className="flex flex-col mt-10">
              
              <div className="w-[28.813rem] relative text-[1.25rem] font-semibold font-inter text-[#D9D9D9] text-left inline-block h-[1.438rem]">
<p className="">{data[0]}</p>

</div>

<div className="flex mt-[2.975rem]">

    <div className="flex gap-12">
        <div className="rounded-[15px]">
            <img className="w-[544px] object-cover h-auto" 
            // src={data[7]}
            src="https://i.imgur.com/pdAPWxh.png"
            alt="" />
        </div>
        <div className="opencard_div1_card ">
          <div className="opencard_div1_card1">
            <div className="opencard_div1_card1_1">
              <p>{data[6]}</p>
            </div>

            <div className="opencard_div1_card1_2 flex items-center justify-center">
              <p>
                {data[5]} / {noOfContributors} Votes
              </p>
            </div>
          </div>
          {/* {personalBal>0?(data[5](currentAccount)?):(<div></div>)} */}
          <div onClick={voteNow} className="opencard_div1_card2 effect ">
            <p title="Vote">Vote for Good</p>
          </div>

          <a target="_blank" className=" outline-none  mt-4" href="https://calendly.com/swayamsharma7021/30min"><div  className="opencard_div1_card2 effect ">
            <p title="schedule">Schedule Meeting</p>
          </div></a>
          
          <div className="opencard_div1_card3">
            <div className="opencard_div1_card3_1">
              <p>Goal amount :</p>
            </div>
            <div className="opencard_div1_card3_2">
              <p>{data[3]}</p>
              <div className="opencard_div1_card3_2_1">
                <img
                  src="https://cdn.discordapp.com/attachments/1151935478526910564/1152287827929866260/image.png"
                  alt=""
                />
                <p>ETH</p>
              </div>
            </div>
          </div>
          <div className="opencard_div1_card4">
            <div className="opencard_div1_card4_1">
              <p>Wallet address :</p>
            </div>
            <div className="opencard_div1_card4_2">
              <p> {data[1]}</p>
            </div>
          </div>
          <div className="opencard_div1_card5">
            <div className="opencard_div1_card5_1">
              <Progress_bar bgcolor="#16BDCA" progress={percent} height={30} />
            </div>
            <div className="opencard_div1_card5_2">
              <span>{timeRemaining} </span> <p> days left</p>
            </div>
          </div>
          <div className="opencard_div1_card6">
            <img
              src="https://cdn.discordapp.com/attachments/1151935478526910564/1152319641100746903/user-profile-icon-front-side-with-white-background_187299-40010.png"
              alt=""
            />

            <div className="opencard_div1_card6_1">
              <p className="first"> {data[2]}</p>
              <p>Campaigner</p>
            </div>
          </div>
          <div className="opencard_div1_card7">
            {(currentAccount===manager)&&(<div title="Pay" onClick={()=>{makePayment(index,showSuccessPopup,showErrorPopup)}} className="opencard_div1_card7_1  animate-pulse  flex-wrap cursor-pointer rounded">
              Make Payment
            </div>)}
          </div>
        </div>
    </div>

</div>

               

               

                <div className="relative my-5">
                  <div className="w-full absolute top-1/2 bg-[#D0D0D0] box-border h-[0.063rem] border-t-[1px] border-solid border-white" />
                  <div className="w-[139px] ml-7 flex items-center justify-center relative rounded-[35px] bg-white h-[2.188rem] overflow-hidden text-left text-[0.875rem] text-[#0A0A0A] font-inter">
                    <div className="">All Campaigns</div>
                  </div>
                </div>

                <div className="grid bg-black grid-cols-3 mt-[23px] gap-[3rem]">
                  {requests.map((request, index) => {
                    console.log("request from mainpage", request[4]);
                    if (request[4] === true) {
                      return null;
                    }
                    return (
                      <Card
                        key={index}
                        index={index}
                        img={request[7]}
                        description={request[0]}
                        user={request[2]}
                        fundReq={request[3]}
                        // days='40'
                        type={request[6]}
                        votes={request[5]}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            {/* campaign info end */}
          </div>

          <div className="flex items-center justify-start left-5   relative w-full top-[2rem]"></div>
        </div>
        {/* mid portion  end*/}

        {/* wallet section */}
        {/* <div className="flex flex-col w-full bg-black">
          <div className="flex w-full justify-around h-[5.75rem] items-center">
            <div className="relative rounded-md [background:linear-gradient(106.75deg,_#fdd835,_#fff_49.15%,_#ffd000)] box-border  h-[2.563rem] w-[8.438rem] overflow-hidden text-left text-[0.88rem] text-black font-inter border-t-[1px] border-solid border-cornsilk border-r-[1px] border-l-[1px]">
              <div className="absolute top-[0.75rem] left-[1.38rem] font-medium">
                {userBal | 0} coins
              </div>
              <img
                className="absolute top-[0.5rem] left-[4.9999rem] w-[1.65rem] h-[1.74rem] object-cover"
                alt=""
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184074100763795456/image.png?ex=658aa5f0&is=657830f0&hm=56f437a8feb464628765049711c4cf1d08f05c532a8972598d0b44065b616292&"
              />
            </div>

            {num === 0 ? (
              <div
                onClick={handleConnectWallet}
                className="relative rounded-lg hover:bg-violet-400 transition-transform transform hover:scale-75 bg-blueviolet box-border w-[9.875rem] h-[2.56rem] overflow-hidden text-left text-[1rem] text-white font-inter border-t-[1px] border-solid border-mediumslateblue border-r-[1px] border-l-[1px]"
              >
                <div className="absolute top-[0.69rem] left-[0.69rem] font-medium">
                  Connect to wallet
                </div>
              </div>
            ) : (
              <div
                onClick={() => window.location.reload()}
                className="relative rounded-lg hover:bg-violet-400 transition-transform transform hover:scale-75 bg-blueviolet box-border w-[9.875rem] h-[2.56rem] overflow-hidden text-left text-[1rem] text-white font-inter border-t-[1px] border-solid border-mediumslateblue border-r-[1px] border-l-[1px]"
              >
                <div className="text-center relative top-2 font-medium">
                  Logout
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-start ml-10 mt-4">
            <div className="relative rounded-2xl [background:linear-gradient(180.13deg,_#202020,_#181818)] box-border w-[16.938rem] h-[23.69rem] overflow-hidden text-left text-[0.88rem] text-white font-inter border-t-[2px] border-solid border-grayz border-r-[1px] border-l-[1px]">
              <b className="absolute top-[1.13rem] left-[1.06rem] text-[1.13rem]">
                linkup with
              </b>
              <div className="absolute top-[5.13rem] left-[3.81rem] text-[1rem] font-medium">
                Amit Sinha
              </div>
              <div className="absolute top-[9.44rem] left-[3.81rem] text-[1rem] font-medium">
                Amit Sinha
              </div>
              <div className="absolute top-[13.75rem] left-[3.81rem] text-[1rem] font-medium">
                Amit Sinha
              </div>
              <div className="absolute top-[18.06rem] left-[3.81rem] text-[1rem] font-medium">
                Amit Sinha
              </div>
              <div className="absolute top-[6.31rem] left-[3.81rem] text-colours-gray-500">
                @amitsinha.dso
              </div>
              <div className="absolute top-[10.63rem] left-[3.81rem] text-colours-gray-500">
                @amitsinha.dso
              </div>
              <div className="absolute top-[14.94rem] left-[3.81rem] text-colours-gray-500">
                @amitsinha.dso
              </div>
              <div className="absolute top-[19.25rem] left-[3.81rem] text-colours-gray-500">
                @amitsinha.dso
              </div>
              <img
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184072438695338046/image.png?ex=658aa464&is=65782f64&hm=633b38526fb6b6da794465b600fb96b51339200700063e89bf541465c40aec95&"
                className="absolute top-[5.13rem] left-[1.06rem] rounded-lg bg-white w-[2.25rem] h-[2.25rem] overflow-hidden"
              />
              <img
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184072438695338046/image.png?ex=658aa464&is=65782f64&hm=633b38526fb6b6da794465b600fb96b51339200700063e89bf541465c40aec95&"
                className="absolute top-[9.44rem] left-[1.06rem] rounded-lg bg-white w-[2.25rem] h-[2.25rem] overflow-hidden"
              />
              <img
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184072438695338046/image.png?ex=658aa464&is=65782f64&hm=633b38526fb6b6da794465b600fb96b51339200700063e89bf541465c40aec95&"
                className="absolute top-[13.75rem] left-[1.06rem] rounded-lg bg-white w-[2.25rem] h-[2.25rem] overflow-hidden"
              />
              <img
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184072438695338046/image.png?ex=658aa464&is=65782f64&hm=633b38526fb6b6da794465b600fb96b51339200700063e89bf541465c40aec95&"
                className="absolute top-[18.06rem] left-[1.06rem] rounded-lg bg-white w-[2.25rem] h-[2.25rem] overflow-hidden"
              />
             
             
             <img
  onClick={() => {
    setImage1((prev) => {
      const newImages = { ...prev };
      return {
        ...prev,
        main: newImages.alternate,
        alternate: newImages.main,
      };
    });
  }}
  className="absolute top-[5.06rem] left-[12.94rem] rounded-lg w-[2.38rem] h-[2.38rem] overflow-hidden"
  alt=""
  src={image1.main}
/>

               
            
              <img
               onClick={() => {
                setImage2((prev) => {
                  const newImages = { ...prev };
                  return {
                    ...prev,
                    main: newImages.alternate,
                    alternate: newImages.main,
                  };
                });
              }}
                className="absolute top-[9.38rem] left-[12.94rem] rounded-lg w-[2.38rem] h-[2.38rem] overflow-hidden"
                alt=""
                src={image2.main}
              />
              <img
               onClick={() => {
                setImage3((prev) => {
                  const newImages = { ...prev };
                  return {
                    ...prev,
                    main: newImages.alternate,
                    alternate: newImages.main,
                  };
                });
              }}
                className="absolute top-[13.69rem] left-[12.94rem] rounded-lg w-[2.38rem] h-[2.38rem] overflow-hidden"
                alt=""
                src={image3.main}

              />
              <img
               onClick={() => {
                setImage4((prev) => {
                  const newImages = { ...prev };
                  return {
                    ...prev,
                    main: newImages.alternate,
                    alternate: newImages.main,
                  };
                });
              }}
                className="absolute top-[18rem] left-[12.94rem] rounded-lg w-[2.38rem] h-[2.38rem] overflow-hidden"
                alt=""
                src={image4.main}

              />
              <div className="absolute top-[21.88rem] left-[1.06rem] font-medium text-cornflowerblue">
                Show More
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl [background:linear-gradient(180.13deg,_#202020,_#181818)] ml-10 mt-4 box-border w-[16.938rem] h-[11.13rem] overflow-hidden text-left text-[1rem] text-gray-50 font-inter ">
            <b className="absolute top-[0.94rem] left-[1.31rem] text-[1.13rem] text-white">
              {" "}
              Bounty
            </b>
            <div
              className={`absolute top-[3.94rem] left-[1rem] rounded-6xs ${
                rewardLikes >= 1 ? "bg-green-500" : "bg-[#2a2a2a]"
              } box-border w-[15rem] h-[2.19rem] overflow-hidden border-t-[1px] border-solid border-dimgray`}
            >
              <div className="absolute top-[0.5rem] left-[0.rem] font-medium">
                Complete {rewardLikes}/1 Like
              </div>
              <img
                className="absolute top-[0.44rem] left-[13rem] w-[1.38rem] h-[1.38rem] overflow-hidden"
                alt=""
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184074424589234247/image.png?ex=658aa63d&is=6578313d&hm=2b6b6c395d7c9522dca53ed54c6b3bd6c9ec744cfa4550da8112ffd872e6a66d&"
              />
            </div>
            <div
              className={`absolute top-[7.25rem] left-[1rem] rounded-6xs ${
                rewardComments >= 10 ? "bg-green-500" : "bg-[#2a2a2a]"
              }  box-border w-[15rem] h-[2.19rem] overflow-hidden border-t-[1px] border-solid border-dimgray`}
            >
              <div className="absolute top-[0.5rem] left-[0.5rem] font-medium">
                Complete {rewardComments}/10 Comments
              </div>
              <img
                className="absolute top-[0.44rem] left-[13rem] w-[1.38rem] h-[1.38rem] overflow-hidden"
                alt=""
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184074424589234247/image.png?ex=658aa63d&is=6578313d&hm=2b6b6c395d7c9522dca53ed54c6b3bd6c9ec744cfa4550da8112ffd872e6a66d&"
              />
            </div>
          </div>

          {/* test
<div>

asssd
<Popup/>
</div> 
        </div> */}
        {/* wallet section end*/}
      </div>
    </div>
  );
};

export default OpenCard;

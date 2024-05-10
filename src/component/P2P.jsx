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
import P2Pcard from "./P2Pcard";
import P2Pwallet from "./P2Pwallet";
import P2Pregister from "./P2Pregister";
import axios from "axios";


const P2P = () => {
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
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [scanToPay,setScanToPay] = useState(false)
  const [call,setCall] = useState(false)
  const [bruno,setBruno] = useState('')

  //   const {getManager,manager} = useContext(Context);

  const [image1, setImage1] = useState({
    main:
      "https://cdn.discordapp.com/attachments/1177493315898314792/1184074670744551474/image.png?ex=658aa678&is=65783178&hm=c7bd009be31c8353e4371ee931a7146052b94e697a9529a6997619afe2c153ad&",
    alternate:
      "https://cdn.discordapp.com/attachments/1184864067295395960/1185693981800149102/image.png?ex=65908a92&is=657e1592&hm=6932cde68b59daabb1f360bbad1d341547b721343003999b85bb19d5ac546ff8&",
  });
  const [image2, setImage2] = useState({
    main:
      "https://cdn.discordapp.com/attachments/1177493315898314792/1184074670744551474/image.png?ex=658aa678&is=65783178&hm=c7bd009be31c8353e4371ee931a7146052b94e697a9529a6997619afe2c153ad&",
    alternate:
      "https://cdn.discordapp.com/attachments/1184864067295395960/1185693981800149102/image.png?ex=65908a92&is=657e1592&hm=6932cde68b59daabb1f360bbad1d341547b721343003999b85bb19d5ac546ff8&",
  });
  const [image3, setImage3] = useState({
    main:
      "https://cdn.discordapp.com/attachments/1177493315898314792/1184074670744551474/image.png?ex=658aa678&is=65783178&hm=c7bd009be31c8353e4371ee931a7146052b94e697a9529a6997619afe2c153ad&",
    alternate:
      "https://cdn.discordapp.com/attachments/1184864067295395960/1185693981800149102/image.png?ex=65908a92&is=657e1592&hm=6932cde68b59daabb1f360bbad1d341547b721343003999b85bb19d5ac546ff8&",
  });
  const [image4, setImage4] = useState({
    main:
      "https://cdn.discordapp.com/attachments/1177493315898314792/1184074670744551474/image.png?ex=658aa678&is=65783178&hm=c7bd009be31c8353e4371ee931a7146052b94e697a9529a6997619afe2c153ad&",
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

function handleWalletDialog(){
    setIsWalletOpen((prev)=>{
        return !prev
    })
}
const handleSubmit = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/cc', {
      number : bruno
    });
    console.log('you just clicked submit');

    console.log('Response from server:', response.data);
  } catch (error) {
    console.error('Error sending data:', error);
  }
};


function handleQr(){
    setScanToPay((prev)=>{
      return !prev;
    })
  }
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
    "https://cdn.discordapp.com/attachments/1177493315898314792/1184074670744551474/image.png?ex=658aa678&is=65783178&hm=c7bd009be31c8353e4371ee931a7146052b94e697a9529a6997619afe2c153ad&"
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
    getUserData,
    userPost,
    getAllPost,
    refresh,
    requests,
    getUserPost,
    getAllPrivatePost,
    getUserPrivatePost,
    // withdrawCoins,
    getRewardStatus,
  } = useContext(Context);
  const handleConnectWallet = async () => {
    await ConnectWallet();
  };

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
    <div className="bg-black min-h-screen relative  ">
        {/* register */}
        {/* <div className="h-full w-full flex items-center justify-center backdrop-blur-lg z-20 absolute">
            <P2Pregister />
        </div> */}
        {/* scan to pay 
       */}
       <div  className={`absolute h-full w-full backdrop-blur-lg z-20 flex items-center justify-center ${scanToPay?'block':'hidden'} `}>
                        <div className="flex flex-col z-50 bg-white p-6 rounded-lg">
                          <div>
                            <img className=" object-cover w-[296px]" src="https://i.imgur.com/GwTRMRy.jpeg" alt="" />
                          </div>

                          <div onClick={handleQr} className=" w-max mx-auto bg-black text-white p-5 rounded-lg">
                            Confirm
                          </div>

                        </div>
                        </div>
                        {/* scan to pay end
       */}
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
        <div className="flex flex-col min-w-[20.25rem] min-h-screen  bg-black items-center justify-around border-r-[1px] border-solid border-gray-700 box-border">
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
              <div
                onClick={() => {
                  navigate("/crowdfunding");
                }}
                className="flex flex-row hover:opacity-50 cursor-pointer items-center justify-start gap-[0.63rem]"
              >
                <img
                  className="relative w-[1.06rem] h-[1rem]"
                  alt=""
                  src="https://i.imgur.com/6XKA7yr.png"
                />
                <div className="relative font-medium">Crowdfunding</div>
              </div>

              <div
                onClick={() => {
                  navigate("/p2p");
                }}
                className="flex flex-row hover:opacity-50 cursor-pointer items-center justify-start gap-[0.63rem]"
              >
                <img
                  className="relative w-[1.06rem] h-[1rem]"
                  alt=""
                  src="https://i.imgur.com/6XKA7yr.png"
                />
                <div className="relative font-medium">P2P</div>
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

          <div className="relative mt-5 w-[12rem] h-[2.25rem] text-left text-[0.8rem] text-white font-inter">
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
                P2P Exchange
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
          <div className="flex flex-col p-4">
            <div className="flex relative">

            
            <div className="flex gap-6 pl-[49px]">
            <div className="w-[205px] flex items-center justify-center relative rounded-[35px] [background:linear-gradient(176.52deg,_#0057ff,_#181818)] h-[2.813rem] overflow-hidden text-center text-[0.875rem] text-white font-inter">
<div className=" font-medium inline-block w-[10.063rem]">List currency for P2P Exchange</div>
</div>
            </div>

            <div onClick={()=>{
              navigate('/ledger')
            }} className="w-[205px] ml-[24px] flex items-center justify-center relative rounded-[35px] [background:linear-gradient(177.22deg,_#fff,_#181818)] h-[2.813rem] overflow-hidden text-center text-[0.875rem] text-black font-inter">
<div className=" font-medium inline-block w-[8.938rem]">All transactions Ledger</div>
</div>

<div  onClick={() => {
                          setScanToPay(true);
                        }} className="w-[87px] ml-6 top-2 flex items-center justify-center relative rounded-[3px] bg-white [background:linear-gradient(179.57deg,_#fff)] h-[1.563rem] overflow-hidden text-left text-[0.625rem] text-black font-inter">
          <div className=" font-medium">Buy Money</div>
        </div>

        <a href="https://cdn.discordapp.com/attachments/1191304176332976161/1216267410881908877/wallet_and_chart.docx?ex=65ffc44b&is=65ed4f4b&hm=4ce8fa1f22236f70b82c5341feda2aa4d6a5f9ee068223d5e03172477d6cd350&" target="_blank"><div className="w-[87px] ml-6 top-2 flex items-center justify-center relative rounded-[3px] bg-white [background:linear-gradient(179.57deg,_#fff)] h-[1.563rem] overflow-hidden text-left text-[0.625rem] text-black font-inter">
          <div className=" font-medium">Download Invoice</div>
        </div></a>

<div onClick={()=>{setCall(true)}} className="relative ml-[307px] h-[37px] flex items-center justify-center">
                  <img
                    className="w-[134px] absolute h-full object-cover"
                    src="https://i.imgur.com/A5ouzTv.png"
                    alt=""
                  />
                  <div className="w-[7.063rem] relative text-[1.063rem] font-medium font-inter text-white text-center inline-block">
                    customercare
                  </div>
                  <div className={`absolute p-5 flex flex-col gap-4 bg-blue-300 rounded-xl z-20 w-[400px] ${call ? 'block' : 'hidden'} `}>
            <label htmlFor="">Enter your Number:</label>
            <input value={bruno} onChange={(e)=>{
              
              setBruno(e.target.value)
            }} type="text" />

            <button className='' onClick={handleSubmit}>Submit</button>
            </div>
                </div>

                <div onClick={ handleWalletDialog} className="cursor-pointer ml-[63px]">
                    <img className="w-[55px] object-cover" src="https://i.imgur.com/66R0Osi.png" alt="" />
                </div>

                <div className={`${isWalletOpen?'flex':'hidden'} absolute z-10 right-[120px] top-[70px]`}>
                    <P2Pwallet close = {handleWalletDialog}/>
                </div>

                </div>

                {/* card section */}
                <div className="grid gap-5 mt-5 ml-[49px] grid-cols-3">
                    <P2Pcard/>

                </div>
                {/* card section end */}

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
                src="https://i.imgur.com/DIdPWfs.png"
                className="absolute top-[5.13rem] left-[1.06rem] rounded-lg bg-white w-[2.25rem] h-[2.25rem] overflow-hidden"
              />
              <img
                src="https://i.imgur.com/DIdPWfs.png"
                className="absolute top-[9.44rem] left-[1.06rem] rounded-lg bg-white w-[2.25rem] h-[2.25rem] overflow-hidden"
              />
              <img
                src="https://i.imgur.com/DIdPWfs.png"
                className="absolute top-[13.75rem] left-[1.06rem] rounded-lg bg-white w-[2.25rem] h-[2.25rem] overflow-hidden"
              />
              <img
                src="https://i.imgur.com/DIdPWfs.png"
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

export default P2P;

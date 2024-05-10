import PostCard from "./PostCard";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import "reactjs-popup/dist/index.css";
import PostComponent from "./PostComponent";

const Communities = () => {
  const navigate = useNavigate();
  const [commentOpen, setCommentOpen] = useState(false);
  const [userBal, setUserBal] = useState(0);
  const [likess, setLikess] = useState(477);
  const [isRegister, setIsRegister] = useState(1);
  const [regUsername, setRegUsername] = useState("");
  const [num, setNum] = useState(0);
  const [rewardLikes, setRewardLikes] = useState(0);
  const [rewardComments, setRewardComments] = useState(0);

  console.log("num", num, "type", typeof num);
  function handleUsername(e) {
    console.log("handleusername", e.target.value);
    setRegUsername(e.target.value);
  }

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
    isNewUser,
    createUser,
    createPost,
    likePost,
    getUserData,
    userPost,
    getRewardStatus,
    refresh,
  } = useContext(Context);
  const handleConnectWallet = async () => {
    await ConnectWallet();
  };

  useEffect(() => {
    const getBal = async () => {
      console.log("currentAccount useeffect", currentAccount);
      if (currentAccount) {
        const bal = await getUserData(currentAccount);
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
        console.log("numm", num, "type", typeof num);

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
  }, [
    currentAccount,
    createUser,
    refresh,
    num,
    userPost,
    likePost,
    getUserData,
  ]);
  return (
    <div className="bg-black min-h-max  h-[150vh]">
      <div className="flex max-h-[150vh] h-[100vh]">
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
                onClick={() => {
                  createUser(regUsername);
                  console.log(regUsername);
                  setIsRegister(1);
                }}
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
              src="https://i.imgur.com/6FOlAht.png"
              alt=""
            />
          </div>

          <div className="relative bottom-[5rem] w-full flex  items-start justify-center  ">
            <div className="flex flex-col gap-[2.25rem] text-left text-[1.25rem] text-white font-inter">
              <div
                onClick={() => {
                  navigate("/home1");
                }}
                className="flex flex-row  cursor-pointer items-center justify-start gap-[0.63rem]"
              >
                <img
                  className="relative bottom-[0.2rem] w-[1.31rem] h-[1.31rem] overflow-hidden shrink-0"
                  alt=""
                  src="https://i.imgur.com/mZsCzUs.png"
                />
                <div className="relative font-medium ">Home</div>
              </div>
              <div
                onClick={() => {
                  navigate("/notifications");
                }}
                className="flex flex-row hover:opacity-50 cursor-pointer items-center justify-start gap-[0.63rem]"
              >
                <img
                  className="relative w-[1rem] h-[1.19rem]"
                  alt=""
                  src="https://i.imgur.com/R8gSrn0.png"
                />
                <div
                  onClick={() => {
                    navigate("/notifications");
                  }}
                  className="relative font-medium"
                >
                  Notifications
                </div>
              </div>
              <div
                onClick={() => {
                  navigate("/messages");
                }}
                className="flex flex-row hover:opacity-50 cursor-pointer items-center justify-start gap-[0.63rem]"
              >
                <img
                  className="relative w-[1.06rem] h-[1rem]"
                  alt=""
                  src="https://i.imgur.com/6XKA7yr.png"
                />
                <div className="relative font-medium">Messages</div>
              </div>
              <div
                onClick={() => {
                  if (num === 1) {
                    navigate("/communities");
                  }
                }}
                className="flex flex-row hover:opacity-50 cursor-pointer items-start justify-start gap-[0.63rem]"
              >
                <img
                  className="relative w-[1.25rem] h-[1.19rem]"
                  alt=""
                  src="https://i.imgur.com/GZZIM0x.png"
                />
                <div className="relative  font-medium">Communities</div>
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

          <div className="relative w-[12rem] h-[2.25rem] text-left text-[1rem] text-white font-inter">
            <b className="absolute top-[0rem] left-[2.56rem]">Amit Sinha</b>
            <div className="absolute top-[1.31rem] left-[2.5rem] text-[0.75rem] text-colours-gray-500">
              @amitsinha.dso
            </div>
            <div className="absolute top-[0rem] left-[0rem] rounded-[69px] bg-white w-[2.06rem] h-[2.06rem] overflow-hidden">
              <img
                className="absolute top-[0rem] left-[0rem] rounded-[30px] w-[2.25rem] h-[2.25rem] object-cover"
                alt=""
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184072438695338046/image.png?ex=658aa464&is=65782f64&hm=633b38526fb6b6da794465b600fb96b51339200700063e89bf541465c40aec95&"
              />
            </div>
            <img
              className="absolute top-[0rem] left-[11.75rem] w-[1.5rem] h-[1.5rem] overflow-hidden"
              alt=""
              src="https://i.imgur.com/UU8RPw0.png"
            />
          </div>
        </div>
        {/* options end */}

        {/* mid portion */}
        <div className="flex flex-col min-w-[48.138rem] bg-black border-r-[1px] border-solid border-gray-700 box-border">
          {/* <div className="h-[5.75rem] w-full] flex items-center justify-center border-b-[1px] border-solid border-gray-700 box-border">
            <div className="relative mx-auto my-auto rounded-[67px] bg-colours-gray-900 w-[39.375rem] h-[2.75rem] overflow-hidden text-left text-[1rem] text-gray font-inter ">
             
              <img
                className="absolute top-[0.75rem] left-[2.13rem] w-[1.19rem] h-[1.19rem] overflow-hidden"
                alt=""
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184078012669501510/image.png?ex=658aa995&is=65783495&hm=9f770576644efc3f8eccaf92aae7308b731a06ed7ac8a6e87f06211be40c03c1&"
              />
            </div>
          </div> */}

          <img
            onClick={() => {
              navigate(-1);
            }}
            className="relative z-10 hover:opacity-50 left-[20px] top-[50px] cursor-pointer w-7 h-7 overflow-hidden shrink-0 object-cover"
            alt=""
            src="  https://cdn.discordapp.com/attachments/1177493315898314792/1184825516964982887/image.png?ex=658d61c0&is=657aecc0&hm=03d7d2eec4cc415f0b7ed3a05ed98e0ab55fee03bd1acfbd38122334b4cf65b4&"
          />

          <div className="relative w-full h-[882px] text-left text-lg text-white font-inter">
            <b className="absolute top-[97px] left-[26px] text-[20px]">
              Discover Communities
            </b>
            <div className="absolute top-[173px] left-[180px] font-semibold">{`Web3 Community `}</div>
            <div className="absolute top-[361px] left-[180px] font-semibold">{`Web3 Community `}</div>
            <div className="absolute top-[550px] left-[180px] font-semibold">{`Web3 Community `}</div>
            <div className="absolute top-[739px] left-[180px] font-semibold">{`Web3 Community `}</div>
            <div className="absolute top-[195px] left-[180px] text-sm text-colours-gray-500">
              140 Members
            </div>
            <div className="absolute top-[383px] left-[180px] text-sm text-colours-gray-500">
              140 Members
            </div>
            <div className="absolute top-[572px] left-[180px] text-sm text-colours-gray-500">
              140 Members
            </div>
            <div className="absolute top-[761px] left-[180px] text-sm text-colours-gray-500">
              140 Members
            </div>
            <div className="absolute top-[10px] left-[65px] rounded-[67px] bg-colours-gray-900 w-[630px] h-[53px] overflow-hidden text-gray-400">
              <div className="absolute top-[16px] left-[62px] font-medium">
                Search
              </div>
              <img
                className="absolute top-[15px] left-[29px] w-[23px] h-[23px] overflow-hidden object-cover"
                alt=""
                src="   https://cdn.discordapp.com/attachments/1177493315898314792/1184078012669501510/image.png?ex=658aa995&is=65783495&hm=9f770576644efc3f8eccaf92aae7308b731a06ed7ac8a6e87f06211be40c03c1&"
              />
            </div>
            <img
              className="absolute top-[83px] left-[0px] max-h-full w-[759px] object-cover"
              alt=""
              src="/line-11@2x.png"
            />
            <img
              className="absolute top-[163px] left-[26px] rounded-mid w-[139px] h-[153px] object-cover"
              alt=""
              src="https://cdn.discordapp.com/attachments/1177493315898314792/1184829952324018236/3yCasXvZTNe_RusyS9V49A.png?ex=658d65e1&is=657af0e1&hm=5a5e2ac920238cfd04e2e869fceed25b0531a0de0a591191eb5499a45131f37f&"
            />
            <img
              className="absolute top-[351px] left-[26px] rounded-mid w-[139px] h-[153px] object-cover"
              alt=""
              src="   https://cdn.discordapp.com/attachments/1177493315898314792/1184829971999502347/YGtmCTrPTGWHjX2lop1rPg.png?ex=658d65e6&is=657af0e6&hm=0866d6197b8d34783c32139fef37c44742794374fb5c6a9d317cd6557f037ac5&"
            />
            <img
              className="absolute top-[540px] left-[26px] rounded-mid w-[139px] h-[153px] object-cover"
              alt=""
              src="    https://cdn.discordapp.com/attachments/1177493315898314792/1184830227243872307/evx3tiHQTL-DZCCxPs-9TQ.png?ex=658d6623&is=657af123&hm=1dee0a753f7f4d85962194d79fa1b9c26337f3627d57c565334ffb5f22ba830f&"
            />
            <img
              className="absolute top-[729px] left-[26px] rounded-mid w-[139px] h-[153px] object-cover"
              alt=""
              src="   https://cdn.discordapp.com/attachments/1177493315898314792/1184830541531455548/VxG6rLFIQd6AX2AqvTEXDQ.png?ex=658d666e&is=657af16e&hm=052d937216c0016afb9c8fb2d496cef268b2ecf31ffe2c6841adfb9b56226db0&"
            />
            <img
              className="absolute top-[413px] left-[180px] w-[102px] h-[29px] object-cover"
              alt=""
              src="https://cdn.discordapp.com/attachments/1177493315898314792/1184074920045584434/image.png?ex=658aa6b3&is=657831b3&hm=e36822fe75fff4ea6988b4d01780fa7e386aa419bffbecfdda29ec62c36a09c8&"
            />
            <img
              className="absolute top-[219px] left-[180px] w-[102px] h-[29px] object-cover"
              alt=""
              src=" https://cdn.discordapp.com/attachments/1177493315898314792/1184074920045584434/image.png?ex=658aa6b3&is=657831b3&hm=e36822fe75fff4ea6988b4d01780fa7e386aa419bffbecfdda29ec62c36a09c8&"
            />
            <img
              className="absolute top-[601px] left-[180px] w-[102px] h-[29px] object-cover"
              alt=""
              src="https://cdn.discordapp.com/attachments/1177493315898314792/1184074920045584434/image.png?ex=658aa6b3&is=657831b3&hm=e36822fe75fff4ea6988b4d01780fa7e386aa419bffbecfdda29ec62c36a09c8&"
            />
            <img
              className="absolute top-[790px] left-[180px] w-[102px] h-[29px] object-cover"
              alt=""
              src="https://cdn.discordapp.com/attachments/1177493315898314792/1184074920045584434/image.png?ex=658aa6b3&is=657831b3&hm=e36822fe75fff4ea6988b4d01780fa7e386aa419bffbecfdda29ec62c36a09c8&"
            />
          </div>

          <div className="flex items-center justify-start left-5   relative w-full top-[2rem]"></div>
        </div>
        {/* mid portion  end*/}

        {/* wallet section */}
        <div className="flex flex-col w-full bg-black">
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
                className="absolute top-[5.06rem] left-[12.94rem] rounded-lg w-[2.38rem] h-[2.38rem] overflow-hidden"
                alt=""
                src="https://i.imgur.com/2ksquEu.png"
              />
              <img
                className="absolute top-[9.38rem] left-[12.94rem] rounded-lg w-[2.38rem] h-[2.38rem] overflow-hidden"
                alt=""
                src="https://i.imgur.com/2ksquEu.png"
              />
              <img
                className="absolute top-[13.69rem] left-[12.94rem] rounded-lg w-[2.38rem] h-[2.38rem] overflow-hidden"
                alt=""
                src="https://i.imgur.com/2ksquEu.png"
              />
              <img
                className="absolute top-[18rem] left-[12.94rem] rounded-lg w-[2.38rem] h-[2.38rem] overflow-hidden"
                alt=""
                src="https://i.imgur.com/2ksquEu.png"
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
</div> */}
        </div>
        {/* wallet section end*/}
      </div>
    </div>
  );
};

export default Communities;

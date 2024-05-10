import PostCard from "./PostCard";
import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";
import "reactjs-popup/dist/index.css";
import PostComponent from "./PostComponent";

const Notifications = () => {
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
              src="https://i.imgur.com/6YjIbLD.png"
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
                  src="https://i.imgur.com/rt4TPme.jpeg"
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

          {/* <div className="relative rounded-[97px] bg-cornflowerblue box-border w-[13rem] h-[3.06rem] overflow-hidden text-left text-[1.25rem] text-white font-inter border-t-[1px] border-solid border-lightskyblue border-r-[1px] border-l-[1px]">
            <div className="absolute py-[0.81rem] px-[5.13rem] font-semibold">
              Post
            </div>
          </div> */}

          {/* <div className="relative rounded-[97px] bg-cornflowerblue box-border w-[13rem] h-[3.06rem] overflow-hidden text-left text-[1.25rem] text-white font-inter border-t-[1px] border-solid border-lightskyblue border-r-[1px] border-l-[1px] transition-all duration-300 hover:bg-white hover:text-cornflowerblue">
            <div className="absolute py-[0.81rem] px-[5.13rem] font-semibold">
              Post
            </div>
          </div> */}

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
                src="https://i.imgur.com/kf27WME.png"
              />
            </div>
          </div> */}

          <div className="relative w-full h-[612px] text-left text-lg text-white font-inter">
            <img
              onClick={() => {
                navigate(-1);
              }}
              className="absolute cursor-pointer top-[12px] left-[8px] w-7 h-7 overflow-hidden object-cover"
              alt=""
              src="  https://cdn.discordapp.com/attachments/1177493315898314792/1184825516964982887/image.png?ex=658d61c0&is=657aecc0&hm=03d7d2eec4cc415f0b7ed3a05ed98e0ab55fee03bd1acfbd38122334b4cf65b4&"
            />
            <b className="absolute top-[95px] left-[28px] text-[20px]">
              Notifications
            </b>
            <div className="absolute top-[189px] left-[72px]">
              <b>{`Linda `}</b>
              <span className="font-medium">and 4 others liked your post</span>
            </div>
            <div className="absolute top-[354px] left-[80px]">
              <b>{`Linda `}</b>
              <span className="font-medium">and 4 others liked your post</span>
            </div>
            <div className="absolute top-[519px] left-[80px]">
              <b>{`Linda `}</b>
              <span className="font-medium">and 4 others liked your post</span>
            </div>
            <div className="absolute top-[0px] left-[65px] rounded-[67px] bg-colours-gray-900 w-[630px] h-[53px] overflow-hidden text-gray-400">
              <div className="absolute top-[16px] left-[62px] font-medium">
                Search
              </div>
              <img
                className="absolute top-[15px] left-[29px] w-[23px] h-[23px] overflow-hidden object-cover"
                alt=""
                src="   https://i.imgur.com/kf27WME.png"
              />
            </div>
            <img
              className="absolute top-[83px] left-[0px] max-h-full w-[759px] object-cover"
              alt=""
              src="/line-14@2x.png"
            />
            <img
              className="absolute top-[282px] left-[0px] max-h-full w-[759px] object-cover"
              alt=""
              src="/line-15@2x.png"
            />
            <img
              className="absolute top-[447px] left-[0px] max-h-full w-[759px] object-cover"
              alt=""
              src="/line-16@2x.png"
            />
            <img
              className="absolute top-[612px] left-[0px] max-h-full w-[759px] object-cover"
              alt=""
              src="/line-17@2x.png"
            />
            <div className="absolute top-[147px] left-[72px] w-[198px] h-[34px]">
              <img
                className="absolute top-[0px] left-[0px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184834164336377937/image.png?ex=658d69cd&is=657af4cd&hm=4e6452341bbbbd4598264cbca53b144ed7be7af2da805f001f8895c10f260968&"
              />
              <img
                className="absolute top-[0px] left-[41px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src=" https://cdn.discordapp.com/attachments/1177493315898314792/1184834176738934804/image.png?ex=658d69d0&is=657af4d0&hm=938099bed1506f44f0a56947ab247f7a3bc4ac48e7d4e108390a4f57da44acea&"
              />
              <img
                className="absolute top-[0px] left-[82px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184834190542385222/image.png?ex=658d69d4&is=657af4d4&hm=86a6d3c219e1a8ac2a6c6abcbc0c564c9642b92353767ca73ff64b5091d11256&"
              />
              <img
                className="absolute top-[0px] left-[123px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src=" https://cdn.discordapp.com/attachments/1177493315898314792/1184834205994193077/image.png?ex=658d69d7&is=657af4d7&hm=28e4ba9591a0b55fe4f31706bfe6bbfd482cc11bc8d8318fbe2121435146e77f&"
              />
              <img
                className="absolute top-[0px] left-[164px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184834239817072710/image.png?ex=658d69df&is=657af4df&hm=dc1aded63d23ca814306fb6874df8735201fab2e025c1dda33a892fb1a416c01&"
              />
            </div>
            <div className="absolute top-[312px] left-[80px] w-[198px] h-[34px]">
              <img
                className="absolute top-[0px] left-[0px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184834164336377937/image.png?ex=658d69cd&is=657af4cd&hm=4e6452341bbbbd4598264cbca53b144ed7be7af2da805f001f8895c10f260968&"
              />
              <img
                className="absolute top-[0px] left-[41px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184834176738934804/image.png?ex=658d69d0&is=657af4d0&hm=938099bed1506f44f0a56947ab247f7a3bc4ac48e7d4e108390a4f57da44acea&"
              />
              <img
                className="absolute top-[0px] left-[82px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184834190542385222/image.png?ex=658d69d4&is=657af4d4&hm=86a6d3c219e1a8ac2a6c6abcbc0c564c9642b92353767ca73ff64b5091d11256&"
              />
              <img
                className="absolute top-[0px] left-[123px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src=" https://cdn.discordapp.com/attachments/1177493315898314792/1184834205994193077/image.png?ex=658d69d7&is=657af4d7&hm=28e4ba9591a0b55fe4f31706bfe6bbfd482cc11bc8d8318fbe2121435146e77f&"
              />
              <img
                className="absolute top-[0px] left-[164px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src=" https://cdn.discordapp.com/attachments/1177493315898314792/1184834239817072710/image.png?ex=658d69df&is=657af4df&hm=dc1aded63d23ca814306fb6874df8735201fab2e025c1dda33a892fb1a416c01&"
              />
            </div>
            <div className="absolute top-[477px] left-[80px] w-[198px] h-[34px]">
              <img
                className="absolute top-[0px] left-[0px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184834164336377937/image.png?ex=658d69cd&is=657af4cd&hm=4e6452341bbbbd4598264cbca53b144ed7be7af2da805f001f8895c10f260968&"
              />
              <img
                className="absolute top-[0px] left-[41px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src=" https://cdn.discordapp.com/attachments/1177493315898314792/1184834176738934804/image.png?ex=658d69d0&is=657af4d0&hm=938099bed1506f44f0a56947ab247f7a3bc4ac48e7d4e108390a4f57da44acea&"
              />
              <img
                className="absolute top-[0px] left-[82px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src="   https://cdn.discordapp.com/attachments/1177493315898314792/1184834190542385222/image.png?ex=658d69d4&is=657af4d4&hm=86a6d3c219e1a8ac2a6c6abcbc0c564c9642b92353767ca73ff64b5091d11256&"
              />
              <img
                className="absolute top-[0px] left-[123px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src=" https://cdn.discordapp.com/attachments/1177493315898314792/1184834205994193077/image.png?ex=658d69d7&is=657af4d7&hm=28e4ba9591a0b55fe4f31706bfe6bbfd482cc11bc8d8318fbe2121435146e77f&"
              />
              <img
                className="absolute top-[0px] left-[164px] rounded-11xl w-[34px] h-[34px] object-cover"
                alt=""
                src=" https://cdn.discordapp.com/attachments/1177493315898314792/1184834239817072710/image.png?ex=658d69df&is=657af4df&hm=dc1aded63d23ca814306fb6874df8735201fab2e025c1dda33a892fb1a416c01&"
              />
            </div>
            <div className="absolute top-[223px] left-[72px] text-base text-[#545454]">
              Tried these thumbnails with a sporty aesthetic
            </div>
            <div className="absolute top-[388px] left-[80px] text-base text-[#545454]">
              Tried these thumbnails with a sporty aesthetic
            </div>
            <div className="absolute top-[553px] left-[80px] text-base text-[#545454]">
              Tried these thumbnails with a sporty aesthetic
            </div>
            <img
              className="absolute h-[4%] w-[3.8%] top-[24.84%] right-[92.51%] bottom-[71.16%] left-[3.69%] max-w-full overflow-hidden max-h-full object-cover"
              alt=""
              src="https://cdn.discordapp.com/attachments/1177493315898314792/1184075111532331038/image.png?ex=658aa6e1&is=657831e1&hm=b436aa28a50bac7704c280b6687c5eeaf94096d00765f395fc7f2039b533353d&"
            />
            <img
              className="absolute h-[4%] w-[3.8%] top-[51.8%] right-[91.45%] bottom-[44.2%] left-[4.74%] max-w-full overflow-hidden max-h-full object-cover"
              alt=""
              src="https://cdn.discordapp.com/attachments/1177493315898314792/1184075111532331038/image.png?ex=658aa6e1&is=657831e1&hm=b436aa28a50bac7704c280b6687c5eeaf94096d00765f395fc7f2039b533353d&"
            />
            <img
              className="absolute h-[4%] w-[3.8%] top-[78.76%] right-[91.45%] bottom-[17.24%] left-[4.74%] max-w-full overflow-hidden max-h-full object-cover"
              alt=""
              src="https://cdn.discordapp.com/attachments/1177493315898314792/1184075111532331038/image.png?ex=658aa6e1&is=657831e1&hm=b436aa28a50bac7704c280b6687c5eeaf94096d00765f395fc7f2039b533353d&"
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

export default Notifications;

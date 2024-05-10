import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/ContextProvider";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import "./css/Ai.css";
import axios from "axios";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"

const AiPlatform = () => {
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(0);
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const [successAlertContent, setSuccessAlertContent] = useState("");
  const [isAlertInfo, setIsAlertInfo] = useState(false);
  const [spin, setSpin] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [cid, setCid] = useState(null);

  const [url, setUrl] = useState(null);
  const [position, setPosition] = React.useState("bottom");
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload1 = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
  };

  const [image, setImage] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleImageGen = async () => {
    setSpin(true)
    try {
      const response = await axios.post("http://127.0.0.1:5000/imgen", {
        prompt: prompt,
      });
      console.log("response", response.data);

      setImage(response.data);
      setSpin(false)

      // handleUpload();
    } catch (error) {
      setSpin(false)

      console.error("Error sending POST request:", error);
    }
  };

  const handleImageGen2 = async () => {
    setSpin(true)

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
  
      const response = await axios.post("http://127.0.0.1:5000/uploadphoto", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("response", response.data);

      setImage(response.data);

      // handleUpload();
    setSpin(false)

    } catch (error) {
      setSpin(false)

      console.error("Error sending POST request:", error);
    }
  };

  const handleImageGen3 = async () => {
    setSpin(true)

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
  
      const response = await axios.post("http://127.0.0.1:5000/uploadphoto", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log("response", response.data);

      setImage(response.data);
      setSpin(false)

      // handleUpload();
    } catch (error) {
      setSpin(false)

      console.error("Error sending POST request:", error);
    }
  };
  const handleUpload = async () => {
    if (!image) {
      console.error("No file selected.");
      return;
    }
    console.log("spin activated", typeof image);

    const formData = new FormData();
    formData.append("file", image);
    console.log("file", formData);

    try {
      const response = await axios.post(
        "https://api.nft.storage/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRCOWM5Q0UwQmE3NENiRjA4QkJlZjIwNDMzZEUwYjczNzUxNjI4RTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5ODUwNDQ1NzM3MywibmFtZSI6IkZ1bmRFVEgifQ.JxTH4iRtScscfmb9mvZqhSqF9MKs2b0JJS2yof7hzF4`,
            "Content-Type": "Blob/File",
          },
        }
      );

      setCid(response.data.value.cid);

      console.log("NFT Storage response:", response.data.value.cid);
    } catch (error) {
      console.error("Error uploading to NFT Storage:", error);
    }
  };

  // useEffect(() => {
  //   if (cid) {
  //     setUrl(`https://${cid}.ipfs.nftstorage.link/${"image.jpeg"}`);
  //   }
  // }, [cid, image]);

  const {
    currentAccount,
    scoreBoard,
    handleConnectWallet,
    TotalEntries,
    totalEntriesAI,
    LeaderboardData,
    JoinRoom,
    VoteAI,
    UploadPicUrl,
  } = useContext(Context);

  const showSuccessPopup = (successMessage) => {
    console.log("ShowSuccess", successMessage);
    setSuccessAlertContent(successMessage);
    setIsAlertSuccess(true);
    setTimeout(() => {
      setIsAlertSuccess(false);
    }, 5000);
  };

  const handleChangePrompt = (event) => {
    setPrompt(event.target.value);
  };

  useEffect(() => {
    const third = async () => {
      await TotalEntries();
      await LeaderboardData();
    };
    third();
  }, []);

  return (
    <div className="m-0 flex flex-col gap-0 p-0">
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
        className={` absolute mt-[8rem]  items-end justify-center h-full w-full  z-50  ${
          spin ? "flex" : "hidden"
        }`}
      >
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      {/* spinner end */}

      <div className="w-full flex items-center justify-center  relative bg-[#ff9500] h-[2.563rem] overflow-hidden text-center text-[0.938rem] text-black font-lexend">
        <div
          style={{ fontFamily: "Lexend" }}
          className="w-max h-fit my-auto flex gap-2 relative text-[0.938rem] font-medium font-lexend text-black text-center"
        >
          {`DCONNECT is on CORE DAO, to interact you can get CORE DAO’s Testnet from `}
          <a
            href="https://scan.test.btcs.network/faucet"
            className="[text-decoration:underline]"
          >
            here
          </a>
          {` `}
          <img
            className=" object-cover h-5 w-5 "
            src="https://i.imgur.com/C47WreL.png"
            alt=""
          />
          <div className="relative w-fit left-[18rem]">
            {currentAccount === "" ? (
              <div
                onClick={handleConnectWallet}
                className="relative rounded-lg hover:bg-violet-400 transition-transform transform hover:scale-75 bg-blueviolet box-border w-[9.875rem] h-[2.06rem] overflow-hidden text-left text-[1rem] text-white font-inter border-t-[1px] border-solid border-mediumslateblue border-r-[1px] border-l-[1px]"
              >
                <div className="absolute top-[0.69rem] left-[0.69rem] font-medium">
                  Connect to wallet
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  setIsLogout(1);
                  window.location.reload();
                }}
                className="relative rounded-lg hover:bg-violet-400 transition-transform transform hover:scale-75 bg-blueviolet box-border w-[9.875rem] h-[2.06rem] overflow-hidden text-left text-[0.7rem] text-white font-inter border-t-[1px] border-solid border-mediumslateblue border-r-[1px] border-l-[1px]"
              >
                <div className="text-center relative top-2 font-medium">
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div>
                <button onClick={JoinRoom}>Join Room</button>
            </div>
            <div>
                Total entries :{totalEntriesAI}
            </div>
            <div>
                Leaderboard : {scoreBoard}
            </div>
            <div>
                <button onClick={()=>{
                    UploadPicUrl('pic url')
                }} >Upload Pic URL</button>
            </div>
            <div>
                <button onClick={VoteAI}>Vote</button>
            </div> */}

      <div
        style={{
          fontFamily: "Lexend",
          backgroundImage: 'url("https://i.imgur.com/Lb3zcot.png")',
          backgroundRepeat: "none",
        }}
        className="w-full  h-max min-h-[968px]  flex flex-col justify-start items-center  bg-contain "
      >
        <div className="grid mt-[116px] mb-[69px] grid-cols-4 gap-12">
          <img
            className="w-[220px] rounded-[7px] relative max-w-[220px] overflow-hidden h-[19.125rem] object-cover"
            alt=""
            src="https://i.imgur.com/x4Q9p7a.png"
          />
          <img
            className="w-[220px] rounded-[7px] relative max-w-[220px] overflow-hidden h-[19.125rem] object-cover"
            alt=""
            src="https://i.imgur.com/fO1bPJN.png"
          />
          <img
            className="w-[220px] rounded-[7px] relative max-w-[220px] overflow-hidden h-[19.125rem] object-cover"
            alt=""
            src="https://i.imgur.com/HKsqnYU.png"
          />
          <img
            className="w-[220px] rounded-[7px] relative max-w-[220px] overflow-hidden h-[19.125rem] object-cover"
            alt=""
            src="https://i.imgur.com/7pAF2IW.png"
          />
        </div>

        <div className="" style={{ fontFamily: "Lexend" }}>
          <b
            style={{ fontFamily: "Lexend" }}
            className="w-[49rem] mx-auto mb-4 relative text-[2rem] inline-block font-lexend text-center text-[#ff9500]"
          >
            <span>{`Generate `}</span>
            <span className="text-white">
              for the Community, By the community
            </span>
          </b>
        </div>

        <div
          style={{ fontFamily: "Lexend" }}
          className=" mb-[93px]  w-[42.125rem] py-4 mx-auto relative text-[0.938rem] font-medium font-lexend text-white text-center inline-block"
        >
          Create and share images, Memes, Songs, Quotes and threads with the
          community on chain
        </div>
        <div
          style={{ fontFamily: "Lexend" }}
          className="w-full min-w-full gap-10 flex text-white"
        >
          <div
            style={{ fontFamily: "Lexend" }}
            className="w-[780px] flex justify-between px-4 gap-5 mx-auto p-1 relative rounded-lg bg-white h-[3.188rem] overflow-hidden text-center text-[0.938rem] text-black font-lexend"
          >
            <input
              value={prompt}
              onChange={handleChangePrompt}
              placeholder="Make anything that you can imagine"
              style={{ fontFamily: "Lexend" }}
              type="text"
              className="w-[450px] border-none focus:border-none outline-none text-[0.938rem] font-lexend text-gray text-center inline-block"
              name=""
              id=""
            />
            <div
              onClick={() => {
                if (selectedOption == "1") {
                  handleImageGen();
                } else if (selectedOption == "2") {
                  handleImageGen2();
                }
                else{
                  handleImageGen3();

                }
              }}
              style={{ fontFamily: "Lexend" }}
              className="w-[130px]  cursor-pointer hover:scale-105 transition-all duration-200 flex items-center justify-center my-auto relative rounded-[5px] bg-[#ff9500] h-[2.5rem] overflow-hidden text-center text-[0.938rem] text-black font-lexend"
            >
              <div className="">Generate</div>
            </div>
          </div>
        </div>
        <div
          style={{ fontFamily: "Lexend" }}
          className="text-white gap-5 flex my-7"
        >
          <div>
            <label>
              <input
                type="radio"
                value="1"
                checked={selectedOption === "1"}
                onChange={handleOptionChange}
              />
              Image Generation
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="2"
                checked={selectedOption === "2"}
                onChange={handleOptionChange}
              />
              Surprise Me Memes
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="3"
                checked={selectedOption === "3"}
                onChange={handleOptionChange}
              />
              Photo Meme
            </label>
          </div>
          <div className={`${selectedOption === "3" ? "block" : "hidden"}  `}>
            <input type="file" accept="image/*" onChange={handleImageUpload1} />
          </div>
        </div>

        <img className="my-5 w-[80%] mx-auto max-h-[30rem] h-auto object-contain" src={image} alt="" />
      </div>

      <div
        style={{ fontFamily: "Lexend" }}
        className="flex relative bg-black min-h-screen h-full w-full flex-col items-center"
      >
        <div className="absolute left-0 top-[-3.41rem]">
          <img
            className="w-auto h-[272px] object-cover "
            src="https://i.imgur.com/eMANY3d.png"
            alt=""
          />
        </div>

        <div className="flex flex-col items-center mt-[61px] gap-1">
          <b className="w-[33.5rem] mx-auto relative text-[2.875rem] inline-block font-lexend text-white text-center">
            STAKE. ENGAGE. EARN
          </b>
          <div className="w-[15.3125rem] flex items-center justify-center mt-4 mb-[58px] relative rounded-[7px] bg-[#ff9500] h-[2.188rem] overflow-hidden">
            <div className="w-max relative text-[1.25rem] font-lexend text-black text-center inline-block">
              THROUGH COMMUNITY
            </div>
          </div>

          <div>
            <div className=" mx-auto grid w-[90%] grid-cols-3 gap-[50px] ">
              {/* 1st card */}
              <div
                onClick={async () => {
                  await JoinRoom();
                  navigate("/game");
                }}
                className="w-[393px] p-1 flex flex-col mb-5 relative rounded-lg  h-[25.313rem]  "
              >
                <img
                  className="w-full object-cover h-auto"
                  src="https://i.imgur.com/dJVPk9A.png"
                  alt=""
                />
              </div>

              {/* 2nd card */}
              <div className="w-[393px] p-1 flex flex-col mb-5 relative rounded-lg  h-[25.313rem]  ">
                <img
                  className="w-full object-cover h-auto"
                  src="https://i.imgur.com/ChnaUmX.png"
                  alt=""
                />
              </div>
              {/* 3rd card */}
              <div className="w-[393px] p-1 flex flex-col mb-5 relative rounded-lg  h-[25.313rem]  ">
                <img
                  className="w-full object-cover h-auto"
                  src="https://i.imgur.com/DrTFLZJ.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiPlatform;

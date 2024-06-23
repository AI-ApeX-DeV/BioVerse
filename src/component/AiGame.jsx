import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import axios from "axios";

const AiGame = () => {
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(0);
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const [successAlertContent, setSuccessAlertContent] = useState("");
  const [isAlertInfo, setIsAlertInfo] = useState(false);
  const [spin, setSpin] = useState(false);
  const [word, setWord] = useState("Apple");
  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [voteImg, setVoteImg] = useState([]);
  const [showThree, setShowThree] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [threeImg, setThreeImg] = useState([
    "https://bafybeifuscunak2qhwa5v6kecfdbi2t6rtoksqz67fjc75twaj7w6im62a.ipfs.nftstorage.link/filename.jpg",
    "https://bafybeih7lxmia7zqz37hp5jmzrtrazellra3dgszaqltm2zbp5ayt4br4u.ipfs.nftstorage.link/filename.jpg",
    "https://bafybeief6oevchhvyxyrorppjcayl2iwbw4fmybkilbzivq3knhvhmbdru.ipfs.nftstorage.link/filename.jpg",
  ]);

  const list = [
    "Apple",
    "House",
    "Car",
    "Dog",
    "Cat",
    "Table",
    "Chair",
    "Book",
    "Tree",
    "Road",
    "Sun",
    "Moon",
    "Water",
    "Food",
    "Love",
    "Friend",
    "Family",
    "Time",
    "Money",
    "Work",
  ];

  const appendValue = (newValue) => {
    setVoteImg([...voteImg, newValue]);
  };
  const handleImageGen = async () => {
    setSpin(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/imgen", {
        prompt: prompt,
      });
      console.log("response", response.data);

      setImageFile(response.data);
      setSpin(false);
      appendValue(imageFile);

      // handleUpload();
    } catch (error) {
      setSpin(false);

      console.error("Error sending POST request:", error);
    }
  };

  const [image, setImage] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * list.length);
    // setWord(list[randomIndex]);
    setWord("Apple");
  };
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
    showText,
    countdownDuration,

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
      console.log("currentAccount", currentAccount);
      await TotalEntries();
      await LeaderboardData();
      getRandomWord();
    };
    third();
  }, []);

  const [counter, setCounter] = useState(10); // Initial counter value
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility of the countdown

  // Function to start the countdown with the specified duration
  const startCountdown = (duration) => {
    setIsVisible(true); // Make the countdown visible
    setCounter(duration); // Set the counter to the specified duration
  };

  useEffect(() => {
    // Check if counter is greater than 0 and isVisible is true
    if (counter > 0 && isVisible) {
      const timer = setTimeout(() => {
        setCounter((prevCounter) => prevCounter - 1); // Decrement the counter by 1 every second
      }, 1000);
      // Cleanup function to clear the timer when component unmounts or when counter becomes 0
      return () => clearTimeout(timer);
    } else if (counter === 0 && isVisible) {
      // Hide the countdown when counter reaches 0
      setIsVisible(false);
    }
  }, [counter, isVisible]); // Run the effect whenever counter or isVisible changes

  useEffect(() => {
    // Start the countdown automatically if countdownDuration is more than 1
    if (countdownDuration > 1 && totalEntriesAI == "3") {
      startCountdown(countdownDuration);
    }
  }, [countdownDuration]);

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
        className={` absolute   items-center justify-center h-full w-full  z-50  ${
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
          {`BioVerse is on CORE DAO, to interact you can get CORE DAO’s Testnet from `}
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

      <div className="flex flex-col relative min-h-screen h-auto w-full items-center bg-black p-2">
        <div className="absolute top-0 ">
          {isVisible && (
            <h1 className="w-fit mx-auto text-white ">Countdown: {counter}</h1>
          )}
          <img
            className="w-[329px] h-[200px] object-cover"
            src="https://i.imgur.com/EscV7Lz.png"
            alt=""
          />
        </div>

        <div className="flex w-full">
          <div
            style={{ fontFamily: "Lexend" }}
            className="flex w-[20%] px-4 py-5 gap-[19px] flex-col"
          >
            <div className="w-[145px] relative  h-[10.375rem] overflow-hidden ">
              <img
                className="w-full object-cover h-auto"
                src={"https://i.imgur.com/x4Q9p7a.png"}
                alt=""
              />
            </div>
            <div className="w-[145px] relative  h-[10.375rem] overflow-hidden ">
              <img
                className="w-full object-cover h-auto"
                src={
                  totalEntriesAI > 1
                    ? "https://i.imgur.com/7pAF2IW.png"
                    : "https://i.imgur.com/O7ejp6m.png"
                }
                alt=""
              />
            </div>
            <div className="w-[145px] relative  h-[10.375rem] overflow-hidden ">
              <img
                className="w-full object-cover h-auto"
                src={
                  totalEntriesAI > 2
                    ? "https://i.imgur.com/fO1bPJN.png"
                    : "https://i.imgur.com/O7ejp6m.png"
                }
                alt=""
              />
            </div>
          </div>
          <div className="flex w-[60%] flex-col justify-center items-center">
            {showText && isVisible ? (
              <h1 className="text-white"> {word}</h1>
            ) : (
              ""
            )}
            {showThree ? (
              <div className="grid mt-14 grid-cols-3 gap-5">
                {threeImg.map((imageUrl, index) => (
                  <img
                    onClick={async () => {
                      await VoteAI(index);
                      setShowThree(false);
                      setShowWinner(true);
                      setCounter(0)
                    }}
                    className="w-[200px] cursor-pointer hover:scale-105 transition-all duration-200 h-auto object-cover"
                    key={index}
                    src={imageUrl}
                    alt={`Image ${index}`}
                  />
                ))}
              </div>
            ) : (
              ""
            )}
            {showWinner ? (
              <div className="w-full flex items-center justify-center">
                {currentAccount ===
                "0x83A42Ff1F166f4ee2A869f0AAC74A23Ff7E5D6c4" ? (
                  <div className="mt-10 flex flex-col">
                   
                   
                    <img
                      className="w-[300px] mt-40 h-[300px] object-cover"
                      src="https://c.tenor.com/X73qwZxReB0AAAAC/tenor.gif"
                      alt=""
                    /> <h1 className="mt-4 text-[1.9rem] text-white">  Congrats You won 0.002 ETH</h1>
                  </div>
                ) : (
                  <div className="mt-10">
                   
                    <img
                      className="w-[300px] mt-5 h-[300px] object-cover"
                      src="https://media.tenor.com/U8K81ilVba4AAAAM/ok-well-done-sports.gif"
                      alt=""
                      />
                      <h1 className="mt-4 text-[1.9rem] text-white">  Better Luck Next Time</h1>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex w-[20%] py-5 px-2 gap-7 flex-col items-center">
            <div
              style={{ fontFamily: "Lexend" }}
              className="w-[130px] p-1  relative rounded-[5px] flex items-center flex-col  justify-center
             bg-[#ff0000] h-[2.5rem] overflow-hidden text-center text-[1.125rem] text-white font-lexend"
            >
              <div className=" font-medium">EXIT GAME</div>
              <div className=" w-[1rem] h-[0.438rem] overflow-hidden" />
            </div>

            <div
              style={{ fontFamily: "Lexend" }}
              className="w-[130px] p-1 relative rounded-[5px] justify-center flex items-center bg-[#0085ff] h-[2.5rem] overflow-hidden text-center text-[1.125rem] text-white font-lexend"
            >
              <div className=" font-medium">INVITE</div>
              <div className=" w-[1rem] h-[0.438rem] overflow-hidden" />
            </div>
          </div>
        </div>

        <div
          style={{ fontFamily: "Lexend" }}
          className="w-[780px] flex gap-5 justify-between mx-auto p-1 relative rounded-lg bg-white h-[3.188rem] overflow-hidden text-center text-[0.938rem] text-black font-lexend"
        >
          <input
            value={prompt}
            onChange={handleChangePrompt}
            placeholder="Make anything that you can imagine"
            style={{ fontFamily: "Lexend" }}
            type="text"
            className="w-[550px] border-none focus:border-none outline-none text-[0.938rem] font-lexend text-gray text-center inline-block"
            name=""
            id=""
          />

          <div
            onClick={async () => {
              setSpin(true);
              await handleImageGen();
              await UploadPicUrl(imageFile);
              setCounter(20);
              setShowThree(true);

              setSpin(false);
            }}
            style={{ fontFamily: "Lexend" }}
            className="w-[130px] flex items-center justify-center my-auto relative rounded-[5px] bg-[#ff9500] h-[2.5rem] overflow-hidden text-center text-[0.938rem] text-black font-lexend"
          >
            <div className="">Generate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiGame;

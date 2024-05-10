import { Context } from "../context/ContextProvider";
import React, { useState, useContext, useEffect } from "react";
import CommentData from "./CommentData";
import Alert from "@mui/material/Alert";

const PostCard = (props) => {
  const {
    likePost,
    getUserData,
    getUserComment,
    addComments,
    userList,
    tipUser,
  } = useContext(Context);

  const [likess, setLikess] = useState(0);
  const [userData, setUserData] = useState([]);
  const [commentModal, setCommentModal] = useState(false);
  const [tipModal, setTipModal] = useState(false);
  const [commentArray, setCommentArray] = useState([]);
  const [inputComment, setInputComment] = useState("");
  const [tipCoin, setTipCoin] = useState(1);
  const [spin, setSpin] = useState(false);
  const [image1, setImage1] = useState({
    main: "https://i.imgur.com/2ksquEu.png",
    alternate:
      "https://cdn.discordapp.com/attachments/1184864067295395960/1185693981800149102/image.png?ex=65908a92&is=657e1592&hm=6932cde68b59daabb1f360bbad1d341547b721343003999b85bb19d5ac546ff8&",
  });
  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const [successAlertContent, setSuccessAlertContent] = useState("");
  const [isAlertInfo, setIsAlertInfo] = useState(false);

  function handleTextComment(e) {
    setInputComment(e.target.value);
    console.log(inputComment);
  }
  function handleTipCoin(e) {
    setTipCoin(e.target.value);
  }

  const showSuccessPopup = (successMessage) => {
    console.log("ShowSuccess", successMessage);
    setSuccessAlertContent(successMessage);
    setIsAlertSuccess(true);
    setTimeout(() => {
      setIsAlertSuccess(false);
    }, 5000);
  };

  console.log("yoyo index", props);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserData(props.keys);
      const c = await getUserComment(props.index);

      const commentArr = [];

      // Loop through the comments received and prepare data for display
      for (const key in c) {
        if (Object.hasOwnProperty.call(c, key)) {
          commentArr.push(c[key]); // Assuming comments are in the form of an array or object
        }
      }
      console.log("commentArr", commentArr);

      setCommentArray(commentArr);
      setUserData(user);
      setLikess(props.like);
    };
    fetchData();
  }, [props.key, props.keys, props.like, props.index]);

  return (
    <div className="flex items-center justify-center">
      <div className=" flex mt-4 h-[33.635rem] w-[36.188rem] hover:bg-[#3B3939]  rounded-lg transition-all duration-700 ease-in-out ">
        {/* alert success */}
        <div
          className={`absolute z-20 ml-[8rem] mb-12 ${
            isAlertSuccess ? "flex" : "hidden"
          }`}
        >
          <Alert severity="success">{successAlertContent}</Alert>
        </div>
        {/* alert success end */}
        {/* alert info */}
        <div
          className={`absolute z-20 ml-[8rem] mb-12 ${
            isAlertInfo ? "flex" : "hidden"
          }`}
        >
          <Alert severity="info">Waiting for Metamask...</Alert>
        </div>
        {/* alert info end */}
        {/* spinner */}
        <div
          className={` absolute right-[2.3rem]  items-center justify-center h-full w-full  z-50  ${
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
        <div className="flex-col min-w-[31.938rem]">
          <div className="relative flex p-4 m-4 w-full h-[2.25rem] text-left text-[1rem] text-white font-inter">
            <div className="relative  flex first-letter top-[-0.5rem] left-[1.75rem] font-medium">
              {userData ? userData[0] : "null"}
              <div className="relative ml-3 text-[0.88rem] text-colours-gray-500">
                @{userData ? userData[1] : "null"}.dso
              </div>
            </div>
            <img
              alt="s"
              src={userData ? userData[2] : "NULL"}
              className="absolute top-[0rem] left-[0rem] rounded-[69px] bg-white w-[2.25rem] h-[2.25rem] overflow-hidden"
            />
          </div>
          <div className="relative text-[0.88rem] font-inter text-white text-left bottom-6 left-[1.7rem] mt-9">
            {props.desc}
            {/* {props.hash? props.name.split(",").map((item) => `#${item.trim()}`)
              : ""} */}
          </div>
          <div className="h-[25.2rem] w-[28.388rem] relative left-6 bottom-3 ">
            <img
              className="object-fill h-full w-full"
              src={props.post}
              alt=""
            />
          </div>
        </div>

        <div className="relative w-full flex flex-col items-start justify-start gap-[2.31rem] top-6 right-2">
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
            className="relative rounded-16xl w-[3.25rem] h-[3.25rem] overflow-hidden shrink-0"
            alt=""
            src={image1.main}
          />
          <div
            onClick={async () => {
              await likePost(
                props.index,
                setSpin,
                showSuccessPopup,
                setIsAlertInfo
              );

              setLikess(likess + 1);
            }}
            className="relative bottom-2 h-[6rem]"
          >
            <span className="text-white h-fit w-fit  p-5 rounded-full relative left-0 top-[4.6rem] z-10 ">
              {" "}
              {likess}{" "}
            </span>
            <img
              className="relative rounded-16xl w-[52px] h-[94px] overflow-hidden shrink-0"
              alt=""
              src="https://i.imgur.com/49oV4MO.png"
            />
          </div>
          <img
            onClick={() => {
              setCommentModal((prev) => !prev);
            }}
            className="relative rounded-16xl w-[3.25rem] h-[3.25rem] overflow-hidden shrink-0"
            alt="comment"
            src="https://i.imgur.com/9bUWJkC.png"
          />
          <img
            className="relative rounded-16xl w-[3.25rem] h-[3.25rem] overflow-hidden shrink-0"
            alt="share"
            src="https://i.imgur.com/DQj9qV1.png"
          />
          <img
            onClick={() => {
              setTipModal((prev) => prev + 1);
            }}
            className="relative rounded-16xl hover:scale-105 hover:animate-bounce w-[3.25rem] h-[3.25rem] overflow-hidden shrink-0"
            alt="tip"
            src="https://i.imgur.com/sdS4VIe.png"
          />
        </div>
        {/* comment modal  */}
        <div
          className={`  left-0 top-0 w-[97%] h-[110%] z-10 backdrop-filter backdrop-blur-sm ${
            commentModal ? "absolute flex " : "hidden"
          }`}
        >
          <div
            className={`bg-gray-500 p-5 text-white rounded-lg ${
              commentModal
                ? "absolute flex flex-col translate-y-[-3rem] transition-all ease-in-out duration-700"
                : "hidden"
            } left-[12rem] top-[11rem] z-50 h-[20rem] w-[20rem]`}
          >
            <div
              className="p-1 hover:scale-105 hover:opacity-90 h-fit w-fit"
              onClick={() => {
                setCommentModal((prev) => !prev);
              }}
            >
              <img
                className="h-[1rem] cursor-pointer ml-[16rem] mb-1
     w-fit"
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184480958360076439/image.png?ex=658c20db&is=6579abdb&hm=c246e426d10817641944ad7b6a197d1f2f68d8b0c82aced7a97222e7e40e0f5e&"
                alt=""
              />
            </div>
            <div className="flex flex-col overflow-y-scroll h-[70%] w-full">
              <div className="mb-3">Comments</div>
              <div className="flex flex-col  ">
                {commentArray.map((comment, index) => (
                  <CommentData comment={comment} />
                  // Assuming CommentData component takes 'comment' as prop and 'commentKeys[index]' as key
                ))}
              </div>
            </div>

            <div className="flex relative left-[0rem] mt-4 top-[0rem]">
              <div className=" rounded-full w-[90%] h-[3rem] text-black font-inter">
                <input
                  className="rounded-full"
                  onChange={handleTextComment}
                  type="text"
                  title="Comment"
                  name=""
                  id=""
                />
              </div>
              <div
                onClick={async () => {
                  console.log("inputted text", inputComment);
                  await addComments(
                    props.index,
                    inputComment,
                    setSpin,
                    showSuccessPopup,
                    setIsAlertInfo
                  );
                }}
                className="h-3 ml-0  w-auto"
              >
                <img
                  className="cursor-pointer hover:scale-95"
                  src="https://cdn.discordapp.com/attachments/1184864067295395960/1185117527773290557/image.png?ex=658e71b5&is=657bfcb5&hm=8703d45a152f13c3ae80bd8efd1135d1174ceaf20df014cd11c89052a20f1bba&"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* comment modal end */}

        {/* tip user modal */}
        <div
          className={`  left-0 top-0 w-[97%] h-[110%] z-10 backdrop-filter backdrop-blur-sm ${
            tipModal ? "absolute flex " : "hidden"
          }`}
        >
          <div
            className={`bg-gray-500 p-5 text-white rounded-lg ${
              tipModal
                ? "absolute flex flex-col translate-y-[-3rem] transition-all ease-in-out duration-700"
                : "hidden"
            } left-[12rem] top-[11rem] z-50 h-[20rem] w-[20rem]`}
          >
            <div
              className="p-1 hover:scale-105 hover:opacity-90 h-fit w-fit"
              onClick={() => {
                setTipModal((prev) => !prev);
              }}
            >
              <img
                className="h-[1rem] cursor-pointer ml-[16rem] mb-1
     w-fit"
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184480958360076439/image.png?ex=658c20db&is=6579abdb&hm=c246e426d10817641944ad7b6a197d1f2f68d8b0c82aced7a97222e7e40e0f5e&"
                alt=""
              />
            </div>
            <div className="flex flex-col  h-[70%] w-full">
              <div className="my-3 font-inter ">Tip User</div>
              <div className="flex flex-col  ">
                <label htmlFor="">Enter Number of Coins:</label>
                <input
                  onChange={handleTipCoin}
                  className="p-3 text-center my-4 rounded-full text-black"
                  min="1"
                  step="1"
                  max="15"
                  type="number"
                  placeholder="1"
                  name=""
                  id=""
                />

                <div className="relative mx-auto hover:scale-105 hover:opacity-90 mt-7 rounded-[97px] bg-cornflowerblue box-border w-[6rem] h-[2.46rem] overflow-hidden text-left text-[1.13rem] text-white font-inter border-t-[1px] border-solid border-lightskyblue border-r-[1px] border-l-[1px]">
                  <div
                    onClick={async () => {
                      await tipUser(
                        props.keys,
                        tipCoin,
                        setSpin,
                        showSuccessPopup,
                        setIsAlertInfo
                      );
                    }}
                    className="absolute top-[0.38rem] left-[1.99rem] font-semibold"
                  >
                    Tip
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* tip user modal end */}
      </div>
    </div>
  );
};

export default PostCard;

// import { Context } from "../context/ContextProvider";
// import React, { useState, useContext, useEffect } from "react";

// const PostCard = (props) => {
//   const {checkIfWalletIsConnected,ConnectWallet, currentAccount, isNewUser ,createUser,createPost,likePost,getUserData,userPost} =
//     useContext(Context);
//   const [likess, setLikess] = useState(0);

//   return (
//     <div className="flex items-center justify-center">
//       <div className=" flex mt-4 h-[33.635rem] w-[36.188rem] hover:bg-[#3B3939]  rounded-lg transition-all duration-700 ease-in-out ">
//         <div className="flex-col min-w-[31.938rem]">
//           <div className="relative p-4 m-4 w-full h-[2.25rem] text-left text-[1rem] text-white font-inter">
//             <div className="absolute top-[0.56rem] left-[2.75rem] font-medium">
//               Amit Sinha
//             </div>
//             <div className="absolute top-[0.56rem] left-[8.25rem] text-[0.88rem] text-colours-gray-500">
//               @amitsinha.dso
//             </div>
//             <img
//               alt="s"
//               src="https://i.imgur.com/DIdPWfs.png"
//               className="absolute top-[0rem] left-[0rem] rounded-[69px] bg-white w-[2.25rem] h-[2.25rem] overflow-hidden"
//             />
//           </div>
//           <div className="relative text-[0.88rem] font-inter text-white text-left bottom-6 left-[1.7rem] mt-9">
//             Tried these thumbnails with a sporty aesthetic
//           </div>
//         <div className="h-[25.2rem] w-[28.388rem] relative left-6 bottom-3 ">
//             <img className="object-fill h-full w-full" src="https://cdn.discordapp.com/attachments/1177493315898314792/1184102145243492413/image.png?ex=658ac00e&is=65784b0e&hm=51289aecb3eafd78c0430b1b08626acc15b2721e93685435e0585c392c9ccd1e&" alt="" />

//         </div>
//         </div>

//         <div className="relative w-full flex flex-col items-start justify-start gap-[2.31rem] top-6 right-2">
// <img className="relative rounded-16xl w-[3.25rem] h-[3.25rem] overflow-hidden shrink-0" alt="" src="https://cdn.discordapp.com/attachments/1177493315898314792/1184073513712238652/image.png?ex=658aa564&is=65783064&hm=9a2d01e125d34e2b059be14b2801a8664f4f64f0186ebc4bffc04d60157d8eb0&" />
// <img  onClick={async()=>{
//               await likePost('postId');

//               alert('2 Tokens deducted from your account');
//               setLikess(likess+1);

//             }} className="relative rounded-16xl w-[3.25rem] h-[3.25rem] overflow-hidden shrink-0" alt="" src="https://cdn.discordapp.com/attachments/1177493315898314792/1184073624966148096/image.png?ex=658aa57f&is=6578307f&hm=bd092fc2643aaf8cd2c5fc0a8455c9ff96626caec4fb4e831d00385529af1179&" />
// <img className="relative rounded-16xl w-[3.25rem] h-[3.25rem] overflow-hidden shrink-0" alt="" src="https://cdn.discordapp.com/attachments/1177493315898314792/1184073701864509470/image.png?ex=658aa591&is=65783091&hm=5200cf8850db9ca96a4138b7dd7b371423ce96da44a53ad308363712b5b0f156&" />
// <img className="relative rounded-16xl w-[3.25rem] h-[3.25rem] overflow-hidden shrink-0" alt="" src="https://i.imgur.com/9bUWJkC.png" />
// <img className="relative rounded-16xl w-[3.25rem] h-[3.25rem] overflow-hidden shrink-0" alt="" src="https://i.imgur.com/DQj9qV1.png" />
// <img className="relative rounded-16xl w-[3.25rem] h-[3.25rem] overflow-hidden shrink-0" alt="" src="https://i.imgur.com/sdS4VIe.png" />

// </div>
//       </div>
//     </div>
//   );
// };

// export default PostCard;

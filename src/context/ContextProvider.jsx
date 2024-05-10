import React, { useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { contractABI1, contractAddress1 } from "../utils/crowdConstant";
import { contractABI2, contractAddress2 } from "../utils/AiPlatform";

export const Context = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const socoinContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  console.log("ethereum", ethereum);
  console.log(contractABI, contractAddress);
  console.log("signer", signer);
  console.log("provider", provider);
  console.log("Contract", socoinContract);
  return socoinContract;
};
const getEthereumContract1 = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const crowdfundingContract = new ethers.Contract(
    contractAddress1,
    contractABI1,
    signer
  );
  //  console.log("signer",signer);
  // console.log("provider",provider);
  // console.log("crowdfundingContract",crowdfundingContract);
  return crowdfundingContract;
};
const getEthereumContract2 = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  // window.ethereum.request({
  //   method: "wallet_addEthereumChain",
  //   params: [
  //     {
  //       chainId: "0x1115",
  //       rpcUrls: ["https://rpc.test.btcs.network/"],
  //       chainName: "Core Chain TestNet",
  //       nativeCurrency: {
  //         name: "tCORE",
  //         symbol: "tCORE",
  //         decimals: 18,
  //       },
  //       blockExplorerUrls: ["https://scan.test.btcs.network/"],
  //     },
  //   ],
  // });
  const signer = provider.getSigner();
  const crowdfundingContract = new ethers.Contract(
    contractAddress2,
    contractABI2,
    signer
  );
  //  console.log("signer",signer);
  // console.log("provider",provider);
  // console.log("crowdfundingContract",crowdfundingContract);
  return crowdfundingContract;
};

export const SocoinProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [userDatar, setUserDatar] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [numRequests, setNumRequests] = useState(0);
  const [requests, setRequests] = useState([{}]);
  const [personalBal, setPersonalBal] = useState(0);
  const [manager, setManager] = useState("a");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [hexTimeRemaining, setHexTimeRemaining] = useState(0);
  const [properTime, setProperTime] = useState("");
  const [noOfContributors, setNoOfContributors] = useState(0);
  const [totalEntriesAI, setTotalEntriesAI] = useState(0);
  const [scoreBoard, setScoreBoard] = useState(0);
  const [showText, setShowText] = useState(false);
  const [countdownDuration, setCountdownDuration] = useState(90); // Initial countdown duration


  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        setCurrentAccount("");
        console.log("No account found");
      }
      console.log("Connected account: ", currentAccount);
    } catch (error) {
      console.log(error);
    }
  };

  const ConnectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]).then(
        console.log(
          "Connected account: connected in connectWallet ",
          currentAccount
        )
      );

      // const contracts = getEthereumContract();
      // console.log("Current account under connect wallet",currentAccount);
      // const userData = await contracts.user_data(currentAccount);
      // console.log("userData",userData);
    } catch (error) {
      console.log(error);
    }
  };

  // aiplatform
  const JoinRoom = async () => {
    // val,success,errors
    try {
      const val = 0.001;
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract2();
      const valInWei = ethers.utils.parseUnits(val.toString(), "ether");
      // console.log("valInWei", valInWei);
      const tx = await contract.joinRoom({
        value: valInWei,
        // gasLimit: 99000,
      });
      await tx.wait();

      console.log("tx", tx);
      // success(`Balance of ${val} ETH added successfully`);
    } catch (error) {
      try {
        // errors(error.error && error.error.message ? error.error.message : error.message);
      } catch (error) {
        // errors('User decline the transaction')
      }
      console.log(error);
      // throw new Error("Error in sending eth");
    }
  };

  const UploadPicUrl = async (url) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract2();
      // console.log("valInWei", valInWei);
      const tx = await contract.uploadPicUrl(url);
      await tx.wait();

      console.log("tx", tx);
      // success(`Balance of ${val} ETH added successfully`);
    } catch (error) {
      try {
        // errors(error.error && error.error.message ? error.error.message : error.message);
      } catch (error) {
        // errors('User decline the transaction')
      }
      console.log(error);
      // throw new Error("Error in sending eth");
    }
  };

  const VoteAI = async (num) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract2();
      // console.log("valInWei", valInWei);
      const tx = await contract.vote(num);
      await tx.wait();

      console.log("tx", tx);
      // success(`Balance of ${val} ETH added successfully`);
    } catch (error) {
      try {
        // errors(error.error && error.error.message ? error.error.message : error.message);
      } catch (error) {
        // errors('User decline the transaction')
      }
      console.log(error);
      // throw new Error("Error in sending eth");
    }
  };

  // getters
  const isStarted = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract2();
      // console.log("valInWei", valInWei);
      const tx = await contract.gameStarted();

      // console.log("tx", tx);
      return tx;
      // success(`Balance of ${val} ETH added successfully`);
    } catch (error) {
      try {
        // errors(error.error && error.error.message ? error.error.message : error.message);
      } catch (error) {
        // errors('User decline the transaction')
      }
      console.log(error);
      // throw new Error("Error in sending eth");
    }
  };
  const isJoined = async (addr) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract2();
      // console.log("valInWei", valInWei);
      const tx = await contract.joinedMembers(addr);

      console.log("tx", tx);
      // success(`Balance of ${val} ETH added successfully`);
    } catch (error) {
      try {
        // errors(error.error && error.error.message ? error.error.message : error.message);
      } catch (error) {
        // errors('User decline the transaction')
      }
      console.log(error);
      // throw new Error("Error in sending eth");
    }
  };

  const LeaderboardData = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract2();
      // console.log("valInWei", valInWei);
      const tx = await contract.getLeaderboardData();
      setScoreBoard(Number(tx));

      // console.log("tx", tx);
      // success(`Balance of ${val} ETH added successfully`);
    } catch (error) {
      try {
        // errors(error.error && error.error.message ? error.error.message : error.message);
      } catch (error) {
        // errors('User decline the transaction')
      }
      console.log(error);
      // throw new Error("Error in sending eth");
    }
  };

  const TotalEntries = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract2();
      // console.log("valInWei", valInWei);
      const tx = await contract.totalEntries();
      setTotalEntriesAI(Number(tx));

      // console.log("tx", tx);
      // success(`Balance of ${val} ETH added successfully`);
    } catch (error) {
      try {
        // errors(error.error && error.error.message ? error.error.message : error.message);
      } catch (error) {
        // errors('User decline the transaction')
      }
      console.log(error);
      // throw new Error("Error in sending eth");
    }
  };

  // aiplatform end

  // crowdfunding
  const [formData, setFormData] = useState({
    cause: "",
    recipientName: "",
    description: "",
    recipient: "",
    value: "",
    imgURL: "",
  });

  const handleSubmit = async (event, success, errors) => {
    event.preventDefault();
    console.log("clicked");
    console.log("Form Data:", formData);
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract1();
      const transaction = await contract.createRequests(
        formData.cause,
        formData.recipientName,
        formData.description,
        formData.recipient,
        formData.value,
        formData.imgURL
      );
      await transaction.wait();
      await getNumRequests();
      await getRequests();
      console.log("transaction", transaction);
      success("Request created successfully");
    } catch (error) {
      try {
        errors(error.message);
      } catch (ee) {
        errors("User decline the transaction");
      }
      console.log(error);
      // throw new Error("Error in creating request");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("Form Data:", formData);
  };

  const getMinContrib = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const contracts = getEthereumContract1();
      const minContribution = await contracts.minContribution();
      const minContributionNumber = minContribution.toNumber();
      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      console.log(error);
      throw new Error("Error in getting min contribution");
    }
  };

  const getManager = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract1();
      const manager = await contract.manager();
      //   console.log("manager", manager);
      setManager(manager.toLowerCase());
    } catch (error) {
      console.log(error);
    }
  };

  const getRequests = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getEthereumContract1();
      const updatedRequests = [];
      // await getNumRequests();
      // console.log("from getRequest numRequests", numRequests);

      for (let i = 0; i < numRequests; i++) {
        // console.log("i",i,"NumRequests",numRequests);
        const request = await contract.requests(i);
        await request;
        const convertedRequest = {
          ...request,
          [3]: request[3].toNumber(),
          [5]: request[5].toNumber(),
        };

        updatedRequests.push(convertedRequest);
      }
      console.log("updatedRequests", updatedRequests);

      setRequests(updatedRequests);
      localStorage.setItem("request", JSON.stringify(requests));
      console.log("requests", updatedRequests);
    } catch (error) {
      console.log(error);
      throw new Error("Error in getting requests");
    }
  };

  const getNumRequests = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract1();
      const numRequests = await contract.numRequests();
      const numRequestsNumber = numRequests.toNumber();
      // console.log("numRequestsNumber from its function", numRequestsNumber);
      setNumRequests(Number(numRequestsNumber));
      // console.log("numRequests from its function", numRequestsNumber);
    } catch (error) {
      console.log(error);
    }
  };

  const sendETH = async (val, success, errors) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract1();
      const valInWei = ethers.utils.parseUnits(val.toString(), "wei");
      // console.log("valInWei", valInWei);
      const tx = await contract.sendEth({
        value: valInWei._hex,
        gasLimit: 99000,
      });
      await tx.wait();
      await personalBalance();
      await getNoOfContributors();
      console.log("tx", tx);
      success(`Balance of ${val} ETH added successfully`);
    } catch (error) {
      try {
        errors(
          error.error && error.error.message
            ? error.error.message
            : error.message
        );
      } catch (error) {
        errors("User decline the transaction");
      }
      console.log(error);
      // throw new Error("Error in sending eth");
    }
  };

  const personalBalance = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract1();
      // console.log("currentAccount",currentAccount);
      // console.log("currentAccount", currentAccount);
      const balance = await contract.contributors(currentAccount);
      const balanceNumber = balance.toNumber();
      // console.log("balanceNumber",balance);
      setPersonalBal(Number(balanceNumber));
    } catch (error) {
      console.log(error);
      // throw new Error("Error in getting personal balance");
    }
  };

  const extendDeadline = async (num, success, errors) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract1();
      const dayInBlockTime = num * 24 * 60 * 60;
      const tx = await contract.updateDeadline(dayInBlockTime);
      await tx.wait();
      console.log("tx", tx);
      success(`Deadline extended by ${num} `);
      calculateTimeLeft();
    } catch (error) {
      try {
        errors(error.error.message);
      } catch (r) {
        errors("User decline the transaction");
      }

      console.log(error);
    }
  };

  function convertTimestampToDHMS(timestamp) {
    const days = Math.floor(timestamp / (60 * 60 * 24));
    // const hours = Math.floor((timestamp % (60 * 60 * 24)) / (60 * 60));
    // const minutes = Math.floor((timestamp % (60 * 60)) / 60);
    // const seconds = Math.floor(timestamp % 60);

    return days;
  }

  function ogConvertTimestampToDHMS(timestamp) {
    const days = Math.floor(timestamp / (60 * 60 * 24));
    const hours = Math.floor((timestamp % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timestamp % (60 * 60)) / 60);
    const seconds = Math.floor(timestamp % 60);

    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
  }

  const calculateTimeLeft = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract1();

      const deadline = await contract.deadline();
      const deadlineNumber = deadline.toNumber();
      //   console.log("deadlineNumber", deadlineNumber);
      const currentTime = await contract.currentTime();
      const currentTimeNumber = currentTime.toNumber();
      // console.log("currentTimeNumber", currentTimeNumber);
      const timeLeft = deadlineNumber - currentTimeNumber;
      // console.log("timeLeft", timeLeft);
      setProperTime(ogConvertTimestampToDHMS(timeLeft));
      setHexTimeRemaining(timeLeft);
      //  setTimeRemaining(Number(convertTimestampToDHMS(timeLeft)));

      //   console.log("HexTimeRemaining", hexTimeRemaining);
      //   console.log("TimeRemaining", timeRemaining);
    } catch (error) {}
  };

  const getNoOfContributors = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const contract = getEthereumContract1();
      const noOfContributors = await contract.noOfContributors();
      const noOfContributorsNumber = noOfContributors.toNumber();
      // console.log("noOfContributorsNumber", noOfContributorsNumber);
      setNoOfContributors(Number(noOfContributorsNumber));
    } catch (error) {
      console.log(error);
    }
  };

  const vote = async (index, success, errorr) => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getEthereumContract1();
      const tx = await contract.voteRequest(index);
      await tx.wait();
      await getNumRequests();
      await getRequests();
      console.log("tx", tx);
      success("Voted successfully");
    } catch (error) {
      try {
        errorr(error.error.message);
      } catch (r) {
        errorr("User decline the transaction");
      }
    }
  };

  const Voters = async (index, account) => {
    // try {
    //   if (!ethereum) return alert("Please install MetaMask");
    //   const contract = getEthereumContract();
    //   const request = await contract.requests(index).voters('0xAabf644A3549067D0CFE103aFD9B0cFD8b1fc626');
    //   // Check if the account exists in the voters mapping
    //   console.log("request",request);
    //   // const isVoter =request.voters[account];
    //   // console.log("isVoter", isVoter);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const makePayment = async (index, success, errorr) => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const contract = getEthereumContract1();
      const tx = await contract.makePayment(index);
      await tx.wait();
      await getNumRequests();
      await getRequests();

      console.log("tx", tx);
      success("Payment made successfully");
    } catch (error) {
      try {
        errorr(error.error.message);
      } catch (r) {
        errorr("User decline the transaction");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await checkIfWalletIsConnected();
        await getNumRequests();
        await calculateTimeLeft();
        await getNoOfContributors();

        await personalBalance();

        // await personalBalance();
        await getRequests();
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (hexTimeRemaining > 0) {
        setHexTimeRemaining(hexTimeRemaining - 1);
        setProperTime(ogConvertTimestampToDHMS(hexTimeRemaining));
        setTimeRemaining(Number(convertTimestampToDHMS(hexTimeRemaining)));
        await checkIfWalletIsConnected();
        try {
          personalBalance();
        } catch (error) {
          console.error("Error in fetchData:", error);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [hexTimeRemaining]);

  useEffect(() => {
    const interval = async () => {
      await getNumRequests();
      await getRequests();
      await checkIfWalletIsConnected();
      await personalBalance();
      await getManager();
      await calculateTimeLeft();
      await getNoOfContributors();
    };
    interval();
  }, [numRequests]);

  // crowdfunding end

  const isNewUser = async () => {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");

      const contracts = getEthereumContract();
      console.log("contract", contracts);

      if (currentAccount == "") {
        console.log("no account found");
        await ConnectWallet();
      }

      const iNewUser = await contracts.user_data(currentAccount);
      console.log("isNewUser", iNewUser);
      return 1;
      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      console.log("error in isnewuser", error);
      return 0;
    }
  };
  // string memory _name,string memory _username,string memory _interest,uint _user_id,string memory _profile
  async function createUser(obj, _spin, _successMessage, _infoMessage) {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");

      const contracts = getEthereumContract();
      _spin(true);
      _infoMessage(true);
      const createdUser = await contracts.createUser(
        obj.name,
        obj.username,
        obj.interests,
        1,
        obj.url
      );
      await createdUser.wait();

      _spin(false);
      _infoMessage(false);
      console.log("createdUser", createdUser);
      _successMessage(`Successfully created the user`);
      // console.log("minContribution",minContributionNumber);
      setRefresh((p) => p + 1);
    } catch (error) {
      _spin(false);
      _infoMessage(false);
      console.log(error);
      console.log("error in create user");
    }
  }

  async function userPost() {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");

      const contracts = getEthereumContract();
      // const userPost = await contracts.userPost(utils.getAddress(currentAccount,1));
      // console.log("userPost",userPost);
      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      console.log(error);
    }
  }

  // string memory _img,uint256 _postId,string memory _description,string memory _hashtag
  async function createPost(props, _spin, _successMessage, _infoMessage) {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");

      const contracts = getEthereumContract();
      _spin(true);
      _infoMessage(true);
      const createdPost = await contracts.createPost(
        props.file,
        1,
        props.description,
        props.hash
      );
      await createdPost.wait();
      _spin(false);
      _infoMessage(false);
      _successMessage(
        `Successfully created the post. 15 coins has been deducted`
      );
      setRefresh((p) => p + 1);

      console.log("createdPost", createdPost);
      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      props.countFunc((prev) => {
        return prev + 1;
      });
      _spin(false);
      _infoMessage(false);

      console.log(error);
    }
  }

  // string memory _img,string memory _description,uint _price,string memory _hash
  async function createPrivatePost(
    props,
    _spin,
    _successMessage,
    _infoMessage
  ) {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");

      const contracts = getEthereumContract();
      _spin(true);
      _infoMessage(true);
      const createdPost = await contracts.createPrivatePost(
        props.file,
        props.description,
        props.coin,
        props.hash
      );
      await createdPost.wait();
      console.log("createdPost", createdPost);
      _spin(false);
      _infoMessage(false);
      _successMessage(
        `Successfully created the post. 50 coins has been deducted`
      );
      setRefresh((p) => p + 1);

      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      props.countFunc((prev) => {
        return prev + 1;
      });
      _spin(false);
      _infoMessage(false);

      console.log(error);
    }
  }

  async function likePost(_postId, _spin, _successMessage, _infoMessage) {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");

      const contracts = getEthereumContract();
      _spin(true);
      _infoMessage(true);

      const likedPost = await contracts.like(_postId);
      await likedPost.wait();

      console.log("likedPost", likedPost);
      _spin(false);
      _infoMessage(false);
      _successMessage(`Successfully Liked the post. 2 Coins has been deducted`);
      setRefresh((p) => p + 1);

      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      _spin(false);
      _infoMessage(false);
      console.log(error);
    }
  }

  async function getUserData(addr) {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");

      const contracts = getEthereumContract();
      let userDatas;
      if (currentAccount) {
        userDatas = await contracts.user_data(utils.getAddress(addr));

        console.log("userData", Number(userDatas.token));
        setUserDatar(userDatas);
        return userDatas;
      }

      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllPost() {
    try {
      if (!ethereum) return alert("Please install Metamask wallet");

      const contracts = getEthereumContract();
      let userDatas;
      if (currentAccount) {
        userDatas = await contracts.getAllPost();

        console.log("All post", userDatas);

        return userDatas;
      }

      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllPrivatePost() {
    try {
      if (!ethereum) return alert("Please install Metamask wallet");

      const contracts = getEthereumContract();
      let userDatas;
      if (currentAccount) {
        userDatas = await contracts.getAllPrivatePost();

        console.log("All private post", userDatas);

        return userDatas;
      }

      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserPost(addr) {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");

      const contracts = getEthereumContract();
      let userDatas;
      if (currentAccount) {
        userDatas = await contracts.getPublicPosts(utils.getAddress(addr));

        console.log("user's post", userDatas);

        return userDatas;
      }

      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserPrivatePost(addr) {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");

      const contracts = getEthereumContract();
      let userDatas;
      if (currentAccount) {
        userDatas = await contracts.getPrivatePosts(utils.getAddress(addr));

        console.log("user's private post", userDatas);

        return userDatas;
      }

      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      console.log(error);
    }
  }

  async function getRewardStatus(addr) {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");

      const contracts = getEthereumContract();
      let userDatas;
      if (currentAccount) {
        userDatas = await contracts.getRewardSuccess(utils.getAddress(addr));

        console.log("Reward score", userDatas);

        return userDatas;
      }

      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      console.log(error);
    }
  }

  async function addComments(
    _index,
    _text,
    _spin,
    _successMessage,
    _infoMessage
  ) {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");
      _spin(true);
      _infoMessage(true);

      const contracts = getEthereumContract();
      let userDatas;
      if (currentAccount) {
        userDatas = await contracts.addComment(_index, _text);
        await userDatas.wait();
        _spin(false);
        _infoMessage(false);
        console.log("add comment", userDatas);
        _successMessage(`Successfully added comment`);
        setRefresh((prev) => prev + 1);
      }

      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      _spin(false);
      _infoMessage(false);
      console.log(error);
    }
  }

  async function userList() {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");

      const contracts = getEthereumContract();
      let userDatas;
      if (currentAccount) {
        userDatas = await contracts.usernames(0, { gasLimit: 200000 });

        console.log("Username list", userDatas);
      }
      window.location.reload();

      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      console.log(error);
    }
  }

  async function tipUser(_to, _coin, _spin, _successMessage, _infoMessage) {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");
      _spin(true);
      _infoMessage(true);

      const contracts = getEthereumContract();
      let userDatas;
      if (currentAccount) {
        userDatas = await contracts.tip(utils.getAddress(_to), _coin);
        await userDatas.wait();
        _spin(false);
        _infoMessage(false);
        setRefresh((prev) => prev + 1);

        _successMessage(
          `Successfully tipped the post owner with ${_coin} coins`
        );
        console.log("Tip user status", userDatas);
      }

      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      _spin(false);
      _infoMessage(false);
      console.log(error);
    }
  }

  async function buyCoin(_coin, _spin, _successMessage, _infoMessage) {
    try {
      _spin(true);
      _infoMessage(true);
      if (!ethereum) return alert("Please install Phantom wallet");

      const contracts = getEthereumContract();
      let userDatas;
      if (currentAccount) {
        const total_eth = _coin * 10000000000000000;
        const valInWei = ethers.utils.parseUnits(total_eth.toString(), "wei");
        userDatas = await contracts.buyCoin(_coin, {
          value: valInWei._hex,
          gasLimit: 99000,
        });
        await userDatas.wait();
        _spin(false);
        _infoMessage(false);
        _successMessage(
          `You Successfully got ${_coin} coins by paying ${_coin * 0.01} eth`
        );
        setRefresh((prev) => prev + 1);
        console.log("buycoin status", userDatas);
      }
    } catch (error) {
      _spin(false);
      _infoMessage(false);
      console.log(error);
    }
  }

  async function withdrawCoins(_coin, _spin, _successMessage, _infoMessage) {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");

      const contracts = getEthereumContract();
      _spin(true);
      _infoMessage(true);
      let userDatas;
      if (currentAccount) {
        userDatas = await contracts.withdrawCoin(_coin);
        await userDatas.wait();
        // _coin*0.01

        console.log("withdraw status", userDatas);
        _spin(false);
        _infoMessage(false);
        _successMessage(
          `${_coin} coins has been withdrawn successfully, You recieved ${
            _coin * 0.01
          } eth`
        );
        setRefresh((prev) => prev + 1);
      }
    } catch (error) {
      _spin(false);
      _infoMessage(false);
      console.log(error);
    }
  }

  async function getUserComment(num) {
    try {
      if (!ethereum) return alert("Please install Phantom wallet");

      const contracts = getEthereumContract();
      let userDatas;
      if (currentAccount) {
        userDatas = await contracts.getComments(num);

        console.log("user's comment on post", num, "index", userDatas);

        return userDatas;
      }

      // console.log("minContribution",minContributionNumber);
    } catch (error) {
      console.log(error, "error in comment");
    }
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // await ConnectWallet();

  //     } catch (error) {
  //       console.error("Error in fetchData:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // event listener
  useEffect(() => {
    const contracts = getEthereumContract2();
    contracts.on("PlayerJoined", (playerAddress) => {
      console.log("PlayerJoined event emitted:", playerAddress);
      TotalEntries()
    });

    return () => {
      contracts.removeAllListeners("PlayerJoined");
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      
        const a = await isStarted();
        // console.log('a is',a)
        if (a) {
 
  setShowText(true);
  // console.log('tf showText is',showText)
  setCountdownDuration(90);
            clearInterval(interval); 
        }
    }, 1000); 

    
    return () => clearInterval(interval);
}, []);
  return (
    <Context.Provider
      value={{
        checkIfWalletIsConnected,
        ConnectWallet,
        currentAccount,
        isNewUser,
        createUser,
        createPost,
        likePost,
        getUserData,
        userPost,
        createPrivatePost,
        getEthereumContract,
        userDatar,
        addComments,
        getAllPost,
        refresh,
        setRefresh,
        getUserPost,
        getAllPrivatePost,
        getUserPrivatePost,
        getUserComment,
        getRewardStatus,
        userList,
        tipUser,
        buyCoin,
        withdrawCoins,
        getEthereumContract1,
        getMinContrib,
        getManager,
        handleInputChange,
        handleSubmit,
        numRequests,
        requests,
        sendETH,
        personalBal,
        personalBalance,
        extendDeadline,
        manager,
        hexTimeRemaining,
        timeRemaining,
        properTime,
        noOfContributors,
        getRequests,
        vote,
        Voters,
        getNumRequests,
        makePayment,
        TotalEntries,
        LeaderboardData,
        isStarted,
        VoteAI,
        UploadPicUrl,
        JoinRoom,
        isJoined,
        totalEntriesAI,
        scoreBoard,
        countdownDuration,
        showText,
      }}
    >
      {children}
    </Context.Provider>
  );
};

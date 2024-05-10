import React from "react";
import RepeatCompo1 from "./RepeatCompo1";
import axios from "axios";
import RepeatCompo2 from "./RepeatCompo2";
import { useNavigate } from 'react-router-dom';

const Ledger = () => {
  const [transactionsShiba, setTransactionsShiba] = React.useState([]);
  const [transactionsBinance, setTransactionsBinance] = React.useState([]);
  const [textBoxes1, setTextBoxes1] = React.useState([""]);

  const navigate = useNavigate();
  const binance = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"; // Replace this with the actual token contract address
  const shibaInu = "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE";
  const handleTextBoxChange1 = ( value) => {
   
    
    setTextBoxes1(value);
  };

  const handleNavigation = (walletAddress) => {
    navigate(`/profile/${walletAddress}`);
  };
  const handleSendAudio = () => {
   
      const formData = new FormData();
      formData.append("dex", textBoxes1);

      axios
        .post("http://127.0.0.1:5000/checkuser", formData, {
          // .post("http://127.0.0.1:5000/companyid", jsonData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data == '0') {
            handleNavigation(textBoxes1)
        }else{
        //   alert('User did not linked their Wallets')
        //   navigate('/input')
        }})
        
        .catch((error) => {
          console.error("Error uploading or receiving audio:", error);
        });
    
  };

  const fetchTokenTransactions = async (contract) => {
    try {
      const apiUrl = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${contract}&apikey=2MAHC8D4JRA1VQEEWJXDB4WDU7JC1BEHGG&&sort=desc&page=1&offset=15`;
      const response = await axios.get(apiUrl);
      console.log(response.data.result.length);
      return response.data.result;
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const binanceTransactions = await fetchTokenTransactions(binance);
      const shibaTransactions = await fetchTokenTransactions(shibaInu);

      setTransactionsBinance(binanceTransactions);
      setTransactionsShiba(shibaTransactions);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black w-full py-8">
      {/* title */}
      <div className="w-full text-start">
        <div className="w-[4.75rem] relative text-[0.875rem] p-2 m-3 font-semibold font-ibm-plex-mono text-white text-left inline-block">
          {` `}
        </div>
      </div>

      {/* search bar
       */}
      <div className="flex justify-center my-[65px] items-start ">
        <input
          placeholder="Search for  Wallet Address"
          className="w-[782px] relative box-border  h-[2.438rem] overflow-hidden text-left text-[0.875rem] bg-transparent text-white p-2 font-ibm-plex-mono border-[2px] border-solid border-[#2B73FF]"
          type="text"
          onChange={(e) => handleTextBoxChange1( e.target.value)}
          onSubmit={handleSendAudio}
          name=""
          id=""
        />
        <button onClick={handleSendAudio} className="text-white">Enter</button>
      </div>

      {/* main content
       */}
      <div className=" flex justify-center items-center gap-[51px]">
        {/* left part */}
        <div className="w-[540px] h-[600px] flex flex-col gap-[15px]">
          <div className="flex justify-center w-full items-center gap-10">
            <div className="w-[15.25rem] relative  text-[0.875rem] border-b-2 border-[#0057FF] font-ibm-plex-mono text-[#d2d2d2] text-left inline-block">{`All TRANSACTIONS  `}</div>

            <div className="w-[75px] ml-10 flex justify-center items-center relative rounded-[49px] bg-[#ffbefc] box-border h-[1.438rem] overflow-hidden text-left text-[0.625rem] text-[#90008a] font-ibm-plex-mono border-[1px] border-solid border-[#ff00f5]">
              <div className="w-fit text-[#90008a]  font-medium">All</div>
            </div>

            <div className="w-[97px] flex justify-center items-center relative rounded-[49px] bg-[#a1e9ff] box-border h-[1.438rem] overflow-hidden text-left text-[0.625rem] text-[#007194] font-ibm-plex-mono border-[1px] border-solid border-[#00c2ff]">
              <div className="text-[#007194] font-medium">Sort by time</div>
            </div>
          </div>
          {/* table */}
          <div className="w-full flex flex-col justify-start items-center p-5 relative rounded-lg bg-[#141720] box-border min-h-[14.188rem] overflow-hidden text-left text-[0.75rem] text-white font-ibm-plex-mono border-t-[1px] border-solid border-[#393939]">
            <div className="w-[6.313rem] relative text-[0.875rem] font-ibm-plex-mono text-white text-left inline-block">
              TRANSACTIONS
            </div>

            <div className="flex justify-between  ">
              <div className="w-[1.5rem] right-9 pl-[29px] relative text-[0.625rem] font-ibm-plex-mono text-white text-left inline-block">
                TIME
              </div>
              <div className="w-[1.5rem] left-9  pl-[31px] relative text-[0.625rem] font-ibm-plex-mono text-white text-left inline-block">
                FROM
              </div>
              <div className="w-[0.75rem] left-10 pl-[132px] relative text-[0.625rem] font-ibm-plex-mono text-white text-left inline-block">
                TO
              </div>
              <div className="w-[1.875rem] left-4 pl-[118px] relative text-[0.625rem] font-ibm-plex-mono text-white text-left inline-block">
                VALUE
              </div>
              <div className="w-[1.875rem] left-8 pl-[18px] relative ml-3 text-[0.625rem] font-ibm-plex-mono text-white text-left inline-block">
                TOKEN
              </div>
              <div className="w-[1.125rem] left-10  pl-[27px] relative text-[0.625rem] font-ibm-plex-mono text-white text-left inline-block">
                USD
              </div>
            </div>
            <div className="w-full overflow-y-scroll">
              {Object.values(transactionsBinance).map((transaction, index) => (
                <RepeatCompo1
                  key={index}
                  timestamp={transaction.timeStamp}
                  from = {transaction.from}
                  to={transaction.to}
                  hash= {transaction.hash}
                  value={transaction.value}
                  transactions= {transaction}
                />
              ))}
            </div>
          </div>
        </div>
        {/* right part */}
        <div className="w-[540px] h-[600px] flex flex-col gap-[15px]">
          <div className="flex justify-center w-full items-center gap-10">
            <div className="w-[15.25rem] relative  text-[0.875rem] border-b-2 border-[#6FFF7E] font-ibm-plex-mono text-[#d2d2d2] text-left inline-block">{`All TRANSACTIONS  `}</div>

            <div className="w-[75px] ml-10 flex justify-center items-center relative rounded-[49px] bg-[#ffbefc] box-border h-[1.438rem] overflow-hidden text-left text-[0.625rem] text-[#90008a] font-ibm-plex-mono border-[1px] border-solid border-[#ff00f5]">
              <div className="w-fit text-[#90008a]  font-medium">All</div>
            </div>

            <div className="w-[97px] flex justify-center items-center relative rounded-[49px] bg-[#a1e9ff] box-border h-[1.438rem] overflow-hidden text-left text-[0.625rem] text-[#007194] font-ibm-plex-mono border-[1px] border-solid border-[#00c2ff]">
              <div className="text-[#007194] font-medium">Sort by time</div>
            </div>
          </div>
          {/* table */}
          <div className="w-full flex flex-col justify-start items-center p-5 relative rounded-lg bg-[#141720] box-border min-h-[14.188rem] overflow-hidden text-left text-[0.75rem] text-white font-ibm-plex-mono border-t-[1px] border-solid border-[#393939]">
            <div className="w-[6.313rem] relative text-[0.875rem] font-ibm-plex-mono text-white text-left inline-block">
              TRANSACTIONS
            </div>

            <div className="flex justify-between  ">
              <div className="w-[1.5rem] right-9 pl-[29px] relative text-[0.625rem] font-ibm-plex-mono text-white text-left inline-block">
                TIME
              </div>
              <div className="w-[1.5rem] left-9  pl-[31px] relative text-[0.625rem] font-ibm-plex-mono text-white text-left inline-block">
                FROM
              </div>
              <div className="w-[0.75rem] left-10 pl-[132px] relative text-[0.625rem] font-ibm-plex-mono text-white text-left inline-block">
                TO
              </div>
              <div className="w-[1.875rem] left-4 pl-[118px] relative text-[0.625rem] font-ibm-plex-mono text-white text-left inline-block">
                VALUE
              </div>
              <div className="w-[1.875rem] left-8 pl-[18px] relative ml-3 text-[0.625rem] font-ibm-plex-mono text-white text-left inline-block">
                TOKEN
              </div>
              <div className="w-[1.125rem] left-10  pl-[27px] relative text-[0.625rem] font-ibm-plex-mono text-white text-left inline-block">
                USD
              </div>
            </div>
            <div className="w-full">
            {Object.values(transactionsShiba).map((transaction, index) => (
                <RepeatCompo2
                  key={index}
                  timestamp={transaction.timeStamp}
                  from = {transaction.from}
                  to={transaction.to}
                  hash= {transaction.hash}
                  value={transaction.value}
                  transactions= {transaction}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ledger;
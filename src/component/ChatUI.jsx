import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { Context } from "../context/ContextProvider";


const ChatUI = (props) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isChatboxOpen, setIsChatboxOpen] = useState(true);
    const userID = props.currentAccount === '0x83A42Ff1F166f4ee2A869f0AAC74A23Ff7E5D6c4'?  '1':'0';
    let update = 1
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
        getUserPost,
        getAllPrivatePost,
        getUserPrivatePost,
        withdrawCoins,
        getRewardStatus,
      } = useContext(Context);
      const handleConnectWallet = async () => {
        await ConnectWallet();
      };

    const fetchData1 = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/messageinsert', { message: userInput,user : userID });
            const data = response.data;
            console.log(data)
            update++;

        } catch (error) {
            console.error('Error sending text:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/getmessages', { message: userInput });
                const data = response.data;
                data.forEach((e) => {
                    const message = { text: e.message, sender: e.user === '1' ? 'user' : 'bot' };
                    setMessages(prevMessages => [...prevMessages, message]);
                });
            } catch (error) {
                console.error('Error sending text:', error);
            }
        };

        fetchData();
    }, [update]);

    const handleSend = () => {
        const message = { text: userInput, sender: userID === '1' ? 'user' : 'bot' };
        setMessages(prevMessages => [...prevMessages, message]);
    };

    const toggleChatbox = () => {
        setIsChatboxOpen(!isChatboxOpen);
    };

    return (
        <div className="relative top-[132px] w-max left-[200px] mb-4 mr-4">
            {/* <button onClick={toggleChatbox} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Chat with Admin Bot
            </button> */}
            <div className={`relative   w-96 ${isChatboxOpen ? '' : 'hidden'}`}>
                <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
                    <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                        <p className="text-lg font-semibold">Admin Bot</p>
                        <button onClick={toggleChatbox} className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 h-80 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                <p className={`bg-${message.sender === 'user' ? 'blue-500' : 'gray-500'} text-${message.sender === 'user' ? 'black' : 'gray-700'} rounded-lg py-2 px-4 inline-block`}>{message.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t flex">
                        <input
                            type="text"
                            placeholder="Type a message"
                            className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                        />
                        <button onClick={
                            ()=>{
                                fetchData1()
                            handleSend() 
                            }
                           } className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatUI;

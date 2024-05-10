import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios';
import { Context } from "../context/ContextProvider";
import Alert from '@mui/material/Alert';



const SendPost = (props) => {
  const [activeDiv, setActiveDiv] = useState('1'); 
  const [desc,setDesc] = useState('');
  const [coin,setCoin] = useState(10);
  const [ hash,setHash] = useState('');
  const [file, setFile] = useState('');
  const [cid, setCid] = useState('');
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState('');
  const [isAlertSuccess,setIsAlertSuccess] = useState(false)
  const [successAlertContent,setSuccessAlertContent]= useState('');
  const [isAlertInfo,setIsAlertInfo] = useState(false)


  const {
    // checkIfWalletIsConnected,
    // ConnectWallet,
    // currentAccount,
    // isNewUser,
    // createUser,
    createPost,
    // likePost,
    // getUserData,
    // userPost,
    createPrivatePost,
  } = useContext(Context);

  var generatedUrl='';


  const handleFileChange =  (event) => {
    setFile(event.target.files[0]);
    
  
    };
    const showSuccessPopup = (successMessage) => {
      console.log('ShowSuccess',successMessage);
      setSuccessAlertContent(successMessage);
      setIsAlertSuccess(true);
      setTimeout(() => {
      setIsAlertSuccess(false);
  
      }, 5000); 
    };

    const handleUpload = async () => {
      if (!file) {
        console.error('No file selected.');
        return;
      }
  console.log("spin activated")
  
      const formData = new FormData();
      formData.append('file', file);
      console.log("file",formData);
  
      try {
        const response = await axios.post('https://api.nft.storage/upload', formData, {
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRCOWM5Q0UwQmE3NENiRjA4QkJlZjIwNDMzZEUwYjczNzUxNjI4RTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5ODUwNDQ1NzM3MywibmFtZSI6IkZ1bmRFVEgifQ.JxTH4iRtScscfmb9mvZqhSqF9MKs2b0JJS2yof7hzF4`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        setCid(response.data.value.cid);
         generatedUrl = `https://${response.data.value.cid}.ipfs.nftstorage.link/${file.name}`;
        console.log("generated link",generatedUrl)
        setUrl(generatedUrl);
        setUrls(generatedUrl)
        console.log('NFT Storage response:', response.data.value.cid);
      } catch (error) {
  
        console.error('Error uploading to NFT Storage:', error);
      }
    };

  const handleDivToggle = (id) => {
    setActiveDiv(id); // Update active div based on clicked div
  };

  const handleCoin = (e)=>{
    setCoin(e.target.value);
  }

  const handleHash = (e)=>{
    setHash(e.target.value);
  }

 

  const handleDescChange=(e)=>{
    console.log(e.target.value);
    setDesc(e.target.value);
  }

  function convertHashToString(originalString) {
    return originalString.replace(/#/g, '').split(' ').join(',');
  }
  useEffect(() => {
    if (cid) {
      setUrl(`https://${cid}.ipfs.nftstorage.link/${file.name}`);
    }
  }, [cid, file,url]);
  return (
   

      <div className="min-w-[568px] min-h-[30rem] relative bg-black rounded-xl">
        <div className='flex flex-col p-7'>
           {/* alert success */}
        <div  className={`absolute z-20 ml-[34rem] mt-10 ${isAlertSuccess?'flex':'hidden'}`}>
        <Alert severity="success">{successAlertContent}</Alert>
        </div>
        {/* alert success end */}
        {/* alert info */}
        <div className={`absolute z-20 ml-[34rem] mt-10 ${isAlertInfo?'flex':'hidden'}`}>

        <Alert severity="info">Waiting for Metamask...</Alert>
        </div>
        {/* alert info end */}
          <div className='flex'>
        <img  onClick={() => props.close(false)} className="relative right-3 bottom-2 w-auto h-[1rem] overflow-hidden object-cover" alt="" src="https://i.imgur.com/LIaFXhU.png" />

        <div id='1'
            className={`flex gap-2 ml-3 ${activeDiv === '1' ? 'border-b-2 border-cornflowerblue border-solid' : ''}`}
            onClick={() => handleDivToggle('1')} // Toggle function for div 1
          >
        <img className="relative w-auto h-[1.25rem] overflow-hidden object-cover" alt="" src="https://cdn.discordapp.com/attachments/1177493315898314792/1184481130406228049/image.png?ex=658c2104&is=6579ac04&hm=e7da38a681b91ddcaf6fec69ffad38fe4bfe2bc5e7bb2735375fc069291ed0ff&" />
        <div className="relative text-[1.13rem] font-medium font-inter text-cornflowerblue text-left">Public Post</div>
        </div>

        <div  id='2'
            className={`flex gap-2 ml-5 ${activeDiv === '2' ? 'border-b-2 border-cornflowerblue border-solid' : ''}`}
            onClick={() => handleDivToggle('2')} // Toggle function for div 2
         >
        <img className="relative w-auto h-[1.45rem] overflow-hidden object-cover" alt="" src="https://cdn.discordapp.com/attachments/1177493315898314792/1184481202229485588/image.png?ex=658c2115&is=6579ac15&hm=96f2b83803098efc8b550054e17ac6b244c78e30218c7e0101ead45dca7af191&" />
        <div className="relative text-[1.13rem] font-medium font-inter text-cornflowerblue text-left">Private Post</div>
        </div>


        <div  className={`relative left-11 flex items-center justify-center rounded-[25px] bg-white w-[6rem] h-[1.94rem] overflow-hidden text-left text-[0.38rem] text-black font-inter ${activeDiv==2?'flex':'hidden'}`}>
<input  onChange={handleCoin} placeholder='10' title='Coin' type='number' className="absolute w-[4rem] h-[1rem] outline-none border-none  top-[27.04%] left-[11.15%] font-medium"/>
<img className="absolute h-[2rem] w-auto top-[1.7%] right-[6.56%] bottom-[4.35%] left-[63.93%]  overflow-hidden  object-cover" alt="" src="https://cdn.discordapp.com/attachments/1177493315898314792/1184074100763795456/image.png?ex=658aa5f0&is=657830f0&hm=56f437a8feb464628765049711c4cf1d08f05c532a8972598d0b44065b616292&" />
</div>
        </div>

        <div className='flex mt-5 ml-3 gap-4 h-[200px] border-b-2 border-gray-100 border-solid'>
          {/* <div>
            <img className='relative rounded-full w-auto h-[2.29rem] object-cover' src="https://cdn.discordapp.com/attachments/1177492390949441610/1184455231728255027/image_32.png?ex=658c08e5&is=657993e5&hm=2515c1925ba753fa5f16fa244df6dc3b9a01cbb1b5531b473b25d6c7c188c622&" alt="" />
          </div> */}

          <div className='w-[90%]'>
            <textarea onChange={handleDescChange} style={{'height': 'calc(100% - 1rem)','scrollbar-width': 'none','-ms-overflow-style': 'none'}}  className='overflow-hidden resize-none appearance-none  leading-tight focus:outline-none focus:shadow-outline bg-transparent outline-none text-white h-[200pxpx]  w-full' type="text" placeholder="What is happening?"/>
          </div>

        </div>
        <div className="relative rounded mt-5 bg-darkslategray-200 box-border w-full h-[5.56rem] overflow-hidden text-left text-[0.88rem] text-gray font-inter border-[1px] border-solid border-[#374151]">
<input onChange={handleHash} className="absolute bg-transparent outline-none w-full h-max p-2 text-white top-[0.81rem] left-[0.75rem]" placeholder='#dscoial #deso'/>
</div>
        <div className='flex w-full mt-5'>
        <div title='Upload Image' className='flex justify-start'>
            {/* Input element for image upload */}
            <input
              type='file'
              id='imageUpload'
              onChange={(e)=>{
                 handleFileChange(e)
              
              }}
              accept="image/*"
              className='hidden' // Hide the input element
            />
            <label htmlFor='imageUpload'>
              <img 
                className='relative w-auto h-[1.63rem] overflow-hidden object-cover cursor-pointer'
                alt="a"
                src="https://cdn.discordapp.com/attachments/1177493315898314792/1184481280616828947/image.png?ex=658c2127&is=6579ac27&hm=addae38478352496e554b7490d7c8e7d720f7e167f9e9b91d9a9e39001d5550d&"
              />
            </label>
          </div>
          <div className='flex-grow'></div> 
          <div title='Post' className="relative flex justify-end rounded-[97px] bg-cornflowerblue box-border w-[81px] h-[2.06rem] overflow-hidden text-left text-[1.13rem] text-white font-inter border-t-[1px] border-solid border-lightskyblue border-r-[1px] border-l-[1px]">
<div  onClick={async()=>{
  setUrl(`https://${cid}.ipfs.nftstorage.link/${file.name}`);
  props.spin(true);
  await handleUpload();
  
  
  console.log(`description ${desc} hash ${convertHashToString(hash)} file ${url} coin ${coin} activeDiv ${activeDiv} cid ${cid} again url ${generatedUrl}`)

 
  if (activeDiv==1) {
    const obj = {
      description:desc,
      hash: convertHashToString(hash),
      file: generatedUrl,
      countFunc:props.count

    }
    console.log(obj,"obj")
    props.spin(true);
    await createPost(obj,props.spin,showSuccessPopup,setIsAlertInfo)
    props.count((prev)=>{return prev+1})
  props.spin(false);

  }
  else{
    const obj = {
      description:desc,
      file: generatedUrl,
      coin: coin,
      hash:convertHashToString(hash),
      countFunc:props.count
    }
    console.log(obj,"obj")
await createPrivatePost(obj,props.spin,showSuccessPopup,setIsAlertInfo)

  props.spin(false);
  
      // await createPrivatPost(obj)
  }

  props.close(false)

 
}} className="absolute top-[0.38rem] left-[1.31rem] font-semibold">Post</div>
</div>

        </div>
        
        </div>
        

      </div>
    
  )
}

export default SendPost;

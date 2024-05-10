import React from 'react'

const ProfilePost = (props) => {
  return (
    
       <div className="relative w-[207px] hover:scale-110 transition-transform duration-300 h-[213px]">
                  <img
                    className=" rounded-3xs w-[207px] h-[213px] object-cover"
                    alt=""
                    src={props.post}
                    // src="https://cdn.discordapp.com/attachments/1177492390949441610/1184573213477449900/image.png?ex=658c76c6&is=657a01c6&hm=7ad60633d26fe513eb60f36c750ac51b8228b2cf2b2e4480c1d70bd65bc6aeae&"
                  />
                  {props.id==2&&<div  className="absolute top-[9px] left-[161px] rounded-3xs bg-white w-[37px] h-[18px] overflow-hidden">
                    <div className="absolute text-[0.6rem] top-[2px] left-[4.8px]  font-normal">
                      {props.coin || 10}
                    </div>
                    <img
                      className="absolute top-[1px] left-[18px] w-4 h-[17px] object-cover"
                      alt=""
                      src=" https://cdn.discordapp.com/attachments/1177492390949441610/1184823446287433860/image.png?ex=658d5fd2&is=657aead2&hm=bf916ea068b2cd8f24d35cc70c22a220e39a9baece0dc56e600186abc3f776f6&"
                    />
                  </div>}
                </div>
    
  )
}

export default ProfilePost

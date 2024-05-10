import React, { useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoCall = () => {

    const myMeeting =  (element) => {
      const roomID = "abd23";
      const appID = 2108579368;
      const serverSecret = "0e1dc278e5836b99f2f1b34ca8ab7572";

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        Date.now().toString(),
        "Swayam"
      );

      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: element,
       sharedLinks:[
        {
          name: 'Copy Link',
          url: 'http://localhost:5173/'
        }
       ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
      });
    };

   
 

  return (
    <div ref={myMeeting} id="meeting-container">
      fdd
    </div>
  );
};

export default VideoCall;

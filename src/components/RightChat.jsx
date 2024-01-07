import React from 'react'
import '../styles/rightChat.css'


const RightChat = ({call,callAccepted,answerCall,leaveCall}) => {
  return (
    <div className='rightchat__outer'>
      <div className='rightchat__top'>
         <span className='rightchat__top__text'>Call Notification</span>
        <span className="moreIcon material-symbols-outlined">more_vert</span>
      </div>
      <div className='rightchat__middle'>
       {call?.isReceivingCall && !callAccepted &&
        <div>
          <span>Incoming Call from : {call?.from.name}</span>
          <button onClick={answerCall}>Answer</button>
       </div>}
       {callAccepted && <button onClick={leaveCall}>Leave Call</button>}
      </div>
      <div className='rightchat__bottom'>

      </div>
    </div>
  );
};

export default RightChat;

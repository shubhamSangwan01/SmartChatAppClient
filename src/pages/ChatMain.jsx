import React from 'react'
import Sidebar from '../components/Sidebar'
import LeftChat from '../components/LeftChat'
import MiddleChat from '../components/MiddleChat'
import RightChat from '../components/RightChat'
import '../styles/chatmain.css'

const ChatMain = ({socket}) => {
  return (
    <div className='chat__outer'> 
        <Sidebar/>
        <div className='chat__main__grid'>
        <LeftChat/>
        <MiddleChat socket={socket}  />
        <RightChat/>
        </div>
        
    </div>
  )
}

export default ChatMain
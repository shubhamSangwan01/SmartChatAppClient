import React from 'react'
import Sidebar from '../components/Sidebar'
import LeftChat from '../components/LeftChat'
import MiddleChat from '../components/MiddleChat'
import RightChat from '../components/RightChat'
import '../styles/chatmain.css'

const ChatMain = () => {
  return (
    <div className='chat__outer'>
        <Sidebar/>
        <div className='chat__main__grid'>
        <LeftChat/>
        <MiddleChat/>
        <RightChat/>
        </div>
        
    </div>
  )
}

export default ChatMain
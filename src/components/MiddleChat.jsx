import React from 'react'
import { useEffect } from 'react'
import '../styles/middleChat.css'


const MiddleChat = ({socket}) => {
  const sender = socket.id;
  const [message,setMessage] = React.useState('');
  const [messageList,setMessageList] = React.useState([])

  const handleChangeMessage = (e)=>{
    setMessage(e.target.value)
  }
  const handleSendMessage = async ()=>{
    if(message!==''){
      
      await socket.emit("send_message",{message,id:socket.id})
      setMessageList(list=>[...list,{message,id:socket.id}])
      setMessage('')
    }
    
  }
  useEffect(()=>{
    socket.emit("join_room","123")
  },[])
  useEffect(()=>{
    socket.on("receive_message",data=>{
      setMessageList((list)=>[...list,data])
     
    })
  },[socket])



  return (
    <div className='middlechat__outer'>
      <div className='middlechat__top'>
        <div className='middlechat__top__left'>
          <div className='middlechat__top__left__avatar'>
          
          </div>
          <div className='middlechat__top__left__userInfo'>
              <span className='middlechat__top__left__userInfo__name'>
                Ashish Kumar
              </span>
              <div className='middlechat__top__left__userInfo__status'>
              <span className='middlechat__top__left__userInfo__status__icon'>🟢</span>
              <span className='middlechat__top__left__userInfo__status__text'>Online</span>
              </div>
          </div>
        </div>
        <div className='middlechat__top__right'>
         
         <button>
          <span className="callIcon material-symbols-outlined">
          call
         </span>
         <span className="middlechat__top__right__span">Call</span>
         </button>
        </div>
      </div>

      <div className='middlechat__middle'>
       {messageList.map(message=>(
        <h1 className={message.id===sender?'middlechat__you':'middlechat__other'}>{message.message}</h1>
       ))}
      </div>
      
      <div className='middlechat__bottom'>
        <span class="attachmentIcon material-symbols-outlined">
           attachment
        </span>
        <div className='middlechat__bottom__right'>
          <input type='text' onKeyPress={(e)=>{e.key==="Enter" && handleSendMessage()}} value={message} onChange={handleChangeMessage} placeholder='Type a message'/>
          <span class="material-symbols-outlined"  onClick={handleSendMessage}>
            send
          </span>
        </div>
      </div>

    </div>
  )
}

export default MiddleChat
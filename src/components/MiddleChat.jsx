import React from 'react'
import { useEffect } from 'react'
import '../styles/middleChat.css'
import axios from 'axios';


const MiddleChat = ({socket,setOnlineUsers,onlineUsers,rescentChats,setRescentChats,user,activeChat}) => {
  const sender = socket?.id;
  
  const [message,setMessage] = React.useState('');
  const [messageList,setMessageList] = React.useState([])
  const [isOnline,setIsOnline] = React.useState(false)


  const handleChangeMessage = (e)=>{
    setMessage(e.target.value)
  }
  const handleSendMessage = async (e)=>{
    if(message!==''){
      
      await socket?.emit("send_message",{...activeChat,message,from:user})

     const data= await axios.post('http://localhost:5000/savemessage',{from:user,to:activeChat,message})
      
      setMessageList(list=>[...list,{message,id:user?.userId,date:`${(new Date()).getDate()}/${(new Date()).getMonth()}/${(new Date()).getFullYear()}`,time:`${(new Date()).getHours()}:${(new Date()).getMinutes()}`}])
      setMessage('')
      if(!rescentChats.some(chat=>chat.userId===activeChat.userId)){
        setRescentChats(prev=>([...prev,{name:activeChat.name,userId:activeChat.userId}]))
      }
    }
    
  }
  
 
  useEffect(() => {
    const receiveMessage = (data) => {
      if (!rescentChats.some((chat) => chat.userId === data.from.userId)) {
        setRescentChats((prev) => [...prev, { name:data?.from?.name,userId:data?.from?.userId}]);
      }
      setMessageList((list) => [...list, { date:`${(new Date()).getDate()}/${(new Date()).getMonth()}/${(new Date()).getFullYear()}`,time:`${(new Date()).getHours()}:${(new Date()).getMinutes()}`, message: data.message, id: data.from }]);
    };
    const receiveNewUsers = (data)=>{
      setOnlineUsers(data.activeUsers);
      
      console.log(data)
    }
    socket?.on('get-users',receiveNewUsers)
  

    socket?.on('recieve_message', receiveMessage);

    return () => {
      // Clean up the event listener when the component unmounts
      socket?.off('recieve_message', receiveMessage);
    };
  }, [socket,rescentChats,onlineUsers]);

  
  useEffect(()=>{

    // fetch chats of active chat
    axios.post('http://localhost:5000/messages',{from:user?.userId,to:activeChat?.userId})
    .then(res=>{
      if(res.status===200){        
        const msgList = res.data.messageList.map(msg=>
          {
            const msgDate = `${(new Date(msg.Date)).getDate()}/${(new Date(msg.Date)).getMonth()}/${(new Date(msg.Date)).getFullYear()}`
            return {message:msg.messageBody,id:msg.from,time:msg.timestamp,date:msgDate}
          })
          
        setMessageList(msgList)
      }
      if(onlineUsers && onlineUsers.some(usr=>usr.userId===activeChat.userId)){
        setIsOnline(true);
      }
      else{
        setIsOnline(false)
      }
      
    })

  },[activeChat])

  useEffect(()=>{
    if(onlineUsers && onlineUsers.some(usr=>usr.userId===activeChat?.userId)){
     setIsOnline(true)
    }
    else{
     setIsOnline(false)
    }
  },[onlineUsers])

   
  return (
    <div className='middlechat__outer'>
      <div className='middlechat__top'>
        <div className='middlechat__top__left'>
          <div className='middlechat__top__left__avatar'>
          
          </div>
          <div className='middlechat__top__left__userInfo'>
              <span className='middlechat__top__left__userInfo__name'>
                {activeChat?.name}
              </span>
              <div className='middlechat__top__left__userInfo__status'>
              <span className='middlechat__top__left__userInfo__status__icon'>🟢</span>
              <span className='middlechat__top__left__userInfo__status__text'>{isOnline?'Online':'Offline'}</span>
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
       {messageList.map((message,idx)=>(
        <h3 key={idx} className={message.id===user.userId?'middlechat__you':'middlechat__other'}>{message.message} {message.date} {message.time}</h3>
       ))}
      </div>
      
      <div className='middlechat__bottom'>
        <span className="attachmentIcon material-symbols-outlined">
           attachment
        </span>
        <div className='middlechat__bottom__right'>
          <input type='text' onKeyPress={(e)=>{e.key==="Enter" && handleSendMessage()}} value={message} onChange={handleChangeMessage} placeholder='Type a message'/>
          <span className="material-symbols-outlined"  onClick={handleSendMessage}>
            send
          </span>
        </div>
      </div>

    </div>
  )
}

export default MiddleChat
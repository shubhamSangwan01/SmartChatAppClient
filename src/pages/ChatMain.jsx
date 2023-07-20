import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import LeftChat from '../components/LeftChat'
import MiddleChat from '../components/MiddleChat'
import RightChat from '../components/RightChat'
import io from 'socket.io-client'
import '../styles/chatmain.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



let socket;
const ChatMain = () => {
  const [user,setUser] =React.useState(null);
  const [activeChat,setActiveChat] = React.useState(null);
  const [activeMenu,setActiveMenu] = React.useState('messages');
  const [searchFriends,setSearchFriends] = React.useState('');
  const [searchChats,setSearchChats] = React.useState('');
  const [searchFriendsResult,setSearchFriendsResult] = React.useState([]);
  const [rescentChats,setRescentChats] = React.useState([]);
  
  const navigate = useNavigate();

  const handleSearchFriends = (e)=>{
    setSearchFriends(e.target.value);
  }
  const handleSearchChats = (e)=>{
    setSearchChats(e.target.value);
  }
 
  const handleChangeActiveChat = (user)=>{
    setActiveChat(user);
    
  }


  useEffect(()=>{
    socket = io.connect("http://localhost:4000");
    const token = sessionStorage.getItem("authToken");
    const user = JSON.parse(sessionStorage.getItem("User"))
    setUser(user)

      if(token === undefined || token=== null ){
          toast.error("Auth Token not found! Please login again.")
          setTimeout(()=>{navigate('/')},2000) 
      }else{
        socket?.emit("new_user_add",user);
        axios.post('http://localhost:5000/getrescentchats',{user})
        .then(res=>{
          setRescentChats(res.data.rescentChats);
        })
      }
      
  },[])


  useEffect(()=>{
    if(searchFriends.includes('@gmail.com')){
      axios.post('http://localhost:5000/searchuser',{searchFriends})
      .then(res=>{
        if(res.status==202){
          toast.error(res?.data.message)
        }
        else if(res.status==200){
          const frnds = user ? res?.data.users.filter(usr=>usr.email!==user?.email):[];
          setSearchFriendsResult(frnds);
        }
        
      });
    }
  },[searchFriends])


  return (
    <div className='chat__outer'> 
        <Sidebar user={user} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <div className='chat__main__grid'>
        <LeftChat
        rescentChats={rescentChats}

        activeChat={setActiveChat}
        handleChangeActiveChat={handleChangeActiveChat}
        activeMenu={activeMenu}
        searchChats={searchChats}
        searchFriends={searchFriends}
        handleSearchChats={handleSearchChats}
        handleSearchFriends={handleSearchFriends}
        searchFriendsResult={searchFriendsResult}
        />
        <MiddleChat rescentChats={rescentChats} setRescentChats={setRescentChats} socket={socket} user={user} activeChat={activeChat} />
        <RightChat/>
        </div>
        
    </div>
  )
}

export default ChatMain
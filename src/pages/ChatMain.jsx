import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import LeftChat from "../components/LeftChat";
import MiddleChat from "../components/MiddleChat";
import RightChat from "../components/RightChat";
import io from "socket.io-client";
import "../styles/chatmain.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let socket;
const ChatMain = () => {
  const [user, setUser] = React.useState(null);
  const [unreadUsers, setUnreadUsers] = React.useState([]);
  const [onlineUsers, setOnlineUsers] = React.useState(null);
  const [activeChat, setActiveChat] = React.useState(null);
  const [activeMenu, setActiveMenu] = React.useState("messages");
  const [searchFriends, setSearchFriends] = React.useState("");
  const [searchChats, setSearchChats] = React.useState("");
  const [searchFriendsResult, setSearchFriendsResult] = React.useState([]);
  const [rescentChats, setRescentChats] = React.useState([]);
  const [groupChats, setGroupChats] = React.useState([]);
  const [createGroup, setCreateGroup] = React.useState(false);
  const [groupInfo, setGroupInfo] = React.useState({
    groupName: "",
    groupMembers: [],
    groupDescription: "",
  });

  const navigate = useNavigate();

  const handleSearchFriends = (e) => {
    setSearchFriends(e.target.value);
  };
  const handleSearchChats = (e) => {
    setSearchChats(e.target.value);
  };

  const handleCreateGroup = async (e) => {
     e.preventDefault();
     
     if(groupInfo?.name==''){
      toast.error('Please enter name of the group.')
     }
     //? We also have to include ourself in the group
     else if(groupInfo?.groupMembers.length+1<=2){
      toast.error('A group must have atleast 3 members.')
     }
     else{
      //todo:  We also have to include ourself in the group
      const modifiedGroupMembers = groupInfo.groupMembers;
      modifiedGroupMembers.push(user)
      console.log(modifiedGroupMembers)
      const res=  await axios.post('http://localhost:5000/creategroup',{...groupInfo,groupMembers:modifiedGroupMembers});
      if(res.status===200){
        toast.success(`Group ${groupInfo?.groupName} created successfully.`)
      }
      else{
        toast.error('Error creating a group please try again!')
      }
     }
  };

  const handleChangeActiveChat = async (rescentChatUser) => {
    setActiveChat(rescentChatUser);
    setUnreadUsers((prev) =>
      prev.filter((usr) => usr.userId !== rescentChatUser.userId)
    );
    if (unreadUsers?.some((usr) => usr.userId === rescentChatUser.userId)) {
      await axios.post("http://localhost:5000/updateunreadusers", {
        from: rescentChatUser,
        to: user,
      });
    }
  };

  useEffect(() => {
    socket = io.connect("http://localhost:4000");
    const token = sessionStorage.getItem("authToken");
    const user = JSON.parse(sessionStorage.getItem("User"));
    setUser(user);

    if (token === undefined || token === null) {
      toast.error("Auth Token not found! Please login again.");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      socket?.emit("new_user_add", user);

      axios
        .post("http://localhost:5000/getrescentchats", { user })
        .then((res) => {
          setRescentChats(res.data.rescentChats);
        });

      axios
        .get(`http://localhost:5000/unreadusers/${user.userId}`)
        .then((res) => setUnreadUsers(res.data.unreadUsers));
    }
  }, []);

  useEffect(() => {
    if (searchFriends.includes("@gmail.com")) {
      axios
        .post("http://localhost:5000/searchuser", { searchFriends })
        .then((res) => {
          if (res.status === 202) {
            toast.error(res?.data.message);
          } else if (res.status === 200) {
            const frnds = user
              ? res?.data.users.filter((usr) => usr.email !== user?.email)
              : [];
            setSearchFriendsResult(frnds);
          }
        });
    }
  }, [searchFriends]);

  return (
    <div className="chat__outer">
      <Sidebar
        user={user}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      <div className="chat__main__grid">
        <LeftChat
          rescentChats={
            searchChats === ""
              ? rescentChats
              : rescentChats.filter((chat) => {
                  if (
                    chat.name.toLowerCase().includes(searchChats.toLowerCase())
                  ) {
                    return chat;
                  }
                })
          }
          groupInfo={groupInfo}
          handleCreateGroup={handleCreateGroup}
          setGroupInfo={setGroupInfo}
          setSearchFriends={setSearchFriends}
          setSearchFriendsResult={setSearchFriendsResult}
          createGroup={createGroup}
          setCreateGroup={setCreateGroup}
          unreadUsers={unreadUsers}
          activeChat={setActiveChat}
          handleChangeActiveChat={handleChangeActiveChat}
          activeMenu={activeMenu}
          searchChats={searchChats}
          searchFriends={searchFriends}
          handleSearchChats={handleSearchChats}
          handleSearchFriends={handleSearchFriends}
          searchFriendsResult={searchFriendsResult}
        />
        <MiddleChat
          setOnlineUsers={setOnlineUsers}
          unreadUsers={unreadUsers}
          setUnreadUsers={setUnreadUsers}
          onlineUsers={onlineUsers}
          rescentChats={rescentChats}
          setRescentChats={setRescentChats}
          socket={socket}
          user={user}
          activeChat={activeChat}
        />
        <RightChat />
      </div>
    </div>
  );
};

export default ChatMain;

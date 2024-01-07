import React, { useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import LeftChat from "../components/LeftChat";
import MiddleChat from "../components/MiddleChat";
import RightChat from "../components/RightChat";
import io from "socket.io-client";
import "../styles/chatmain.css";
import Peer from "simple-peer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let socket;
const ChatMain = () => {
  const [user, setUser] = React.useState(null);
  const [unreadUsers, setUnreadUsers] = React.useState([]);
  const [onlineUsers, setOnlineUsers] = React.useState(null);

  const [isCall, setIsCall] = React.useState(false);
  const [call, setCall] = React.useState(null);
  const [stream, setStream] = React.useState(null);
  const [callAccepted, setCallAccepted] = React.useState(false);
  const [callEnded, setCallEnded] = React.useState(false);

  const [activeChat, setActiveChat] = React.useState(null);
  const [activeMenu, setActiveMenu] = React.useState("messages");
  const [activeSettingsMenu, setActiveSettingsMenu] = React.useState("profile");
  const [searchFriends, setSearchFriends] = React.useState("");
  const [searchGroups, setSearchGroups] = React.useState("");
  const [notifications, setNotifications] = React.useState([]);
  const [activeGroup, setActiveGroup] = React.useState(null);
  const [searchChats, setSearchChats] = React.useState("");
  const [searchFriendsResult, setSearchFriendsResult] = React.useState([]);
  const [rescentChats, setRescentChats] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [createGroup, setCreateGroup] = React.useState(false);
  const [groupInfo, setGroupInfo] = React.useState({
    groupName: "",
    groupMembers: [],
    groupDescription: "",
  });

  const navigate = useNavigate();
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const handleSearchFriends = (e) => {
    setSearchFriends(e.target.value);
  };
  const handleLogOut = async () => {
    sessionStorage.clear();
    toast.success("Logging out.");
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  const handleSearchChats = (e) => {
    setSearchChats(e.target.value);
  };
  const handleOnClickNotification = (notification) => {
    setUnreadUsers((prev) =>
      prev.filter((usr) => usr.userId !== notification.notifySender.userId)
    );

    const isGroup = notification?.isGroup;
    if (!isGroup) {
      setActiveChat(notification?.notifySender);
      setActiveGroup(null);
      setNotifications((prev) => {
        return prev.filter((noti) => {
          if (!noti.isGroup) {
            return (
              noti.notifySender.userId !== notification.notifySender.userId &&
              noti.notifyData !== notification.notifyData
            );
          } else {
            return noti;
          }
        });
      });
    } else {
      setActiveGroup(
        groups.find((grp) => grp?.groupName === notification?.group.groupName)
      );
      setActiveChat(null);
      setNotifications((prev) => {
        return prev.filter((noti) => {
          if (!noti.isGroup) {
            return noti;
          } else {
            return (
              noti?.group.groupName !== notification?.group.groupName &&
              noti.notifySender.userId !== notification.notifySender.userId &&
              noti.notifyData !== notification.notifyData
            );
          }
        });
      });
    }
    axios
      .post("http://localhost:5000/removesinglenotification", {
        userId: user.userId,
        from: notification.notifySender,
      })
      .then((res) => console.log(res));
    axios
      .post("http://localhost:5000/updateunreadusers", {
        from: notification.notifySender,
        to: user,
      })
      .then((res) => console.log(res));
  };
  const handleClearNotifications = (e) => {
    setNotifications([]);
    axios
      .post("http://localhost:5000/clearnotification", { userId: user.userId })
      .then((res) => console.log(res));
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    if (groupInfo?.name == "") {
      toast.error("Please enter name of the group.");
    }
    //? We also have to include ourself in the group
    else if (groupInfo?.groupMembers.length + 1 <= 2) {
      toast.error("A group must have atleast 3 members.");
    } else {
      //todo:  We also have to include ourself in the group
      const modifiedGroupMembers = groupInfo.groupMembers;
      modifiedGroupMembers.push(user);
      socket?.emit("group_add", {
        ...groupInfo,
        groupMembers: modifiedGroupMembers,
        from: user,
      });

      setGroups((prev) => [
        ...prev,
        {
          ...groupInfo,
          groupMembers: modifiedGroupMembers,
        },
      ]);

      const res = await axios.post("http://localhost:5000/creategroup", {
        ...groupInfo,
        groupMembers: modifiedGroupMembers,
      });
      const offlineUsers = groupInfo.groupMembers.filter((mem) => {
        if (!onlineUsers?.some((usr) => usr.userId === mem.userId)) {
          return mem;
        }
      });
      offlineUsers.forEach((offlineUser) => {
        axios.post("http://localhost:5000/savenotification", {
          userId: offlineUser.userId,
          notification: {
            notifyMessage: `${user.name} added you to ${groupInfo.groupName}.`,
            notifyData: "Group added",
            notifySender: user,
            isGroup: true,
            group: { groupName: groupInfo.groupName },
          },
        });
      });

      if (res.status === 200) {
        toast.success(`Group ${groupInfo?.groupName} created successfully.`);
        setGroupInfo((prev) => ({
          ...prev,
          groupName: "",
          groupDescription: "",
          groupMembers: [],
        }));
      } else {
        toast.error(res.data.message);
      }
    }
  };

  const handleChangeActiveChat = async (rescentChatUser) => {
    setActiveChat(rescentChatUser);
    setActiveGroup(null);

    setUnreadUsers((prev) =>
      prev.filter((usr) => usr.userId !== rescentChatUser.userId)
    );
    if (unreadUsers?.some((usr) => usr.userId === rescentChatUser.userId)) {
      await axios.post("http://localhost:5000/updateunreadusers", {
        from: rescentChatUser,
        to: user,
      });
    }
    //
    setNotifications((prevNoti) =>
      prevNoti.filter((noti) => {
        if (
          !unreadUsers.some((usr) => usr.userId === noti.notifySender.userId)
        ) {
          return noti;
        }
      })
    );
  };
  const callUser = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)
        console.log(currentStream)
        if (myVideo.current) {
          
          myVideo.current.srcObject = currentStream;
        }
        socket.on("callUser", ({ from, name: callerName, signal }) => {
          console.log("Call received", from);
          setCall({ isReceivingCall: true, from, name: callerName, signal });
        })
      }).catch(error=>{
        console.log(error)
      })

    setIsCall(true);
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: activeChat?.userId,
        signalData: data,
        from: user,
        name: user?.name,
        isMuted:false
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
     
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    socket?.emit("leave_call",{})
    // Reset call-related states
    setCall(null);
    setCallAccepted(false);
    setCallEnded(true);
  };
  const answerCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)
        console.log(currentStream)
        if (myVideo.current) {
          
          myVideo.current.srcObject = currentStream;
        }
        socket.on("callUser", ({ from, name: callerName, signal }) => {
          
          setCall({ isReceivingCall: true, from, name: callerName, signal });
        })
      }).catch(error=>{
        console.log(error)
      })

    setCallAccepted(true);
    setIsCall(true)
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
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

      axios
        .get(`http://localhost:5000/getgroups/${user.userId}`)
        .then((res) => {
          setGroups(res.data.groups);
        });
      axios
        .get(`http://localhost:5000/getnotification/${user.userId}`)
        .then((res) => {
          setNotifications(res?.data?.notifications);
        });
    }
    socket?.on("call_left", () => {
      if (connectionRef.current) {
        connectionRef.current.destroy();
      }
     
      // Reset call-related states
      setCall(null);
      setCallAccepted(false);
      setCallEnded(true);
    });
  
    // ... (rest of the code)
  
    // Clean up the socket listener when the component unmounts
    return () => {
      socket?.off("call_left");
    };
  }, []);
  

 

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)
        console.log(currentStream)
        if (myVideo.current) {
          
          myVideo.current.srcObject = currentStream;
        }
        socket.on("callUser", ({ from, name: callerName, signal }) => {
          console.log("Call received", from);
          setCall({ isReceivingCall: true, from, name: callerName, signal });
        })
      }).catch(error=>{
        console.log(error)
      })

    
  }, []);
  console.log(stream)

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
        activeSettingsMenu={activeSettingsMenu}
        setActiveSettingsMenu={setActiveSettingsMenu}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        notifications={notifications}
      /> 
      {/** chat page grid added tailwind csss */}
      <div className="chat__main__grid grid grid-cols-4">
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
          handleOnClickNotification={handleOnClickNotification}
          handleLogOut={handleLogOut}
          handleClearNotifications={handleClearNotifications}
          setActiveGroup={setActiveGroup}
          setActiveMenu={setActiveMenu}
          groupInfo={groupInfo}
          handleCreateGroup={handleCreateGroup}
          groups={groups}
          setGroupInfo={setGroupInfo}
          searchGroups={searchGroups}
          setSearchGroups={setSearchGroups}
          setSearchFriends={setSearchFriends}
          setSearchFriendsResult={setSearchFriendsResult}
          createGroup={createGroup}
          notifications={notifications}
          setNotifications={setNotifications}
          setCreateGroup={setCreateGroup}
          unreadUsers={unreadUsers}
          setActiveChat={setActiveChat}
          activeChat={setActiveChat}
          activeSettingsMenu={activeSettingsMenu}
          setActiveSettingsMenu={setActiveSettingsMenu}
          handleChangeActiveChat={handleChangeActiveChat}
          activeMenu={activeMenu}
          searchChats={searchChats}
          searchFriends={searchFriends}
          handleSearchChats={handleSearchChats}
          handleSearchFriends={handleSearchFriends}
          searchFriendsResult={searchFriendsResult}
        />
        {isCall ? (
          <div className="continer">
            <div className="my_video">
             { <video
                playsInline
                muted={true}
                ref={myVideo}
                autoPlay
                style={{ width: "300px" }}
              />}
             {callAccepted && !callEnded && <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "300px" }}
              />}
            </div>
          </div>
        ) : (
          <MiddleChat
            activeMenu={activeMenu}
            callUser={callUser}
            activeSettingsMenu={activeSettingsMenu}
            setActiveSettingsMenu={setActiveSettingsMenu}
            setOnlineUsers={setOnlineUsers}
            notifications={notifications}
            setNotifications={setNotifications}
            activeGroup={activeGroup}
            setGroups={setGroups}
            groups={groups}
            unreadUsers={unreadUsers}
            setUnreadUsers={setUnreadUsers}
            onlineUsers={onlineUsers}
            rescentChats={rescentChats}
            setRescentChats={setRescentChats}
            socket={socket}
            user={user}
            activeChat={activeChat}
          />
        )}
        <RightChat
           callAccepted={callAccepted}
          
           call={call}
           leaveCall={leaveCall}
           answerCall={answerCall}
        />
      </div>
    </div>
  );
};

export default ChatMain;

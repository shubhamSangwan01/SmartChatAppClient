import React from "react";
import { useEffect } from "react";
import "../styles/middleChat.css";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "./Form"

const MiddleChat = ({
  activeMenu,
  activeSettingsMenu,
  socket,
  setOnlineUsers,
  onlineUsers,
  rescentChats,
  setRescentChats,
  user,
  activeChat,
  unreadUsers,
  setUnreadUsers,
  notifications,
  activeGroup,
  groups,
  setNotifications,
  setGroups,
}) => {
  const sender = socket?.id;

  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);
  const [isOnline, setIsOnline] = React.useState(false);
  const [formType, setFormType] = React.useState("credentials");
  const [credentialsFormData, setCredentialsFormData] = React.useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    bio: "",
  });
  
  const handleFormTypeChange = (type) => {
    setFormType(type);
  };

  const handleCredentialsFormChange = (e) => {
    setCredentialsFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = async (e) => {
    if (message !== "") {
      if (activeChat) {
        await socket?.emit("send_message", {
          ...activeChat,
          message,
          from: user,
        });

        const data = await axios.post("http://localhost:5000/savemessage", {
          from: user,
          to: activeChat,
          message,
        });

        setMessageList((list) => [
          ...list,
          {
            message,
            id: user?.userId,
            date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
            time: `${new Date().getHours()}:${new Date().getMinutes()}`,
          },
        ]);
        setMessage("");
        if (!rescentChats.some((chat) => chat.userId === activeChat.userId)) {
          setRescentChats((prev) => [
            ...prev,
            { name: activeChat.name, userId: activeChat.userId },
          ]);
        }

        if (!onlineUsers?.some((usr) => usr.userId === activeChat?.userId)) {
          //? add yourself in activechat user's unread chats
          await axios.post("http://localhost:5000/unreaduser", {
            from: user,
            to: activeChat,
          });
        }
      } else if (activeGroup) {
        await socket?.emit("send_group_message", {
          message,
          ...activeGroup,
          from: user,
        });
        await socket?.emit("send_groupchat_notification", {
          ...activeGroup,
          from: user,
          message,
        });
        await axios.post("http://localhost:5000/savegroupmessage", {
          message,
          from: user,
          groupId: activeGroup?.groupId,
        });
        setMessageList((list) => [
          ...list,
          {
            message,
            id: user?.userId,
            date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
            time: `${new Date().getHours()}:${new Date().getMinutes()}`,
          },
        ]);
        setMessage("");
      }
    } else {
      toast.error("Please select a friend to start chatting.");
    }
  };

  useEffect(() => {
    const receiveMessage = (data) => {
      if (!rescentChats.some((chat) => chat.userId === data.from.userId)) {
        setRescentChats((prev) => [
          ...prev,
          { name: data?.from?.name, userId: data?.from?.userId },
        ]);
      }
      if (
        !activeChat ||
        (activeChat?.userId !== data.from.userId &&
          !unreadUsers.some((usr) => usr.userId === data.from.userId))
      ) {
        setUnreadUsers((prev) => [...prev, { userId: data.from.userId }]);
        axios
          .post("http://localhost:5000/unreaduser", {
            from: data.from,
            to: user,
          })
          .then((res) =>
            console.log("Unread history updated in backend-> ", res)
          );
      }
      if (data?.from.userId === activeChat?.userId) {
        setMessageList((list) => [
          ...list,
          {
            date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
            time: `${new Date().getHours()}:${new Date().getMinutes()}`,
            message: data.message,
            id: data.from,
          },
        ]);
      } else if (data?.from.userId !== activeChat?.userId) {
        
        setNotifications(prev =>{
          if(prev && prev.length>0){
            return ([
              ...prev,
              {
                notifyMessage: `${data.from.name} send a message.`,
                notifyData: data.message,
                notifySender: data.from,
                isGroup: false,
              },
            ])
          }
          else{
            return [{
              notifyMessage: `${data.from.name} send a message.`,
              notifyData: data.message,
              notifySender: data.from,
              isGroup: false,
            }]
          }
        });
        axios
          .post("http://localhost:5000/savenotification", {  // my notification 
            userId: user.userId,
            notification: {
              notifyMessage: `${data.from.name} send a message.`,
              notifyData: data.message,
              notifySender: data.from,
              isGroup: false,
            },
          })
          .then((res) => console.log(res));
      }
    };
    const receiveNewUsers = (data) => {
      setOnlineUsers(data.activeUsers);
    };
    const receiveGroupMessage = (data) => {
      // console.log(data);
      // console.log(activeGroup);
      if (data?.groupId === activeGroup?.groupId) {
        setMessageList((list) => [
          ...list,
          {
            date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
            time: `${new Date().getHours()}:${new Date().getMinutes()}`,
            message: data.message,
            id: data.from.userId,
          },
        ]);
        // setNotifications(prevNot=>[...prevNot,{notifyMessage:$}])
      }
    };

    const receiveGroupAddNotification = (data) => {
      console.log(data);
      setGroups((prev) => [...prev, data]);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          notifyMessage: `${data.from.name} added you to ${data.groupName} group.`,
          notifySender: data.from,
          isGroup: true,
          group: { groupName: data.groupName, groupId: data.groupId },
        },
      ]);
      axios.post('http://localhost:5000/savenotification',{
        userId:user.userId,
        notification:{
          notifyMessage: `${data.from.name} added you to ${data.groupName} group.`,
          notifySender: data.from,
          isGroup: true,
          group: { groupName: data.groupName, groupId: data.groupId },
        }
      })
    };
    const receiveGroupChatNotification = (data) => {
      if (activeGroup?.groupId !== data?.groupId) {
        setNotifications((prev) => [
          ...prev,
          {
            notifyMessage: `${data.from.name} send a message in ${data.groupName}.`,
            notifyData: data.message,
            notifySender: data.from,
            isGroup: true,
            group: { groupId: data.groupId, groupName: data.groupName },
          },
        ]);
        axios.post('http://localhost:5000/savenotification',{
        userId:user.userId,
        notification:{
          notifyMessage:`${data.from.name} send a message in ${data.groupName}.`,
          notifyData:data.message,
          notifySender:data.from,
          isGroup:true,
          group: { groupId: data.groupId, groupName: data.groupName },
        }
      }) 
      }
    };
    socket?.on("get-users", receiveNewUsers);

    socket?.on("recieve_message", receiveMessage);

    socket?.on("receive_group_message", receiveGroupMessage);

    socket?.on("group_add_notification", receiveGroupAddNotification);
    socket?.on("receive_groupchat_notification", receiveGroupChatNotification);

    return () => {
      // Clean up the event listener when the component unmounts
      socket?.off("recieve_message", receiveMessage);
      socket?.off("receive_group_message", receiveGroupMessage);
      socket?.off("group_add_notification", receiveGroupAddNotification);
      socket?.off(
        "receive_groupchat_notification",
        receiveGroupChatNotification
      );
    };
  }, [
    socket,
    rescentChats,
    onlineUsers,
    activeGroup,
    activeChat,
    groups,
    notifications,
  ]);

  useEffect(() => {
    // fetch chats of active chat
    if (activeChat !== null) {
      axios
        .post("http://localhost:5000/messages", {
          from: user?.userId,
          to: activeChat?.userId,
        })
        .then((res) => {
          if (res.status === 200) {
            const msgList = res.data.messageList.map((msg) => {
              const msgDate = `${new Date(msg.Date).getDate()}/${new Date(
                msg.Date
              ).getMonth()}/${new Date(msg.Date).getFullYear()}`;
              return {
                message: msg.messageBody,
                id: msg.from,
                time: msg.timestamp,
                date: msgDate,
              };
            });

            setMessageList(msgList);
          }
          if (
            onlineUsers &&
            onlineUsers.some((usr) => usr.userId === activeChat?.userId)
          ) {
            setIsOnline(true);
          } else {
            setIsOnline(false);
          }
        });
    }
  }, [activeChat]);

  useEffect(() => {
    // console.log(activeChat);
    // console.log(activeGroup);
    if (activeGroup !== null) {
      socket?.emit("join_group", { activeGroup, user });
      axios
        .get(`http://localhost:5000/getgroupmessages/${activeGroup?.groupId}`)
        .then((res) => {
          const msgList = res?.data?.groupChats?.map((msg) => {
            const msgDate = `${new Date(msg.date).getDate()}/${new Date(
              msg.date
            ).getMonth()}/${new Date(msg.date).getFullYear()}`;
            return {
              message: msg.message,
              id: msg.from.userId,
              time: msg.timestamp,
              date: msgDate,
            };
          });
          setMessageList(msgList);
        });
    }
  }, [activeGroup]);

  useEffect(() => {
    if (
      onlineUsers &&
      onlineUsers.some((usr) => usr.userId === activeChat?.userId)
    ) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, [onlineUsers]);

  return (
    <>
    {activeMenu === "settings" ? (
      <>
      {activeSettingsMenu === 'profile' && (
        <>
        <Form
            formType={formType}
            credentialsFormData={credentialsFormData}
            setCredentialsFormData={setCredentialsFormData}
            handleCredentialsFormChange={handleCredentialsFormChange}
            handleCredentialsSubmit={handleCredentialsSubmit}
            handleFormTypeChange={handleFormTypeChange}
          />
        </>
      )
      }
      {activeSettingsMenu !== 'profile' && (
        <>
        <div className="Settings_outer">
          <div className="Settings_inner">
            <span>This feature is coming soon!</span>
          </div>
        </div>
        </>
      )
      }
      </>
    ) : (
      <div className="middlechat__outer">
      <div className="middlechat__top">
        <div className="middlechat__top__left">
          <div className="middlechat__top__left__avatar"><span>{activeChat?.name[0] || activeGroup?.groupName[0]}</span></div>
          <div className="middlechat__top__left__userInfo">
            <span className="middlechat__top__left__userInfo__name">
              {activeChat?.name || activeGroup?.groupName}
            </span>
            <div className="middlechat__top__left__userInfo__status">
              <span className="middlechat__top__left__userInfo__status__text">
                {activeChat !== null ? (isOnline ? "🟢 Online" : "🔴 Offline") : ""}
                {activeGroup !== null &&
                  activeGroup.groupMembers.length + " members"}{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="middlechat__top__right">
          <button>
            <span className="callIcon material-symbols-outlined">call</span>
          </button>
        </div>
      </div>

      <div className="middlechat__middle" id="middlechat__scroller">
        {messageList.map((message, idx) => (
          <div
            key={idx}
            className={
              message.id === user.userId
                ? "middlechat__messageCard middlechat__you"
                : "middlechat__messageCard middlechat__other" 
            }
          >
            <div className="middlechat__messageCard_message">
              {message.message}
            </div>
            <div className="middlechat__messageCard_time">
             {message.time}
            </div> 
          </div>
        ))}
        <div id="middlechat__anchor"></div>
      </div>

      <div className="middlechat__bottom">
        <span className="attachmentIcon material-symbols-outlined">
          attachment
        </span>
        <div className="middlechat__bottom__right">
          <input
            type="text"
            onKeyPress={(e) => {
              e.key === "Enter" && handleSendMessage();
            }}
            value={message}
            onChange={handleChangeMessage}
            placeholder="Type a message"
          />
          <span
            className="material-symbols-outlined"
            style={{cursor:'pointer'}}
            onClick={handleSendMessage}
          >
            send
          </span>
        </div>
      </div>
    </div>
    
  )}
  </>)
};

export default MiddleChat;

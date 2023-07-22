import React from "react";
import { useEffect } from "react";
import "../styles/middleChat.css";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "../components/Form";
import ScrollToBottom from 'react-scroll-to-bottom';

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
    if (message !== "" && activeChat) {
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
    } else {
      toast.error("Please select a friend to start chatting.");
    }
  }; 

  useEffect(() => {
    const element = document.getElementById("middlechat__anchor");
    element.scrollIntoView();
  }, [])
  

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
      if (data?.from === activeChat?.userId) {
        setMessageList((list) => [
          ...list,
          {
            date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
            time: `${new Date().getHours()}:${new Date().getMinutes()}`,
            message: data.message,
            id: data.from,
          },
        ]);
      }
    };
    const receiveNewUsers = (data) => {
      setOnlineUsers(data.activeUsers);
    };
    socket?.on("get-users", receiveNewUsers);

    socket?.on("recieve_message", receiveMessage);

    return () => {
      // Clean up the event listener when the component unmounts
      socket?.off("recieve_message", receiveMessage);
    };
  }, [socket, rescentChats, onlineUsers]);
  console.log(unreadUsers);
  useEffect(() => {
    // fetch chats of active chat
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
          onlineUsers.some((usr) => usr.userId === activeChat.userId)
        ) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      });
  }, [activeChat]);

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
          <div className="middlechat__top__left__avatar"></div>
          <div className="middlechat__top__left__userInfo">
            <span className="middlechat__top__left__userInfo__name">
              {activeChat?.name}
            </span>
            <div className="middlechat__top__left__userInfo__status">
              <span className="middlechat__top__left__userInfo__status__icon">
                🟢
              </span>
              <span className="middlechat__top__left__userInfo__status__text">
                {isOnline ? "Online" : "Offline"}
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
            onClick={handleSendMessage}
          >
            send
          </span>
        </div>
      </div>
    </div>
    )
    }

    
    </>
  );
};

export default MiddleChat;

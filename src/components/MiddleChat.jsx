import React from "react";
import { useEffect } from "react";
import "../styles/middleChat.css";
import axios from "axios";
import { toast } from "react-toastify";

const MiddleChat = ({
  socket,
  setOnlineUsers,
  onlineUsers,
  rescentChats,
  setRescentChats,
  user,
  activeChat,
  unreadUsers,
  setUnreadUsers,
  activeGroup,
}) => {
  const sender = socket?.id;

  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);
  const [isOnline, setIsOnline] = React.useState(false);

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
    const receiveGroupMessage = (data) => {
      console.log(data);
      console.log(activeGroup)
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
      }
    };
    socket?.on("get-users", receiveNewUsers);

    socket?.on("recieve_message", receiveMessage);

    socket?.on("receive_group_message", receiveGroupMessage);

    return () => {
      // Clean up the event listener when the component unmounts
      socket?.off("recieve_message", receiveMessage);
      socket?.off("receive_group_message", receiveGroupMessage);
    };
  }, [socket, rescentChats, onlineUsers,activeGroup]);

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
          onlineUsers.some((usr) => usr.userId === activeChat?.userId)
        ) {
          setIsOnline(true);
        } else {
          setIsOnline(false);
        }
      });
  }, [activeChat]);
console.log(activeChat)
  useEffect(() => {
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
          setMessageList(msgList)
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
    <div className="middlechat__outer">
      <div className="middlechat__top">
        <div className="middlechat__top__left">
          <div className="middlechat__top__left__avatar"></div>
          <div className="middlechat__top__left__userInfo">
            <span className="middlechat__top__left__userInfo__name">
              {activeChat?.name || activeGroup?.groupName}
            </span>
            <div className="middlechat__top__left__userInfo__status">
              {activeChat !== null && (
                <span className="middlechat__top__left__userInfo__status__icon">
                  🟢
                </span>
              )}
              <span className="middlechat__top__left__userInfo__status__text">
                {activeChat !== null ? (isOnline ? "Online" : "Offline") : ""}
                {activeGroup !== null &&
                  activeGroup.groupMembers.length + " members"}{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="middlechat__top__right">
          <button>
            <span className="callIcon material-symbols-outlined">call</span>
            <span className="middlechat__top__right__span">Call</span>
          </button>
        </div>
      </div>

      <div className="middlechat__middle">
        {messageList?.map((message, idx) => (
          <h3
            key={idx}
            className={
              message.id === user.userId
                ? "middlechat__you"
                : "middlechat__other"
            }
          >
            {message.message} {message.date} {message.time}
          </h3>
        ))}
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
  );
};

export default MiddleChat;

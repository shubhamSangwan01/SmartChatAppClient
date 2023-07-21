import React from "react";
import "../styles/leftchat.css";
import { Button, Textarea } from "@mui/joy";
import { toast } from "react-toastify";

const LeftChat = ({
  activeMenu,
  rescentChats,
  handleChangeActiveChat,
  searchFriendsResult,
  searchChats,
  searchFriends,
  setActiveChat,
  handleSearchChats,
  handleSearchFriends,
  setSearchFriends,
  unreadUsers,
  createGroup,
  setCreateGroup,
  groupInfo,
  setSearchFriendsResult,
  setGroupInfo,
  handleCreateGroup,
  setActiveMenu,
  setActiveGroup,
  groups,
}) => {
  return (
    <>
      {activeMenu === "messages" && (
        <div className="leftchat__outer">
          <div className="leftchat__top">
            <div className="leftchat__top__left">
              <span className="leftchat__top__heading">Messages</span>
              {/* <span
                id="leftchat__expandIcon"
                className="material-symbols-outlined"
              >
                expand_more
              </span> */}
              {unreadUsers.length > 0 && (
                <span className="leftchat__top__left__unreadMessages">
                  {unreadUsers.length}
                </span>
              )}
            </div>
            {/* <div className="leftchat__top__right">
              <span
                id="leftchat__plusIcon"
                className="material-symbols-outlined"
              >
                add
              </span>
            </div> */}
          </div>

          <div className="leftchat__bottom">
            <ul className="leftchat__list">
              <li className="leftchat__searchbar">
                <span className="material-symbols-outlined leftchat__icon">
                  search
                </span>
                <input
                  value={searchChats}
                  onChange={handleSearchChats}
                  type="text"
                  placeholder="Search chat"
                />
              </li>

              {rescentChats.map((chat, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    handleChangeActiveChat(chat);
                  }}
                  className="leftchat__chat"
                >
                  <div className="leftchat__chatcard">
                    <div className="leftchat__chatcard__left"></div>
                    <div className="leftchat__chatcard__right">
                      <div className="leftchat__chatcard__right__row1">
                        <span
                          className={
                            unreadUsers &&
                            unreadUsers.some(
                              (user) => user.userId === chat?.userId
                            )
                              ? "leftchat__chatcard__right__row1__name unread__chat"
                              : "leftchat__chatcard__right__row1__name"
                          }
                        >
                          {chat?.name}
                        </span>
                        <span className="leftchat__chatcard__right__row1__time">
                          12m
                        </span>
                      </div>

                      <div className="leftchat__chatcard__right__row2">
                        <span>Ha ha baba Black Sheep</span>
                      </div>
                      <div className="leftchat__chatcard__right__row3">
                        {" "}
                        <span
                          className={
                            unreadUsers &&
                            unreadUsers.some(
                              (user) => user.userId === chat?.userId
                            )
                              ? "unread__chat__span"
                              : "read__chat__span"
                          }
                        >
                          {unreadUsers &&
                          unreadUsers.some(
                            (user) => user.userId === chat?.userId
                          )
                            ? "unread chat"
                            : "read chat"}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              {groups?.map((group,idx) => (
                <li
                key={idx}
                onClick={() => {
                  setActiveGroup(group);
                  setActiveChat(null)
                }}
                className="leftchat__chat"
              >
                <div className="leftchat__chatcard">
                  <div className="leftchat__chatcard__left"></div>
                  <div className="leftchat__chatcard__right">
                    <div className="leftchat__chatcard__right__row1">
                      <span
                        className="leftchat__chatcard__right__row1__name"
                      >
                        {group?.groupName}
                      </span>
                      <span className="leftchat__chatcard__right__row1__time">
                        12m
                      </span>
                    </div>

                    <div className="leftchat__chatcard__right__row2">
                      <span>{group?.groupDescription}</span>
                    </div>
                    <div className="leftchat__chatcard__right__row3">
                      {" "}
                      
                    </div>
                  </div>
                </div>
              </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeMenu === "addFriends" && (
        <div className="leftchat__outer">
          <div className="leftchat__top">
            <div className="leftchat__top__left">
              <span className="leftchat__top__heading">Search Friends</span>
            </div>
          </div>

          <div className="leftchat__bottom">
            <ul className="leftchat__list">
              <li className="leftchat__searchbar">
                <span className="material-symbols-outlined leftchat__icon">
                  search
                </span>
                <input
                  value={searchFriends}
                  onChange={handleSearchFriends}
                  type="text"
                  placeholder="Search"
                />
              </li>
              {searchFriendsResult.length > 0 &&
                searchFriendsResult.map((usr, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      handleChangeActiveChat(usr);
                      setSearchFriends("");
                      setSearchFriendsResult([]);
                      setActiveMenu("messages");
                    }}
                    className="leftchat__chat"
                  >
                    <div className="leftchat__chatcard">
                      <div className="leftchat__chatcard__left"></div>
                      <div className="leftchat__chatcard__right">
                        <div className="leftchat__chatcard__right__row1">
                          <span className="leftchat__chatcard__right__row1__name">
                            {usr?.name}
                          </span>
                          <span className="leftchat__chatcard__right__row1__time">
                            12m
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
      {activeMenu === "createGroup" && (
        <div className="leftchat__outer">
          <div className="leftchat__top">
            <div className="leftchat__top__left">
              <span className="leftchat__top__heading">Groups</span>
            </div>
            <div className="leftchat__top__right">
              <span
                id="leftchat__plusIcon"
                className="material-symbols-outlined"
                onClick={() => {
                  setCreateGroup((prev) => !prev);
                }}
              >
                add
              </span>
            </div>
          </div>

          {!createGroup ? (
            <div className="leftchat__bottom">
              <ul className="leftchat__list">
                <li className="leftchat__searchbar">
                  <span className="material-symbols-outlined leftchat__icon">
                    search
                  </span>
                  <input type="text" placeholder="Search chat" />
                </li>
                {groups &&
                  groups.map((group, idx) => (
                    <li
                      onClick={() => {
                        setActiveGroup(group);
                        setActiveChat(null);
                      }}
                      key={idx}
                      className="leftchat__chat"
                    >
                      <div className="leftchat__chatcard">
                        <div className="leftchat__chatcard__left"></div>
                        <div className="leftchat__chatcard__right">
                          <div className="leftchat__chatcard__right__row1">
                            <span className="leftchat__chatcard__right__row1__name">
                              {group.groupName}
                            </span>
                            <span className="leftchat__chatcard__right__row1__time">
                              {group.groupMembers.length} members
                            </span>
                          </div>

                          <div className="leftchat__chatcard__right__row2">
                            <span>{group.groupDescription}</span>
                          </div>
                          <div className="leftchat__chatcard__right__row3">
                            {" "}
                            <span>Question</span>
                            <span>Help Wanted</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <div className="leftchat__bottom">
              <form onSubmit={handleCreateGroup}>
                <ul className="leftchat__list">
                  <h3 className="leftchat__groupHeading">Group Information</h3>
                  <label className="leftchat__label">Enter Group Name:</label>
                  <li className="leftchat__searchbar">
                    <span className="material-symbols-outlined leftchat__icon">
                      group
                    </span>
                    <input
                      type="text"
                      placeholder="Group Name"
                      value={groupInfo.name}
                      onChange={(e) => {
                        setGroupInfo((prev) => ({
                          ...prev,
                          groupName: e.target.value,
                        }));
                      }}
                    />
                  </li>
                  <label className="leftchat__label">
                    Enter Group Description:
                  </label>
                  <li className="leftchat__searchbar">
                    <span className="material-symbols-outlined leftchat__icon">
                      description
                    </span>
                    <Textarea
                      minRows={4}
                      value={groupInfo.description}
                      onChange={(e) => {
                        setGroupInfo((prev) => ({
                          ...prev,
                          groupDescription: e.target.value,
                        }));
                      }}
                      sx={{
                        "--Textarea-focusedInset": "var(--0, )",
                        "--Textarea-focusedThickness": "0",
                        "--Textarea-focusedHighlight": "white",
                      }}
                      placeholder=""
                      style={{
                        backgroundColor: "#F3F3F3",
                        border: "none",
                        marginLeft: "0",
                        width: "243px",
                      }}
                      size="lg"
                      // variant="soft"
                    />
                  </li>
                  <label className="leftchat__label">
                    Select Group Members:
                  </label>
                  <li className="leftchat__searchbar">
                    <span className="material-symbols-outlined leftchat__icon">
                      person_add
                    </span>
                    <input
                      type="text"
                      value={searchFriends}
                      onChange={handleSearchFriends}
                      placeholder="Search Friend"
                    />
                  </li>
                  <li>
                    <div className="members__grid">
                      {groupInfo?.groupMembers.map((member, idx) => (
                        <>
                          <span
                            key={idx}
                            className="group__members__listelement"
                            onClick={() => {
                              setGroupInfo((prev) => ({
                                ...prev,
                                groupMembers: prev.groupMembers.filter(
                                  (usr) => usr.userId !== member.userId
                                ),
                              }));
                            }}
                          >
                            {member.name}
                          </span>
                        </>
                      ))}
                    </div>
                  </li>
                  {searchFriendsResult.length > 0 &&
                    searchFriendsResult.map((usr, idx) => (
                      <li
                        key={idx}
                        onClick={() => {
                          if (
                            groupInfo.groupMembers.some(
                              (usrr) => usrr.userId === usr.userId
                            )
                          ) {
                            toast.warning("User already added to the Group.");
                          } else {
                            setGroupInfo((prev) => ({
                              ...prev,
                              groupMembers: [...prev.groupMembers, usr],
                            }));
                          }
                          setSearchFriends("");
                          setSearchFriendsResult([]);
                        }}
                        className="leftchat__chat group__members"
                      >
                        <div className="leftchat__chatcard">
                          <div className="leftchat__chatcard__left"></div>
                          <div className="leftchat__chatcard__right">
                            <div className="leftchat__chatcard__right__row1">
                              <span className="leftchat__chatcard__right__row1__name">
                                {usr?.name}
                              </span>
                              <span className="leftchat__chatcard__right__row1__time">
                                12m
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  <Button
                    className="create__group__btn"
                    variant="outlined"
                    type="submit"
                  >
                    Create Group
                  </Button>
                </ul>
              </form>
            </div>
          )}
        </div>
      )}
      {activeMenu === "notifications" && (
        <div className="leftchat__outer">
          <div className="leftchat__top">
            <div className="leftchat__top__left">
              <span className="leftchat__top__heading">Notifications</span>
            </div>
          </div>

          <div className="leftchat__bottom">
            <ul className="leftchat__list">
              <li className="leftchat__searchbar">
                <span className="material-symbols-outlined leftchat__icon">
                  search
                </span>
                <input type="text" placeholder="Search chat" />
              </li>

              <li className="leftchat__chat">
                <div className="leftchat__chatcard">
                  <div className="leftchat__chatcard__left"></div>
                  <div className="leftchat__chatcard__right">
                    <div className="leftchat__chatcard__right__row1">
                      <span className="leftchat__chatcard__right__row1__name">
                        Ashish Kumar
                      </span>
                      <span className="leftchat__chatcard__right__row1__time">
                        12m
                      </span>
                    </div>

                    <div className="leftchat__chatcard__right__row2">
                      <span>Ha ha baba Black Sheep</span>
                    </div>
                    <div className="leftchat__chatcard__right__row3">
                      {" "}
                      <span>Question</span>
                      <span>Help Wanted</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftChat;

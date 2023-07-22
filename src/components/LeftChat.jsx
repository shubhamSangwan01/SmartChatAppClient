import React from "react";
import "../styles/leftchat.css";
import { Button, Textarea } from "@mui/joy";
import { toast } from "react-toastify";

const LeftChat = ({
  activeMenu,
  activeSettingsMenu,
  setActiveSettingsMenu,
  rescentChats,
  handleChangeActiveChat,
  searchFriendsResult,
  searchChats,
  searchFriends,
  handleSearchChats,
  handleSearchFriends,
  setSearchFriends,
  unreadUsers,
  createGroup,
  setCreateGroup,
  groupInfo,
  setSearchFriendsResult,
  setGroupInfo,
  handleCreateGroup
}) => {
  console.log(activeSettingsMenu)
  return (
    <>
      {activeMenu === "messages" && (
        <>
        <div className="leftchat__outer">
          <div className="leftchat__top">
            <div className="leftchat__top__left">
              <span className="leftchat__top__heading">Messages</span>
              {/*<span
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
            <div className="leftchat__top__right">
              <span
                id="leftchat__plusIcon"
                className="material-symbols-outlined"
              >
                add
              </span>
            </div>
          </div>

          <div className="leftchat__bottom">
            <ul className="leftchat__list">
              <li className="leftchat__searchbar">
                <span
                  
                  className="material-symbols-outlined leftchat__icon"
                >
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
                <li key={idx} className="leftchat__chat">
                  <div className="leftchat__chatcard">
                    <div className="leftchat__chatcard__left"></div>
                    <div className="leftchat__chatcard__right">
                      <div className="leftchat__chatcard__right__row1">
                        <span className="leftchat__chatcard__right__row1__name">
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
            </ul>
          </div>
        </div>
        </>
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
                <span
                  
                  className="material-symbols-outlined leftchat__icon"
                >
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

          {createGroup ? (
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
                      {groupInfo?.groupMembers.map((member,idx) => (
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
                  <Button className="create__group__btn" variant="outlined" type="submit">
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
                <span
                  
                  className="material-symbols-outlined leftchat__icon"
                >
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
      {activeMenu === "settings" && (
        <div className="leftchat__outer">
          <div className="leftchat__top">
            <div className="leftchat__top__left">
              <span className="leftchat__top__heading">Settings</span>
            </div>
          </div>
          <div className="leftchat__bottom">
            <div className="Settings__categories__container">
              <div className="Settings__categories">
                <span className="Settings__categories__heading">Account</span>
                <div className="Settings__subCategories__container">
                  <div className={activeSettingsMenu==='profile'?"Settings__subCategories active":"Settings__subCategories"} onClick={()=>{setActiveSettingsMenu('profile')}}>
                    <span class="material-symbols-outlined Settings__subCategories__image">person</span>
                    <span className="Settings__subCategories__text">Profile</span>
                  </div>
                  <div className={activeSettingsMenu==='security'?"Settings__subCategories active":"Settings__subCategories"} onClick={()=>{setActiveSettingsMenu('security')}}>
                    <span class="material-symbols-outlined Settings__subCategories__image">privacy_tip</span>
                    <span className="Settings__subCategories__text">Security</span>
                  </div>
                  <div className={activeSettingsMenu==='notifications'?"Settings__subCategories active":"Settings__subCategories"} onClick={()=>{setActiveSettingsMenu('notifications')}}>
                    <span class="material-symbols-outlined Settings__subCategories__image">notifications</span>
                    <span className="Settings__subCategories__text">Notifications</span>
                  </div>
                  <div className={activeSettingsMenu==='privacy'?"Settings__subCategories active":"Settings__subCategories"} onClick={()=>{setActiveSettingsMenu('privacy')}}>
                    <span class="material-symbols-outlined Settings__subCategories__image">lock</span>
                    <span className="Settings__subCategories__text">Privacy</span>
                  </div>
                </div>
              </div>
              <div className="Settings__categories">
                <span className="Settings__categories__heading">Suppport & About</span>
                <div className="Settings__subCategories__container">
                  <div className={activeSettingsMenu==='support'?"Settings__subCategories active":"Settings__subCategories"} onClick={()=>{setActiveSettingsMenu('support')}}>
                    <span class="material-symbols-outlined Settings__subCategories__image">help</span>
                    <span className="Settings__subCategories__text">Help & Support</span>
                  </div>
                  <div className={activeSettingsMenu==='policies'?"Settings__subCategories active":"Settings__subCategories"} onClick={()=>{setActiveSettingsMenu('policies')}}>
                    <span class="material-symbols-outlined Settings__subCategories__image">info</span>
                    <span className="Settings__subCategories__text">Terms and Policies</span>
                  </div>
                </div>
              </div>
              <div className="Settings__categories">
                <span className="Settings__categories__heading">Actions</span>
                <div className="Settings__subCategories__container">
                  <div className={activeSettingsMenu==='report'?"Settings__subCategories active":"Settings__subCategories"} onClick={()=>{setActiveSettingsMenu('report')}}>
                    <span class="material-symbols-outlined Settings__subCategories__image">flag</span>
                    <span className="Settings__subCategories__text">Report a problem</span>
                  </div>
                  <div className={activeSettingsMenu==='log_out'?"Settings__subCategories active":"Settings__subCategories"} onClick={()=>{setActiveSettingsMenu('log_out')}}>
                    <span class="material-symbols-outlined Settings__subCategories__image">logout</span>
                    <span className="Settings__subCategories__text">Log out</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeftChat;

import React from 'react'
import '../styles/leftchat.css'

const LeftChat = ({activeMenu,rescentChats,handleChangeActiveChat,searchFriendsResult,searchChats,searchFriends,handleSearchChats,handleSearchFriends}) => {
    
    
 
    return (
    <>
   {activeMenu==='messages' && <div className='leftchat__outer'>

   <div className='leftchat__top'>

       <div className='leftchat__top__left'>
         <span className='leftchat__top__heading'>Messages</span>
         <span id='leftchat__expandIcon' className="material-symbols-outlined">expand_more</span>
         <span className='leftchat__top__left__unreadMessages'>12</span>
       </div>
       <div className='leftchat__top__right'>
          <span id='leftchat__plusIcon' className="material-symbols-outlined">
             add
          </span>
       </div>
       
   </div>

   <div className='leftchat__bottom'>
        <ul className='leftchat__list'>

           <li className='leftchat__searchbar'>
              <span id='leftchat__searchIcon' className="material-symbols-outlined">
                 search
              </span>
              <input value={searchChats} onChange={handleSearchChats} type="text" placeholder='Search chat' />
           </li>

           {rescentChats.map((chat,idx)=>(<li key={idx} className='leftchat__chat'>
               <div className='leftchat__chatcard'>
                   <div className='leftchat__chatcard__left'>

                   </div>
                   <div className='leftchat__chatcard__right'>

                       <div className='leftchat__chatcard__right__row1'>
                           <span className='leftchat__chatcard__right__row1__name'>{chat?.name}</span>
                           <span className='leftchat__chatcard__right__row1__time'>12m</span>
                       </div>

                       <div className='leftchat__chatcard__right__row2'>
                           <span>Ha ha baba Black Sheep</span>
                       </div>
                       <div className='leftchat__chatcard__right__row3'> <span>
                               Question
                            </span>
                        </div>
                            
                   </div>

               </div>
           </li>))}

           

        </ul>
   </div>
</div>} 

   {activeMenu==='addFriends' &&   <div className='leftchat__outer'>

<div className='leftchat__top'>

    <div className='leftchat__top__left'>
      <span className='leftchat__top__heading'>Search Friends</span>
      
    </div>
    
    
</div>

<div className='leftchat__bottom'>
     <ul className='leftchat__list'>

        <li className='leftchat__searchbar'>
           <span id='leftchat__searchIcon' className="material-symbols-outlined">
              search
           </span>
           <input value={searchFriends} onChange={handleSearchFriends} type="text" placeholder='Search' />
        </li>
       {searchFriendsResult.length>0 && searchFriendsResult.map((usr,idx)=>
        ( <li key={idx} onClick={()=>{handleChangeActiveChat(usr)}} className='leftchat__chat'>
        <div className='leftchat__chatcard'>
            <div className='leftchat__chatcard__left'>

            </div>
            <div className='leftchat__chatcard__right'>

                <div className='leftchat__chatcard__right__row1'>
                    <span className='leftchat__chatcard__right__row1__name'>{usr?.name}</span>
                    <span className='leftchat__chatcard__right__row1__time'>12m</span>
                </div>      
            </div>

        </div>
    </li>))}
       

     </ul>
</div>
</div> }
  {activeMenu==='createGroup' && <div className='leftchat__outer'>

<div className='leftchat__top'>

    <div className='leftchat__top__left'>
      <span className='leftchat__top__heading'>Create Group</span>
      
    </div>
    <div className='leftchat__top__right'>
       <span id='leftchat__plusIcon' className="material-symbols-outlined">
          add
       </span>
    </div>
    
</div>

<div className='leftchat__bottom'>
     <ul className='leftchat__list'>

        <li className='leftchat__searchbar'>
           <span id='leftchat__searchIcon' className="material-symbols-outlined">
              search
           </span>
           <input type="text" placeholder='Search chat' />
        </li>
        
        <li className='leftchat__chat'>
            <div className='leftchat__chatcard'>
                <div className='leftchat__chatcard__left'>

                </div>
                <div className='leftchat__chatcard__right'>

                    <div className='leftchat__chatcard__right__row1'>
                        <span className='leftchat__chatcard__right__row1__name'>Ashish Kumar</span>
                        <span className='leftchat__chatcard__right__row1__time'>12m</span>
                    </div>

                    <div className='leftchat__chatcard__right__row2'>
                        <span>Ha ha baba Black Sheep</span>
                    </div>
                    <div className='leftchat__chatcard__right__row3'> <span>
                            Question
                         </span>
                         <span>
                            Help Wanted
                         </span></div>
                         
                </div>

            </div>
        </li>

     </ul>
</div>
</div>}
{activeMenu==='notifications' && <div className='leftchat__outer'>

<div className='leftchat__top'>

    <div className='leftchat__top__left'>
      <span className='leftchat__top__heading'>Notifications</span>
      
    </div>
    
    
</div>

<div className='leftchat__bottom'>
     <ul className='leftchat__list'>

        <li className='leftchat__searchbar'>
           <span id='leftchat__searchIcon' className="material-symbols-outlined">
              search
           </span>
           <input type="text" placeholder='Search chat' />
        </li>
        
        <li className='leftchat__chat'>
            <div className='leftchat__chatcard'>
                <div className='leftchat__chatcard__left'>

                </div>
                <div className='leftchat__chatcard__right'>

                    <div className='leftchat__chatcard__right__row1'>
                        <span className='leftchat__chatcard__right__row1__name'>Ashish Kumar</span>
                        <span className='leftchat__chatcard__right__row1__time'>12m</span>
                    </div>

                    <div className='leftchat__chatcard__right__row2'>
                        <span>Ha ha baba Black Sheep</span>
                    </div>
                    <div className='leftchat__chatcard__right__row3'> <span>
                            Question
                         </span>
                         <span>
                            Help Wanted
                         </span></div>
                         
                </div>

            </div>
        </li>

     </ul>
</div>
</div>}
{activeMenu==='settings' && <div className='leftchat__outer'>

<div className='leftchat__top'>

    <div className='leftchat__top__left'>
      <span className='leftchat__top__heading'>Settings</span>
      
    </div>
    
    
</div>

<div className='leftchat__bottom'>
     
</div>
</div>}
</> 
  )
}

export default LeftChat
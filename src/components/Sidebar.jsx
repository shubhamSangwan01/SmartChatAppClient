import React from 'react'
import '../styles/Sidebar.css'


const Sidebar = ({user,activeMenu,setActiveMenu}) => {
  return (
    <div className='chat__sidebar'>
            <div className='chat__sidebar__top'>
            <span className="avatar">
             {user?.name[0].toUpperCase()}
             </span>
             
             
            
               <span className={activeMenu==='messages'?"material-symbols-outlined active":"material-symbols-outlined"} onClick={()=>{setActiveMenu('messages')}} >
               forum
               </span>

               <span className={activeMenu==='addFriends'?"material-symbols-outlined active":"material-symbols-outlined"} onClick={()=>{setActiveMenu('addFriends')}}>
               person_add
               </span>
               <span className={activeMenu==='createGroup'?"material-symbols-outlined active":"material-symbols-outlined"} onClick={()=>{setActiveMenu('createGroup')}}>
               group_add
               </span>
               <span className={activeMenu==='notifications'?"material-symbols-outlined active":"material-symbols-outlined"} onClick={()=>{setActiveMenu('notifications')}}>
               notifications
               </span>
               </div>
            <div className='chat__sidebar__bottom'>
            <span className="material-symbols-outlined">
            settings
            </span>
            </div>

    </div>
  )
}

export default Sidebar
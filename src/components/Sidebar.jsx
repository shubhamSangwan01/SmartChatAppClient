import React from 'react'
import '../styles/Sidebar.css'


const Sidebar = () => {
  return (
    <div className='chat__sidebar'>
            <div className='chat__sidebar__top'>
            <span class="avatar material-symbols-outlined">
             account_circle
             </span>
             
              <span class="material-symbols-outlined">
                home
              </span>
            
               <span class="material-symbols-outlined">
               forum
               </span>
            
               <span class="material-symbols-outlined">
               search
               </span>
               </div>
            <div className='chat__sidebar__bottom'>
            <span class="material-symbols-outlined">
            settings
            </span>
            </div>

    </div>
  )
}

export default Sidebar
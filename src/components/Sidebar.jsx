import React from 'react'
import '../styles/Sidebar.css'


const Sidebar = () => {
  return (
    <div className='chat__sidebar'>
        <ul className='chat__sidebar__list'>
            <div className='chat__sidebar__top'>
            <li id='chat__sidebar__avatar'>
            <span class="material-symbols-outlined">
             account_circle
             </span>
             </li>
        
            <li className='chat__sidebar__middleicons'>
              <span class="material-symbols-outlined">
                home
              </span>
            </li>
            <li className='chat__sidebar__middleicons'>
               <span class="material-symbols-outlined">
               forum
               </span>
            </li>
            <li className='chat__sidebar__middleicons'>
               <span class="material-symbols-outlined">
               search
               </span>
            </li>
            </div>
            <div className='chat__sidebar__bottom'>
            <li id='chat__sidebar__settings'>
            <span class="material-symbols-outlined">
            settings
            </span>
            </li>
            </div>
        </ul>

    </div>
  )
}

export default Sidebar
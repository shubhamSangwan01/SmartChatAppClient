import React from 'react'
import '../styles/leftchat.css'

const LeftChat = () => {
  return (
    <div className='leftchat__outer'>

        <div className='leftchat__top'>

            <div className='leftchat__top__left'>
              <span className='leftchat__top__heading'>Messages</span>
              <span id='leftchat__expandIcon' class="material-symbols-outlined">expand_more</span>
              <span className='leftchat__top__left__unreadMessages'>12</span>
            </div>
            <div className='leftchat__top__right'>
               <span id='leftchat__plusIcon' class="material-symbols-outlined">
                  add
               </span>
            </div>
            
        </div>

        <div className='leftchat__bottom'>
             <ul className='leftchat__list'>

                <li className='leftchat__searchbar'>
                   <span id='leftchat__searchIcon' class="material-symbols-outlined">
                      search
                   </span>
                   <input type="text" placeholder='Search messages' />
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
                <li>
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
                <li>
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
                <li>
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
    </div>
  )
}

export default LeftChat
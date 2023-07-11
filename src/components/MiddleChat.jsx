import React from 'react'
import '../styles/middleChat.css'


const MiddleChat = () => {
  return (
    <div className='middlechat__outer'>
      <div className='middlechat__top'>
        <div className='middlechat__top__left'>
          <div className='middlechat__top__left__avatar'>
          
          </div>
          <div className='middlechat__top__left__userInfo'>
              <span className='middlechat__top__left__userInfo__name'>
                Ashish Kumar
              </span>
              <div className='middlechat__top__left__userInfo__status'>
              <span className='middlechat__top__left__userInfo__status__icon'>🟢</span>
              <span className='middlechat__top__left__userInfo__status__text'>Online</span>
              </div>
          </div>
        </div>
        <div className='middlechat__top__right'>
         
         <button>
          <span className="callIcon material-symbols-outlined">
          call
         </span>
         <span className="middlechat__top__right__span">Call</span>
         </button>
        </div>
      </div>

      <div className='middlechat__middle'>

      </div>
      
      <div className='middlechat__bottom'>
        <span class="attachmentIcon material-symbols-outlined">
           attachment
        </span>
        <div className='middlechat__bottom__right'>
          <input type='text' placeholder='Type a message'/>
          <span class="material-symbols-outlined">
            send
          </span>
        </div>
      </div>

    </div>
  )
}

export default MiddleChat
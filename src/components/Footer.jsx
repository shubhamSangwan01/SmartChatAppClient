import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <div className='Footer__outer'>
        <div className='Footer__top'>
            <div className='Footer__left'>
                <ul className='Footer__list'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Blog</li>
                    <li>Pages</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className='Footer__right'>
                <ul className='Footer__list'>
                    <li><img src="/images/facebook_white.png" alt="" /></li>
                    <li><img src="/images/youtube_white.png" alt="" /></li>
                    <li><img src="/images/gmail_white.png" alt="" /></li>
                    <li><img src="/images/linkedIn_white.png" alt="" /></li>
                    <li><img src="/images/whatsapp_white.png" alt="" /></li>
                </ul>
            </div>
        </div>
        <hr/>
        <div className='Footer__bottom'>
            <span>Copyright 2021 , all right reserved</span>
            <span>Privacy policy       Terms & conditions</span>
        </div>
    </div>

  )
}

export default Footer
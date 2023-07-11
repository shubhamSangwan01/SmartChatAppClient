import React from 'react';
import "../styles/Main.css";
import Navbar from '../components/Navbar';

const Main = () => {
  return (
    <div className='main_page'>
      <Navbar/>
      <section className='IntroMain'>
        <div className='IntroMain_text'>
          <h1>Start chatting with <br />customers , anywhere <br />anytime with application</h1>
          <p>Great software that allows you to chat from any <br />place at any time without any interruption.</p>
          <a className='IntroMain_text_button' href="#"><p >Start chatting now!</p></a>
          <div className='IntroMain_text_userStats'>
            <p>User feedback and rating stats</p>
          </div>
        </div>
        <div className='IntroMain_image'>
          <img className='IntroMain_image_front' src="/images/IntroPic.png" alt="" />
          <img className='IntroMain_image_back' src="/images/IntroPicBackground.png" alt="" />
        </div>
      </section>
      <section className='Intro_features'>
        <div>
          <p>Feature for better experience</p>
        </div>
        <div className='Intro_features_details'>
          <div className='Intro_features_card'>
            <div className='Intro_features_cardHeader'>
              <span class="material-symbols-outlined">videocam</span>
              <h3>Video messaging</h3>
            </div>
            <p>This software is very easy for you to manage you can use it as you wish.</p>
          </div>
          <div className='Intro_features_card'>
            <div className='Intro_features_cardHeader'>
              <span class="material-symbols-outlined">videocam</span>
              <h3>Feature1</h3>
            </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, hic!</p>
          </div>
          <div className='Intro_features_card'>
            <div className='Intro_features_cardHeader'>
              <span class="material-symbols-outlined">videocam</span>
              <h3>Feature1</h3>
            </div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, hic!</p>
          </div>
        </div>
        
      </section>
    </div>
  )
}

export default Main
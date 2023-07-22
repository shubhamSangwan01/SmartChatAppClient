import React, { useEffect } from "react";
import "../styles/Main.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



const Main = () => {
  useEffect(()=>{
    let IntroMain_text_h1 = document.getElementById('IntroMain_text_h1');
    let IntroMain_text_p = document.getElementById('IntroMain_text_p');
    let IntroMain_text_button = document.getElementById('IntroMain_text_button');
    let IntroMain_text_userStats = document.getElementById('IntroMain_text_userStats');
    let IntroMain_image_front = document.getElementById('IntroMain_image_front');
    let IntroMain_image_back = document.getElementById('IntroMain_image_back');
    let Intro_features_card = document.getElementById('Intro_features_card');
    let Intro_features_card2 = document.getElementById('Intro_features_card2');
    let Intro_features_card3 = document.getElementById('Intro_features_card3');
    let Intro_uniqueFeatures_card_image = document.getElementById('Intro_uniqueFeatures_card_image');
    let Intro_uniqueFeatures_card_image2 = document.getElementById('Intro_uniqueFeatures_card_image2');
    let Intro_uniqueFeatures_card_image3 = document.getElementById('Intro_uniqueFeatures_card_image3');
    // let Navbar__outer = document.getElementById('Navbar__outer');
    

    window.addEventListener('scroll',function(){
    let value = window.scrollY;
    
    // Navbar__outer.style.left = value * 0.25 -300 + "px";
    IntroMain_text_h1.style.right = value * 0.25 + "px";
    IntroMain_text_p.style.right = value * 0.25 + "px";
    IntroMain_text_button.left = value * 0.25 + "px";
    IntroMain_text_userStats.width = 1- value * 0.25  + "%";
    IntroMain_image_front.style.opacity = 1-value/500;
    IntroMain_image_back.style.opacity = 1-value/200;
    Intro_features_card.style.transform = "scale(" + (0.7 + value/2500) + ")";
    Intro_features_card2.style.transform = "scale(" + (0.7 + value/2500) + ")";
    Intro_features_card3.style.transform = "scale(" + (0.7 + value/2500) + ")";
    Intro_uniqueFeatures_card_image.style.left = value * 0.25 -200 + "px";
    Intro_uniqueFeatures_card_image2.style.right = value * 0.25 -200 + "px";
    Intro_uniqueFeatures_card_image3.style.left = value * 0.25 -300 + "px";
    
    })
  },[])

  return (
    <div className="main_page">
      <Navbar />
      <section className="IntroMain" id="IntroMain">
        <div className="IntroMain_text">
          <h1 id="IntroMain_text_h1">
            Start chatting with <br />
            customers , anywhere <br />
            anytime with application
          </h1>
          <p id="IntroMain_text_p">
            Great software that allows you to chat from any <br />
            place at any time without any interruption.
          </p>
          <a id="IntroMain_text_button" className="IntroMain_text_button" href="#">
            <p>Start chatting now!</p>
          </a>
          <div id="IntroMain_text_userStats" className="IntroMain_text_userStats">
            <p>User feedback and rating stats</p>
          </div>
        </div>
        <div className="IntroMain_image">
          <img
            id="IntroMain_image_front"
            className="IntroMain_image_front"
            src="/images/IntroPic.png"
            alt=""
          />
          <img
            id="IntroMain_image_back"
            className="IntroMain_image_back"
            src="/images/IntroPicBackground.png"
            alt=""
          />
        </div>
      </section>
      <section className="Intro_features" id="Intro_features">
        <div className="Intro_features_hearder">
          <span>Feature for better experience</span>
        </div>
        <div className="Intro_features_details">
          <div id="Intro_features_card" className="Intro_features_card">
            <div className="Intro_features_cardHeader">
              <span className="material-symbols-outlined">videocam</span>
              <h3>Video messaging</h3>
            </div>
            <p>
              This software is very easy for you to manage you can use it as you
              wish.
            </p>
          </div>
          <div id="Intro_features_card2" className="Intro_features_card">
            <div className="Intro_features_cardHeader">
              <span className="material-symbols-outlined">verified_user</span>
              <h3>Secure & private</h3>
            </div>
            <p>
              This software is very easy for you to manage you can use it as you
              wish.
            </p>
          </div>
          <div id="Intro_features_card3" className="Intro_features_card">
            <div className="Intro_features_cardHeader">
              <span className="material-symbols-outlined">schedule</span>
              <h3>Save time</h3>
            </div>
            <p>
              This software is very easy for you to manage you can use it as you
              wish.
            </p>
          </div>
        </div>
      </section>
      <section className="Intro_uniqueFeatures" id="Intro_uniqueFeatures">
        <div>
        <div className="Intro_uniqueFeatures_card">
          <div id="Intro_uniqueFeatures_card_image" className="Intro_uniqueFeatures_card_image">
            <img src="/images/VideoCalling.png" alt="Videocalling" />
          </div>
          <div className="Intro_uniqueFeatures_card_text">
            <span className="Intro_uniqueFeatures_card_text_header">Real time subtitiles for your video calls</span>
            <span className="Intro_uniqueFeatures_card_text_details">Great software that allows you to chat from any place at any time without any interruption.</span>
            <span className="Intro_uniqueFeatures_card_text_details">Great software that allows you to chat from any place at any time without any interruption.Great software that allows you to chat from any place at any time without any interruption.</span>
          </div>
        </div>
        <div className="Intro_uniqueFeatures_card">
          <div className="Intro_uniqueFeatures_card_text">
            <span className="Intro_uniqueFeatures_card_text_header">Message & Text summary using Artificial Intelligence</span>
            <span className="Intro_uniqueFeatures_card_text_details">Great software that allows you to chat from any place at any time without any interruption.</span>
            <span className="Intro_uniqueFeatures_card_text_details">Great software that allows you to chat from any place at any time without any interruption.Great software that allows you to chat from any place at any time without any interruption.</span>
          </div>
          <div id="Intro_uniqueFeatures_card_image2" className="Intro_uniqueFeatures_card_image">
            <img src="/images/UniqueFeature2.png" alt="UniqueFeature2" />
          </div>
        </div>
        <div className="Intro_uniqueFeatures_card">
          <div id="Intro_uniqueFeatures_card_image3" className="Intro_uniqueFeatures_card_image">
            <img src="/images/UniqueFeature3.png" alt="UniqueFeature2" />
          </div>
          <div className="Intro_uniqueFeatures_card_text">
            <span className="Intro_uniqueFeatures_card_text_header">AI reaction suggester</span>
            <span className="Intro_uniqueFeatures_card_text_details">Great software that allows you to chat from any place at any time without any interruption.</span>
            <span className="Intro_uniqueFeatures_card_text_details">Great software that allows you to chat from any place at any time without any interruption.Great software that allows you to chat from any place at any time without any interruption.</span>
          </div>
        </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Main;

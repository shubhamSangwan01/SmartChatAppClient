import React from "react";
import "../styles/Main.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div className="main_page">
      <Navbar />
      <section className="IntroMain">
        <div className="IntroMain_text">
          <h1>
            Start chatting with <br />
            customers , anywhere <br />
            anytime with application
          </h1>
          <p>
            Great software that allows you to chat from any <br />
            place at any time without any interruption.
          </p>
          <a className="IntroMain_text_button" href="#">
            <p>Start chatting now!</p>
          </a>
          <div className="IntroMain_text_userStats">
            <p>User feedback and rating stats</p>
          </div>
        </div>
        <div className="IntroMain_image">
          <img
            className="IntroMain_image_front"
            src="/images/IntroPic.png"
            alt=""
          />
          <img
            className="IntroMain_image_back"
            src="/images/IntroPicBackground.png"
            alt=""
          />
        </div>
      </section>
      <section className="Intro_features">
        <div className="Intro_features_hearder">
          <span>Feature for better experience</span>
        </div>
        <div className="Intro_features_details">
          <div className="Intro_features_card">
            <div className="Intro_features_cardHeader">
              <span class="material-symbols-outlined">videocam</span>
              <h3>Video messaging</h3>
            </div>
            <p>
              This software is very easy for you to manage you can use it as you
              wish.
            </p>
          </div>
          <div className="Intro_features_card">
            <div className="Intro_features_cardHeader">
              <span class="material-symbols-outlined">verified_user</span>
              <h3>Secure & private</h3>
            </div>
            <p>
              This software is very easy for you to manage you can use it as you
              wish.
            </p>
          </div>
          <div className="Intro_features_card">
            <div className="Intro_features_cardHeader">
              <span class="material-symbols-outlined">schedule</span>
              <h3>Save time</h3>
            </div>
            <p>
              This software is very easy for you to manage you can use it as you
              wish.
            </p>
          </div>
        </div>
      </section>
      <section className="Intro_uniqueFeatures">
        <div>
        <div className="Intro_uniqueFeatures_card">
          <div className="Intro_uniqueFeatures_card_image">
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
          <div className="Intro_uniqueFeatures_card_image">
            <img src="/images/UniqueFeature2.png" alt="UniqueFeature2" />
          </div>
        </div>
        <div className="Intro_uniqueFeatures_card">
          <div className="Intro_uniqueFeatures_card_image">
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

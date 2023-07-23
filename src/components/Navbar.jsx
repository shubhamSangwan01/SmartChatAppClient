import React from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ handleFormTypeChange }) => {
  const isLoginPage = window.location.href.includes("/login");
  const navigate = useNavigate();
  return (

    <div className="Navbar__outer">
      <div className="Navbar__left">
        <ul className="Navbar__list">
          <Link to="/">
            <a href="#IntroMain" id="home">
              Home
            </a>
          </Link>
          <a href="#Intro_features">Features</a>
          <a href="">About Us</a>
          <a href="#Footer__outer">Contact</a>
        </ul>
      </div>
      <div className="Navbar__right">
        <ul className="Navbar__list">
          {isLoginPage && isLoginPage ? (
            <>
              <a
                className="Navbar_button"
                onClick={() => handleFormTypeChange("login")}
              >
                Sign In
              </a>
              <a
                className="Navbar_button"
                onClick={() => handleFormTypeChange("register")}
              >
                Register
              </a>
            </>
          ) : (
            <Link id="login-signup-button" to="/login">
              <a id="login-signup-button" className="Navbar_button">
                Login/Signup
              </a>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

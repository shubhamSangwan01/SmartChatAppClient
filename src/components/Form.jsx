import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "../styles/loginForm.css";

const Form = ({
  formType,
  loginFormData,
  handleLoginFormChange,
  signupFormData,
  handleSignupFormChange,
  handleLoginSubmit,
  handleSignupSubmit,
}) => {
  return (
    <div className="loginForm__outer">
      {formType == "login" && (
        <form className="loginForm" onSubmit={handleLoginSubmit}>
          <ul className="loginForm__list">
            <li className="loginForm__input">
              <input
                type="email"
                name="email"
                value={loginFormData.email}
                onChange={handleLoginFormChange}
                placeholder="Enter Email"
              />
              <span className="Icon material-symbols-outlined">cancel</span>
            </li>
            <li className="loginForm__input">
              <input
                type="password"
                name="password"
                value={loginFormData.password}
                onChange={handleLoginFormChange}
                placeholder="Enter Password"
              />
              <span
                className="Icon material-symbols-outlined"
                style={{ color: "#3B0DF4" }}
              >
                visibility_off
              </span>
            </li>
            <li id="loginForm__resetPassword">
              <span>Reset Password ?</span>
            </li>
            <li id="loginForm__signIn">
              <button type="submit">Sign In</button>
            </li>
            <li id="loginForm__line__li">
              <div className="loginForm__line"></div>
              <span>Or continue with</span>
              <div className="loginForm__line"></div>
            </li>
            <li id="loginForm__buttons">
              <ul className="loginForm__buttons__list">
                <li id="google">
                  <img
                    src="/images/google.png"
                    alt="Google"
                    onClick={()=>{console.log("google")}}
                  />
                </li>
                <li id="apple">
                  <img
                    src="/images/apple.png"
                    alt="Google"
                    onClick={()=>{console.log("google")}}
                  />
                </li>
                <li id="facebook">
                  <img
                    src="/images/facebook.png"
                    alt="Google"
                    onClick={()=>{console.log("google")}}
                  />
                </li>
              </ul>
            </li>
          </ul>
        </form>
      )}
      {formType == "register" && (
        <form className="loginForm" onSubmit={handleSignupSubmit}>
          <ul className="loginForm__list">
            <li className="loginForm__input">
              <input
                type="text"
                name="name"
                value={signupFormData.name}
                onChange={handleSignupFormChange}
                placeholder="Enter Name"
              />
              <span className="Icon material-symbols-outlined">cancel</span>
            </li>
            <li className="loginForm__input">
              <input
                type="email"
                name="email"
                value={signupFormData.email}
                onChange={handleSignupFormChange}
                placeholder="Enter Email"
              />
              <span className="Icon material-symbols-outlined">cancel</span>
            </li>
            <li className="loginForm__input">
              <input
                type="password"
                name="password"
                value={signupFormData.password}
                onChange={handleSignupFormChange}
                placeholder="Enter Password"
              />
              <span
                className="Icon material-symbols-outlined"
                style={{ color: "#3B0DF4" }}
              >
                visibility_off
              </span>
            </li>
            <li className="loginForm__input">
              <input
                type="password"
                name="confirmPassword"
                value={signupFormData.confirmPassword}
                onChange={handleSignupFormChange}
                placeholder="Confirm Password"
              />
              <span
                className="Icon material-symbols-outlined"
                style={{ color: "#3B0DF4" }}
              >
                visibility_off
              </span>
            </li>
            <li id="loginForm__resetPassword">
              <span>Reset Password ?</span>
            </li>
            <li id="loginForm__signIn">
              <button type="submit">Sign Up</button>
            </li>
            <li id="loginForm__line__li">
              <div className="loginForm__line"></div>
              <span>Or continue with</span>
              <div className="loginForm__line"></div>
            </li>
            <li id="loginForm__buttons">
              <ul className="loginForm__buttons__list">
                <li id="google">
                  <img src="/images/google.png" alt="Google" />
                </li>
                <li id="apple">
                  <img src="/images/apple.png" alt="Google" />
                </li>
                <li id="facebook">
                  <img src="/images/facebook.png" alt="Google" />
                </li>
              </ul>
            </li>
          </ul>
        </form>
      )}
    </div>
  );
};

export default Form;

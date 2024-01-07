import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Form.css";

const Form = ({
  formType,
  loginFormData,
  handleLoginFormChange,
  signupFormData,
  handleSignupFormChange,
  credentialsFormData,
  handleCredentialsFormChange,
  handleLoginSubmit,
  validateEmail,
  handleSignupSubmit,
  handleCredentialsSubmit
}) => {


  return (
    <>
      {formType == "login" && (

        

        <div className="loginForm__outer">
          <form className="loginForm"
            onSubmit={handleLoginSubmit}
          >
            <ul className="loginForm__list">
              <li className="loginForm__input">
                {/** email input styled with invalid email using tailwind css */}
                <input
                  type="email"
                  className={validateEmail(loginFormData.email)?'':'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'}
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
                    <img src="/images/google.png" alt="Google" onClick={console.log("google")} />
                  </li>
                  <li id="apple">
                    <img src="/images/apple.png" alt="Google" onClick={console.log("google")} />
                  </li>
                  <li id="facebook">
                    <img src="/images/facebook.png" alt="Google" onClick={console.log("google")} />
                  </li>
                </ul>
              </li>
            </ul>
          </form>
        </div>
      )}
      {formType == "register" && (
        <div className="loginForm__outer">
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
                  className={validateEmail(loginFormData.email)?'':'invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500'}
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
        </div>
      )}
      {formType == "credentials" && (
        <form className="CredentialsForm col-span-2"
          onSubmit={handleCredentialsSubmit}
        >
          <div className="profile_options_outer">
            <div className="profile_options_inner">
              <div className="profile_options_image">
                <span>Your profile picture</span>
                <img src="" alt="" />
              </div>
              <div className="profile_options_info">
                <div className="profile_options_info_field">
                  <span>Full Name</span>
                  <div className="profile_options_info_input">
                    <input
                    type="text"
                    name="name"
                    value={credentialsFormData.name}
                    onChange={handleCredentialsFormChange}
                    placeholder="Please enter your full name"
                    />
                  </div>
                </div>
                <div className="profile_options_info_field">
                  <span>Email</span>
                  <div className="profile_options_info_input">
                    <input
                    type="email"
                    name="email"
                    value={credentialsFormData.name}
                    onChange={handleCredentialsFormChange}
                    placeholder="Please enter your email"
                    />
                  </div>
                </div>
                <div className="profile_options_info_field">
                  <span>Username</span>
                  <div className="profile_options_info_input">
                    <input
                    type="text"
                    name="username"
                    value={credentialsFormData.name}
                    onChange={handleCredentialsFormChange}
                    placeholder="Please enter your username"
                    />
                  </div>
                </div>
                <div className="profile_options_info_field">
                  <span>Phone Number</span>
                  <div className="profile_options_info_input">
                    <input
                    type="text"
                    name="phone"
                    value={credentialsFormData.name}
                    onChange={handleCredentialsFormChange}
                    placeholder="Please enter your full phone number"
                    />
                  </div>
                </div>
              </div>
              <div className="profile_options_info_field">
                  <span>Bio</span>
                  <div className="profile_options_info_input bio_field">
                    <input
                    type="text"
                    name="bio"
                    value={credentialsFormData.name}
                    onChange={handleCredentialsFormChange}
                    placeholder="Boast about yourself!"
                    />
                  </div>
                </div>
                <div className="profile_options_button">
                <button type="submit">Update Profile</button>
                <button type="reset">Reset</button>
                </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Form;

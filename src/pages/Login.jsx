import React, { useEffect } from "react";
import "../styles/login.css";
import Navbar from "../components/Navbar";
import Form from "../components/Form";


const Login = () => {
  const [formType, setFormType] = React.useState("login");
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleFormTypeChange = (type) => {
    setFormType(type);
  };

  const [signupFormData, setSignupFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginFormChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignupFormChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login__outer">
      <Navbar handleFormTypeChange={handleFormTypeChange} />
      <section>
        <div className="loginSection_text">
          <div className="loginSection_textBackground1"></div>
          <div className="loginSection_textBackground2"></div>
          <h1>Sign In <br />to Enjoy!</h1>
          <p>If you don't have an account <br />you can Register here!</p>
        </div>
        <div className="loginSection_image">
          <img src="/images/loginMan.png" alt="" />
        </div>
        <div>
          
          <Form
            formType={formType}
            setFormType={setFormType}
            loginFormData={loginFormData}
            setLoginFormData={setLoginFormData}
            signupFormData={signupFormData}
            setSignupFormData={setSignupFormData}
            handleFormTypeChange={handleFormTypeChange}
            handleLoginFormChange={handleLoginFormChange}
            handleSignupFormChange={handleSignupFormChange}
            handleLoginSubmit={handleLoginSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default Login;

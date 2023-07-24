import React, { useEffect } from "react";
import "../styles/login.css";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formType, setFormType] = React.useState("login");
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

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
    setSignupFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (loginFormData.email !== "" && loginFormData.password !== "") {
      const data = await axios.post(
        "smartchatappserver-production.up.railway.app/login",
        loginFormData
      );
      if (data.data.status === 200) {
        toast.success(data.data.message);
        setLoginFormData({ email: "", password: "" });

        sessionStorage.setItem("authToken", data.data.token);
        sessionStorage.setItem("User", JSON.stringify(data.data.user));

        setTimeout(() => {
          navigate("/chat");
        }, 2000);
        // console.log(data);
      } else {
        toast.error(data.data.message);
      }
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupFormData.password !== signupFormData.confirmPassword) {
      toast.error("Passwords must be same!");
    } else if (
      signupFormData.name !== "" &&
      signupFormData.email !== "" &&
      signupFormData.password !== "" &&
      signupFormData.confirmPassword !== ""
    ) {
      const data = await axios.post(
        "smartchatappserver-production.up.railway.app/signup",
        signupFormData
      );
      if (data.data.status == 200) {
        toast.success(data.data.message);
        setSignupFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setFormType("login");
      } else {
        toast.error(data.data.message);
      }
    }
  };

  return (
    <div className="login__outer">
      <Navbar handleFormTypeChange={handleFormTypeChange} />
      <section>
        <div className="loginSection_text">
          <div className="loginSection_textBackground1"></div>
          <div className="loginSection_textBackground2"></div>
          <h1>
            Sign In <br />
            to Enjoy!
          </h1>
          <p>
            If you don't have an account <br />
            you can Register here!
          </p>
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
            handleSignupSubmit={handleSignupSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default Login;

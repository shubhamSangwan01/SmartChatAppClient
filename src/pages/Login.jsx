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
        "http://localhost:5000/login",
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
  function ValidateEmail(input) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }
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
        "http://localhost:5000/signup",
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
      {/** responsive grid section using tailwind */}
      <section className="container grid lg:grid-cols-3 md:grid-cols-1 justify-center items-center ">
        <div className="loginSection_text">
          <div className="loginSection_textBackground1"></div>
          <div className="loginSection_textBackground2"></div>
          <h1>
            {/** span styling done using tailwind */}
            <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
              <span class="relative text-white">Sign In</span>
            </span>{" "}
            <br />
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
            validateEmail={ValidateEmail}
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

import React, { useEffect } from "react";
import "./Home.css";
import LoginForm from "../../components/loginForm/LoginForm";

const Home = () => {
  useEffect(() => {
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userName");
  }, []);

  return (
    <div className="wrapper">
      <LoginForm></LoginForm>
    </div>
  );
};

export default Home;

import React, { useEffect } from "react";
import "./Home.css";
import LoginForm from "../../components/loginForm/LoginForm";

const Home = () => {
  useEffect(() => {
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
  }, []);

  return (
    <div className="HomeWrapper">
      <LoginForm></LoginForm>
    </div>
  );
};

export default Home;

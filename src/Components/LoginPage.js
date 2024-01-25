import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  const navigate = useNavigate();
  
  async function loginUser(ev) {
    setLoading(true);
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        setTimeout(() => {
          navigate("/");
          setUserInfo(userInfo);
        }, 1000);
        setRedirect(true);
      });
    } else {
      setLoading(false);
      alert("wrong creds !!!");
    }
  }
  if (redirect) {
    // return navigate("/");
  }
  return (
    <div className="login-page">
      <form className="login" onSubmit={loginUser}>
        <h1>Login</h1>
        <input
          className="field"
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          className="field"
          type="password"
          placeholder="pass"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="buttonDes">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

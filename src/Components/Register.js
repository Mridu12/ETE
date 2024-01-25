import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function registerUser(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 200) {
      alert("Reg Failed !!!!");
    } else {
      alert("Reg Succesfull !!!!");
      navigate('/login');
    }
  }

  return (
    <div className="register-page">
      <form className="register" onSubmit={registerUser}>
        <h1>Register</h1>
        <input
          className="field"
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          className="field"
          type="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          placeholder="Email"
        />
        <input
          className="field"
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="buttonDes">Register</button>
      </form>
    </div>
  );
};

export default Register;

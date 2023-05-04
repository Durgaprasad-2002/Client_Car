import React from "react";
import "./signup.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
export default function SignupOwner() {
  const location = useLocation();
  let navigate = useNavigate();
  let [cred, setcred] = useState({
    type: "owner",
    user: "",
    password: "",
  });

  const HandleForm = (e) => {
    setcred((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const post = (e) => {
    e.preventDefault();
    alert("SignUp is Successfull");
    axios.post("https://clean-flip-flops-moth.cyclic.app/postlogcred", {
      cred,
    });
    navigate("/LoginOwner", {});
  };

  return (
    <div className="sign">
      <form className="form">
        <span className="signup">Sign Up</span>
        <input
          type="email"
          placeholder="Email address"
          className="form--input"
          name="user"
          onChange={HandleForm}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form--input"
          onChange={HandleForm}
        />

        <button className="form--submit" onClick={post}>
          Sign up
        </button>
      </form>
    </div>
  );
}

import React from "react";
import "./signup.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "./Alert.js";
export default function Signup() {
  const location = useLocation();
  let navigate = useNavigate();
  let [cred, setcred] = useState({
    type: "user",
    user: "",
    password: "",
  });

  let database = [];
  const getUser = async () => {
    const response = await fetch(
      "https://bbt-server-1lhz.onrender.com/getlogcred",
      {
        method: "GET",
      }
    );
    database = await response.json();
  };

  const HandleForm = (e) => {
    setcred((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const post = async (e) => {
    let sp1 = document.getElementsByClassName("sp1")[0];
    let sp2 = document.getElementsByClassName("sp2")[0];
    sp1.style.display = "none";
    sp2.style.display = "block";
    console.log(cred);
    await axios
      .post("https://bbt-server-1lhz.onrender.com/postlogcred", {
        cred,
      })
      .then((res) => {
        console.log(res);
        if (res?.data?.statUser === "exits") {
          alert("Account Exists");
          sp1.style.display = "block";
          sp2.style.display = "none";
        } else {
          axios
            .put(
              `https://bbt-server-1lhz.onrender.com/signupmail/${cred.user}`,
              {}
            )
            .then((d) => {})
            .catch((err) => {
              console.log(err);
            });
          alert("SignUp Successful");
          navigate("/Login", {});
        }
      })
      .catch(() => {
        sp1.style.display = "block";
        sp2.style.display = "none";
        alert("signup failed");
      });
  };

  function isAlphanumeric(str) {
    const numberRegex = /[0-9]/;
    const alphabetRegex = /[a-zA-Z]/;
    const specialCharRegex = /[^0-9a-zA-Z]/;

    const hasNumber = numberRegex.test(str);
    const hasAlphabet = alphabetRegex.test(str);
    const hasSpecialChar = specialCharRegex.test(str);

    return hasNumber && hasAlphabet && hasSpecialChar;
  }

  const CheckValidity = async (e) => {
    e.preventDefault();
    if (cred.password === "" || cred.user === "") {
      return false;
    }
    if (cred.password.length < 8 || isAlphanumeric(cred.password) == false) {
      alert("Password is weak");
      return false;
    }
    await post();
  };

  return (
    <div className="sign">
      <form className="form" onSubmit={CheckValidity}>
        <span className="signup">Sign Up</span>
        <input
          type="email"
          placeholder="Email address"
          className="form--input"
          name="user"
          onChange={HandleForm}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form--input"
          onChange={HandleForm}
          required
        />

        <button type="button submit" className="form--submit">
          <article className="sp1">Sign Up</article>
          <article className="sp2"></article>
        </button>
      </form>
    </div>
  );
}

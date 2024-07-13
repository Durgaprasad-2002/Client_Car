import Login from "./login";
import Signup from "./signup";
import AppLog from "./AppLog";
import "./App.css";
import { useState } from "react";
import Alert from "./Alert";
import {
  BsLinkedin,
  BsGithub,
  BsFacebook,
  BsTwitter,
  BsWhatsapp,
  BsMailbox,
  BsMailbox2,
  BsPinMapFill,
  BsFile,
} from "react-icons/bs";
export default function App() {
  return (
    <>
      <AppLog />
    </>
  );
}

//---------------Alert Function----------------
// let [alertval, setalert] = useState("");
// let [cal, setcal] = useState(0);
// const call = () => {
//   setcal(cal + 1);
//   setalert("hiii");
// };
// return (
//   <>
//     <br />
//     <button onClick={call}>click</button>
//     <Alert alert={alertval} cal={cal} />
//   </>
// );

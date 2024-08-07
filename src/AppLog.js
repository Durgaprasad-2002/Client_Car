import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import UserDashboard from "./Components/UserDashboard";
import SingleCar from "./Components/SingleCar";
import CarStatus from "./Components/CarStatus";
import ModifyStatus from "./Components/ModifyStatus";
import Feedback from "./Components/Feedback";
import Login from "./login";
import Signup from "./signup";
import OwnerDashBoard from "./Components/OwnerDashBoard";
import SingleOwner from "./Components/SingleOwner";
import ViewStatusOwner from "./Components/ViewStatusOwner";
import ViewHistoryOwner from "./Components/ViewHistoryOwner";
import LoginOwner from "./LoginOwner";
import SignupOwner from "./SignUpOwner";
import AddingCarData from "./Components/AddingCarData";
import Main from "./main";
import NewCar from "./Components/NewCar";
import Loadings from "./Components/Loadings";

export default function AppLog() {
  return (
    <>
      <div style={{ marginTop: "60px" }}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/Login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dash" element={<UserDashboard />} />
            <Route path="/single" element={<SingleCar />} />
            <Route path="/status" element={<CarStatus />} />
            <Route path="/modify" element={<ModifyStatus />} />
            <Route path="/feedback" element={<Feedback />} />

            <Route path="/LoginOwner" index element={<LoginOwner />} />
            <Route path="/SignUpOwner" element={<SignupOwner />} />
            <Route path="/OwnerDash" element={<OwnerDashBoard />} />
            <Route path="/SingleOwner" element={<SingleOwner />} />
            <Route path="/ViewStatusOwner" element={<ViewStatusOwner />} />
            <Route path="/ViewHistory" element={<ViewHistoryOwner />} />
            <Route path="/carDataChange" element={<AddingCarData />} />
            <Route path="/newcar" element={<NewCar />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

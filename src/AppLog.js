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
import Main from "./main";
import Loadings from "./Components/Loadings";
export default function AppLog() {
  return (
    <>
      <div style={{ marginTop: "60px" }}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/Client_Car/Login" element={<Login />} />
            <Route path="/Client_Car/signup" element={<Signup />} />
            <Route path="/Client_Car/dash" element={<UserDashboard />} />
            <Route path="/Client_Car/single" element={<SingleCar />} />
            <Route path="/Client_Car/status" element={<CarStatus />} />
            <Route path="/Client_Car/modify" element={<ModifyStatus />} />
            <Route path="/Client_Car/feedback" element={<Feedback />} />

            <Route
              path="/Client_Car/LoginOwner"
              index
              element={<LoginOwner />}
            />
            <Route path="/Client_Car/SignUpOwner" element={<SignupOwner />} />
            <Route path="/Client_Car/OwnerDash" element={<OwnerDashBoard />} />
            <Route path="/Client_Car/SingleOwner" element={<SingleOwner />} />
            <Route
              path="/Client_Car/ViewStatusOwner"
              element={<ViewStatusOwner />}
            />
            <Route
              path="/Client_Car/ViewHistory"
              element={<ViewHistoryOwner />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

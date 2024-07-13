import React from "react";
import Navbar from "./Navbar";
import "./ModifyStatus.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
export default function ModifyStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;
  let [BookingDetails, setData] = useState({
    car_id:
      location?.state?.car_id || location?.state?.BookingDetails?.car_id || "",
    car_name:
      location?.state?.car_name ||
      location?.state?.BookingDetails?.car_name ||
      "",
    car_image:
      location?.state?.car_image ||
      location?.state?.BookingDetails?.car_image ||
      "",
    car_rent:
      location?.state?.car_rent ||
      location?.state?.BookingDetails?.car_rent ||
      "",
    car_fuel:
      location?.state?.car_fuel ||
      location?.state?.BookingDetails?.car_fuel ||
      "",
    car_seating:
      location?.state?.car_seating ||
      location?.state?.BookingDetails?.car_seating ||
      "",
    car_number:
      location?.state?.car_number ||
      location?.state?.BookingDetails?.car_number ||
      "",
    location:
      location?.state?.location ||
      location?.state?.BookingDetails?.location ||
      "",
    name: location?.state?.name || location?.state?.BookingDetails?.name || "",
    mobil:
      location?.state?.mobil || location?.state?.BookingDetails?.mobil || "",
    address:
      location?.state?.address ||
      location?.state?.BookingDetails?.address ||
      "",
    Date: date || "",
    StartTime:
      location?.state?.StartTime ||
      location?.state?.BookingDetails?.StartTime ||
      "",
    EndTime:
      location?.state?.EndTime ||
      location?.state?.BookingDetails?.EndTime ||
      "",
  });

  const PostData = (e) => {
    let sp1 = document.getElementById("sp1");
    let sp2 = document.getElementById("sp2");
    sp1.style.display = "none";
    sp2.style.display = "block";
    e?.preventDefault();

    axios
      .put(
        `https://bbt-server-1lhz.onrender.com/modifybook/${location?.state?._id}`,
        {
          BookingDetails,
        }
      )
      .then(() => {
        alert("Successfully Updated");
        navigate("/status", {});
      })
      .catch((err) => {
        sp1.style.display = "block";
        sp2.style.display = "none";
        alert("not Updated due to server errors");
      });
  };

  const HandleForm = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e?.target?.name]: e?.target?.value,
    }));
  };

  useEffect(() => {
    let id = document.getElementsByName("car_id")[0];
    let loc = document.getElementsByName("location")[0];
    let fr = document.getElementsByName("StartTime")[0];
    let to = document.getElementsByName("EndTime")[0];
    id.value =
      location?.state?.car_id || location?.state?.BookingDetails?.car_id || "";

    loc.value =
      location?.state?.location ||
      location?.state?.BookingDetails?.location ||
      "";
    fr.value =
      location?.state?.StartTime ||
      location?.state?.BookingDetails?.StartTime ||
      "";
    to.value =
      location?.state?.EndTime ||
      location?.state?.BookingDetails?.EndTime ||
      "";
  }, [location]);

  return (
    <>
      <Navbar />
      <div className="Form-box">
        <div className="BX">
          <form className="MainForm">
            <h3
              style={{
                fontSize: "25px",
                fontStyle: "italic",
                textDecoration: "underline 2px slateblue",
                textUnderlineOffset: "7px",
                marginBottom: "15px",
              }}
            >
              Updating Booking Details
            </h3>
            <input
              className="TitleIn"
              style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
              placeholder="Car Id"
              disabled
            />
            <br />
            <input
              className="ContentIN"
              name="car_id"
              onChange={HandleForm}
              placeholder=""
              disabled
            />
            <br />
            <input className="TitleIn" placeholder="Location" disabled />
            <br />
            <input
              className="ContentIN"
              name="location"
              onChange={HandleForm}
              placeholder=""
            />
            <br />
            <input
              className="TitleIn"
              placeholder="Enter Start Time"
              disabled
            />
            <br />
            <input
              className="ContentIN"
              onChange={HandleForm}
              name="StartTime"
              type="datetime-local"
            />
            <br />
            <input className="TitleIn" placeholder="Enter End Time" disabled />
            <br />
            <input
              className="ContentIN"
              onChange={HandleForm}
              type="datetime-local"
              name="EndTime"
            />
            <br />
          </form>
          <br />
          <button
            className="loadbtn"
            onClick={PostData}
            style={{
              marginInlineStart: "0px",
              marginBottom: "10px",
            }}
          >
            <article id="sp1">Update</article>
            <article id="sp2"></article>
          </button>
        </div>
      </div>
    </>
  );
}

// <div className="modify">
// <div class="form-box">
//   <form class="form">
//     <div class="form-container">
//       <input
//         type="text"
//         class="input pl"
//         placeholder="Car Id"
//         disabled
//       />
//       <input
//         type="text"
//         class="input"
//         name="car_id"
//         onChange={HandleForm}
//         placeholder=""
//         disabled
//       />
//       <input
//         type="text"
//         class="input pl"
//         placeholder="Location"
//         disabled
//       />
//       <input
//         type="text"
//         class="input"
//         name="location"
//         onChange={HandleForm}
//         placeholder=""
//       />
//       <input
//         type="text"
//         class="input pl"
//         placeholder="Enter Start Time"
//         disabled
//       />
//       <input
//         type="datetime-local"
//         class="input"
//         onChange={HandleForm}
//         name="StartTime"
//       />
//       <input
//         type="text"
//         class="input pl"
//         placeholder="Enter End Time"
//         disabled
//       />
//       <input
//         type="datetime-local"
//         class="input"
//         onChange={HandleForm}
//         name="EndTime"
//       />
//     </div>
//     <button onClick={PostData}>Update</button>
//   </form>
// </div>
// </div>

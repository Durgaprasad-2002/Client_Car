import React from "react";
import Navbar from "./Navbar";
import "./ModifyStatus.css";
import { useState } from "react";
export default function ModifyStatus() {
  let [modifiedData, setData] = useState({
    car_id: "",
    location: "",
    fromdate: "",
    todate: "",
  });

  const HandleForm = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="modify">
        <div class="form-box">
          <form class="form">
            <div class="form-container">
              <input
                type="text"
                class="input pl"
                placeholder="Car Id"
                disabled
              />
              <input
                type="text"
                class="input"
                name="car_id"
                onChange={HandleForm}
                placeholder=""
              />
              <input
                type="text"
                class="input pl"
                placeholder="Location"
                disabled
              />
              <input
                type="text"
                class="input"
                name="location"
                onChange={HandleForm}
                placeholder=""
              />
              <input
                type="text"
                class="input pl"
                placeholder="Enter Start Time"
                disabled
              />
              <input
                type="datetime-local"
                class="input"
                onChange={HandleForm}
                name="fromdate"
              />
              <input
                type="text"
                class="input pl"
                placeholder="Enter End Time"
                disabled
              />
              <input
                type="datetime-local"
                class="input"
                onChange={HandleForm}
                name="todate"
              />
            </div>
            <button onClick={console.log(modifiedData)}>Update</button>
          </form>
        </div>
      </div>
    </>
  );
}

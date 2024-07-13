import React from "react";
import NavbarOwner from "./NavbarOwner";
import "./Adding.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export default function NewCar() {
  let navigate = useNavigate();

  let [carData, setcarData] = useState({
    car_name: "",
    car_image: "",
    car_rent: "",
    car_fuel: "",
    car_seating: "",
    car_number: "",
    car_status: "Available",
  });

  const HandleForm = (e) => {
    setcarData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const PostData = () => {
    let sp1 = document.getElementById("sp1");
    let sp2 = document.getElementById("sp2");
    sp1.style.display = "none";
    sp2.style.display = "block";
    axios
      .post(`https://bbt-server-1lhz.onrender.com/postcardata`, {
        carData,
      })
      .then((d) => {
        alert("Successfully Created");

        navigate("/OwnerDash", {});
      })
      .catch((err) => {
        sp1.style.display = "block";
        sp2.style.display = "none";
        alert("not Updated due to server errors");
      });
  };

  return (
    <>
      <NavbarOwner />
      <div className="Form-box">
        <div className="BX">
          <form className="MainForm">
            <h3
              style={{
                fontSize: "25px",
                fontStyle: "italic",
                textDecoration: "underline 2px slateblue",
              }}
            >
              Add New Car
            </h3>
            <input
              className="TitleIn"
              placeholder="Car Name"
              disabled
              style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            />
            <br />
            <input
              className="ContentIN"
              name="car_name"
              onChange={HandleForm}
              placeholder=""
            />
            <br />

            <input className="TitleIn" placeholder="car_rent" disabled />
            <br />
            <input
              className="ContentIN"
              name="car_rent"
              onChange={HandleForm}
              placeholder=""
            />
            <br />

            <input className="TitleIn" placeholder="car fuel type" disabled />
            <br />
            <input
              className="ContentIN"
              onChange={HandleForm}
              name="car_fuel"
            />
            <br />

            <input className="TitleIn" placeholder="car_seating" disabled />
            <br />
            <input
              className="ContentIN"
              onChange={HandleForm}
              name="car_seating"
            />
            <br />

            <input className="TitleIn" placeholder="car_number" disabled />
            <br />
            <input
              className="ContentIN"
              onChange={HandleForm}
              name="car_number"
            />
            <br />

            <input
              className="TitleIn"
              placeholder="car_image (URL Only)"
              disabled
            />
            <br />
            <input
              className="ContentIN"
              onChange={HandleForm}
              name="car_image"
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
            <article id="sp1">Create</article>
            <article id="sp2"></article>
          </button>
        </div>
      </div>
    </>
  );
}

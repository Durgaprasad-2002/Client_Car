import React from "react";
import NavbarOwner from "./NavbarOwner";
import "./Adding.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export default function AddingCarData() {
  let location = useLocation();
  let navigate = useNavigate();

  let [carData, setcarData] = useState({
    car_name: location?.state?.car_name || location?.state?.carData.car_name,
    car_image: location?.state?.car_image || location?.state?.carData.car_image,
    car_rent: location?.state?.car_rent || location?.state?.carData.car_rent,
    car_fuel: location?.state?.car_fuel || location?.state?.carData.car_fuel,
    car_seating:
      location?.state?.car_seating || location?.state?.carData.car_seating,
    car_number:
      location?.state?.car_number || location?.state?.carData.car_number,
    car_status:
      location?.state?.car_status || location?.state?.carData.car_status,
  });

  useEffect(() => {
    let name = document.getElementsByName("car_name")[0];
    let img = document.getElementsByName("car_image")[0];
    let rent = document.getElementsByName("car_rent")[0];
    let fuel = document.getElementsByName("car_fuel")[0];
    let seating = document.getElementsByName("car_seating")[0];
    let number = document.getElementsByName("car_number")[0];

    let stat = document.getElementsByName("car_status")[0];
    stat.value =
      location?.state?.car_status || location?.state?.carData.car_status;
    name.value = location?.state?.car_name || location?.state?.carData.car_name;
    img.value =
      location?.state?.car_image || location?.state?.carData.car_image;
    rent.value = location?.state?.car_rent || location?.state?.carData.car_rent;
    fuel.value = location?.state?.car_fuel || location?.state?.carData.car_fuel;
    seating.value =
      location?.state?.car_seating || location?.state?.carData.car_seating;
    number.value =
      location?.state?.car_number || location?.state?.carData.car_number;
  }, [location]);

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

      .put(
        `https://bbt-server-1lhz.onrender.com/modifycar/${location?.state?._id}`,
        {
          carData,
        }
      )
      .then((d) => {
        alert("Successfully Updated");
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
              Updating Car Data
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
              disabled
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
            <input className="TitleIn" placeholder="car_status" disabled />
            <br />
            <input
              className="ContentIN"
              name="car_status"
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

            <input className="TitleIn" placeholder="car_image" disabled />
            <br />
            <input
              className="ContentIN"
              onChange={HandleForm}
              name="car_image"
              disabled
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

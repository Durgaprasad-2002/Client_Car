import React from "react";
import "./singleCar.css";
import Loadings from "./Loadings";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Footer from "./Footer";
import Navbar from "./Navbar";
import $, { post } from "jquery";
import Popper from "popper.js";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
export default function SingleCar() {
  let [Rent, setRent] = useState(0);
  let [col, setcol] = useState("black");

  const UpdateRent = (val) => {
    setRent(val * location.state.car_rent);
  };

  const location = useLocation();

  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  useEffect(() => {
    let bt = document.getElementById("tog");
    if (location.state.car_status.trim() == "Available") {
      setcol("green");
      bt.disabled = false;
    } else if (location.state.car_status.trim() === "Booked") {
      setcol("red");
      bt.disabled = true;
    }
  }, [location]);

  let [BookingDetails, SetBookingDetails] = useState({
    car_id: location?.state?._id,
    car_name: location?.state?.car_name,
    car_image: location?.state?.car_image,
    car_rent: Rent?.toString(),
    car_fuel: location?.state?.car_fuel,
    car_seating: location?.state?.car_seating,
    car_number: location?.state?.car_number,
    location: "",
    name: "",
    mobil: "",
    address: localStorage.getItem("userMail"),
    Date: date,
    StartTime: "",
    EndTime: "",
  });

  let [carData, setcar] = useState({
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

  const Calcrent = () => {
    let St = document.getElementsByName("StartTime")[0].value.split("T")[0];

    let En = document.getElementsByName("EndTime")[0].value.split("T")[0];

    if (En != "") {
      const oneDay = 24 * 60 * 60 * 1000;

      const parsedDate1 = new Date(St);
      const parsedDate2 = new Date(En);

      const timeDifference = Math.abs(parsedDate2 - parsedDate1);
      const daysDifference = Math.round(timeDifference / oneDay);
      UpdateRent(daysDifference + 1);
    }
  };

  const HandleForm = (e) => {
    SetBookingDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    Calcrent();
  };
  let navigate = useNavigate();

  const PostCar = async () => {
    console.log(carData);
    await axios
      .put(
        `https://bbt-server-1lhz.onrender.com/modifycar/${location?.state?._id}`,
        {
          carData,
        }
      )
      .then((d) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const PostData = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("userMail") === null) {
      alert("Login For Booking");
      return;
    }
    let St = document.getElementsByName("StartTime")[0].value.split("T")[0];
    let En = document.getElementsByName("EndTime")[0].value.split("T")[0];
    const oneDay = 24 * 60 * 60 * 1000;
    const parsedDate1 = new Date(St);
    const parsedDate2 = new Date(En);
    const nDate = new Date(date);
    const timeDifference = Math.abs(parsedDate2 - parsedDate1);
    const daysDifference = Math.round(timeDifference / oneDay) + 1;
    if (parsedDate1 < date) {
      alert("From Date should not greater than Current Date");
      return;
    }
    if (daysDifference > 5) {
      alert("Maximum Booking is 5 days");
      return;
    } else {
      BookingDetails.car_rent = Rent.toString();
      carData.car_status = "Booked";
      await PostCar();
      await axios
        .post("https://bbt-server-1lhz.onrender.com/postbookingdata", {
          BookingDetails,
        })
        .then((res) => {
          //------------------------------
          axios
            .put(
              `https://bbt-server-1lhz.onrender.com/postmail/${localStorage.getItem(
                "userMail"
              )}`,
              {
                BookingDetails,
              }
            )
            .then((d) => {})
            .catch((err) => {
              console.log(err);
            });
          //--------------------------------------------------------------------------------------
          alert("Successfully Booked");
          localStorage.removeItem("CarDetails");
          window.location.href = "/Client_Car/status";
        })
        .catch((err) => {
          alert("not Booked");
        });
    }
  };

  //--------------UI Of Booking Car------------------------------------------
  let FormData = (
    <div>
      <form onSubmit={PostData}>
        <TextField
          className="IN"
          id="outlined-basic"
          label="Name"
          name="name"
          variant="outlined"
          onChange={HandleForm}
          required
        />
        <br />
        <br />
        <TextField
          className="IN"
          name="mobil"
          id="outlined-basic"
          label="Mobile Number"
          variant="outlined"
          onChange={HandleForm}
          required
        />

        <br />
        <br />
        <TextField
          className="IN"
          name="location"
          id="outlined-basic"
          label="Location Of PickUp"
          variant="outlined"
          onChange={HandleForm}
          required
        />
        <br />
        <br />
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <label htmlFor="StDate" style={{ fontWeight: "700" }}>
            From Date
          </label>
          <input
            required
            name="StartTime"
            id="StDate"
            type="datetime-local"
            onChange={HandleForm}
            style={{
              fontWeight: "200",
              width: "100%",
              border: "1.5px solid lightgrey",
              margin: "3px 0px 0px 0px",
              padding: "5px",
            }}
          />
          <label htmlFor="StDate" style={{ fontWeight: "700" }}>
            To Date
          </label>
          <input
            required
            name="EndTime"
            id="StDate"
            type="datetime-local"
            onChange={HandleForm}
            style={{
              fontWeight: "200",
              width: "100%",
              border: "1.5px solid lightgrey",
              margin: "3px 0px 25px 0px",
              padding: "5px",
            }}
          />
          <b>Total Rent : </b>
          <span style={{ color: "black" }}>Rs.{Rent}/-</span>
          <hr style={{ borderColor: "black" }} />
          <button
            style={{
              marginBlockStart: "1%",
              marginInlineStart: "0%",
            }}
            type="submit"
            className="btn btn-primary sub"
          >
            Book It
          </button>
          <button
            style={{
              float: "right",
              margin: "5px 0px 0px 0px",
            }}
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
        <br />
        <br />
      </form>
    </div>
  );

  let Loading = <Loadings />;
  let MainCon = (
    <>
      <Navbar />
      <div className="singlecarmain">
        <div className="carbooking">
          <div className="carimg">
            <div className="card text-bg-dark mb-3">
              <div className="card-header ">BigBoyToyz Rentals</div>
              <div className="card-body">
                <div className="card mb-3 bg-dark">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={location.state.car_image}
                        className="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body bg-dark">
                        <h3 className="card-title">
                          {location.state.car_name}
                        </h3>
                        <hr />
                        <p className="card-text">
                          {/* className="text-body-secondary"
className="text-body-secondary"
className="text-body-secondary"
className="text-body-secondary"
className="text-body-secondary" */}
                          <small>
                            {location.state.car_rent} Rent Per day /-
                          </small>
                          <br />
                          <small>Fuel Type : {location.state.car_fuel}</small>
                          <br />
                          <small>
                            Max Persons : {location.state.car_seating}
                          </small>
                          <br />
                          <small>
                            Status :{" "}
                            <span
                              style={{
                                background: "none",
                                color: `${col}`,
                                fontWeight: "bold",
                              }}
                            >
                              {location.state.car_status}
                            </span>
                          </small>
                          <br />
                          <hr />
                          <small>
                            <button
                              id="tog"
                              type="button"
                              className="btn btn-outline-primary btn-outline-1"
                              data-bs-target="#exampleModalToggle"
                              data-bs-toggle="modal"
                            >
                              Book Car
                            </button>
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -----------------------------Modals for Booking Car */}
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div
          className="modal-dialog modal-dialog-centered "
          style={{
            width: "auto",
            maxWidth: "500px",
            minWidth: "310px",
          }}
        >
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                Enter Your Details
              </h1>
              <button
                type="button"
                className="btn-close bg-light "
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{
                padding: "30px 30px 0px 30px ",
              }}
            >
              {FormData}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return location.state.car_image != "" ? MainCon : Loading;
}

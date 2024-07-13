import React, { useState, useEffect } from "react";
import "./CarStatus.css";
import Navbar from "./Navbar";
import Loadings from "./Loadings";
import { Navigate, useNavigate } from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";
import axios from "axios";
export default function CarStatus() {
  let navigate = useNavigate();
  //----------getting Todays Date-------------

  let [status, setstatus] = useState(0);

  const current = new Date();
  const date = [
    current.getFullYear(),
    current.getMonth() + 1,
    current.getDate(),
  ];

  let [carData, setcar] = useState({
    car_name: "",
    car_image: "",
    car_rent: "",
    car_fuel: "",
    car_seating: "",
    car_number: "",
    car_status: "Available",
  });

  const Deletedata = (e) => {
    let St =
      e?.StartTime?.split("T")[0] ||
      e?.BookingDetails?.StartTime?.split("T")[0];
    let En =
      e?.EndTime?.split("T")[0] || e?.BookingDetails?.EndTime?.split("T")[0];
    const timeDifference = Math.abs(new Date(En) - new Date(St));
    const days = Math.round(timeDifference / (24 * 60 * 60 * 1000)) + 1;

    carData.car_image = e?.BookingDetails?.car_image || e?.car_image;
    carData.car_name = e?.BookingDetails?.car_name || e?.car_name;
    carData.car_rent = e?.BookingDetails?.car_rent / days || e?.car_rent / days;
    carData.car_fuel = e?.BookingDetails?.car_fuel || e?.car_fuel;
    carData.car_seating = e?.BookingDetails?.car_seating || e?.car_seating;
    carData.car_number = e?.BookingDetails?.car_number || e?.car_number;

    let BookingDetails = {
      name: e?.BookingDetails?.name || e?.name,
      car_name: e?.BookingDetails?.car_name || e?.car_name,
      StartTime: e?.BookingDetails?.StartTime || e?.StartTime,
      EndTime: e?.BookingDetails?.EndTime || e?.EndTime,
    };

    axios
      .put(
        `https://bbt-server-1lhz.onrender.com/modifycar/${
          e?.BookingDetails?.car_id || e?.car_id
        }`,
        {
          carData,
        }
      )
      .then((d) => {})
      .catch((err) => {
        console.log(err);
      });

    axios
      .put(
        `https://bbt-server-1lhz.onrender.com/cancelmail/${localStorage.getItem(
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

    axios
      .delete(`https://bbt-server-1lhz.onrender.com/deletebook/${e._id}`, {})
      .then(() => {
        alert("Successfully Cancelled");
        window.location.reload(false);
      })
      .catch((err) => {
        alert("Trying Again Cause Server is Busy");
      });
  };

  //----------getting Todays Date-------------

  const currentdate = new Date();
  const datecurr = [
    currentdate.getFullYear(),
    currentdate.getMonth() + 1,
    currentdate.getDate(),
  ];
  //----------Getting All bookings data--------------------------------------------

  var [AllBookings, setAllbookings] = useState([]);

  const CheckValid = async (data) => {
    const result = data.filter(checkcar);

    function checkcar(car) {
      if (
        car?.BookingDetails?.address === localStorage.getItem("userMail") ||
        car?.address === localStorage.getItem("userMail")
      ) {
        const tempdate_time =
          car?.EndTime?.split("T") || car?.BookingDetails?.EndTime?.split("T");
        const tempdate = tempdate_time[0]?.split("-");

        let d1 = new Date(tempdate);
        let d2 = new Date(datecurr);
        if (d1 >= d2) {
          return car;
        }
      }
    }

    setAllbookings(result);
  };

  const getbookings = async () => {
    await axios
      .get("https://bbt-server-1lhz.onrender.com/bookingsdata")
      .then((items) => {
        CheckValid(items.data);
        setstatus(items.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let [up, setup] = useState(0);

  useEffect(() => {
    getbookings();
  }, []);

  let Alter = (
    <>
      <Navbar />
      <div className="NoBookings">
        <div
          className="bg-dark"
          style={{
            padding: "60px 25px 70px 25px",
            borderRadius: "10px",
            margin: "15px",
          }}
        >
          <h3 className="No-title">Currently No Bookings......!</h3>
          <br />
          <p className="No-Deatail">
            For booking visit our Car's Collection{"   "}
            <a href="/Client_Car/dash" className="A-btn">
              View
            </a>
          </p>
        </div>
      </div>
    </>
  );

  let TranForm = (ele) => {
    navigate("/modify", { state: ele });
    setup(up + 1);
  };

  let Confirm = (car) => {
    let response = window.confirm("Do you want to Cancel");
    if (response === true) {
      Deletedata(car);
    }
  };

  const SplitTime = (t) => {
    let time = t.split("T");
    return time[0] + ", " + time[1];
  };

  let Maincon = (
    <>
      <Navbar />
      <div className="con">
        {AllBookings.map((car) => {
          return (
            <>
              <div className="inncard">
                <div>
                  <img
                    style={{
                      zIndex: "1",
                      objectFit: "cover",
                      objectPosition: "center",
                      width: "250px",
                      minWidth: "200px",
                    }}
                    src={car?.BookingDetails?.car_image || car?.car_image}
                    class="card-img-top"
                    alt="car Image"
                  />
                </div>
                <div className="info">
                  <h6>
                    <b>Booking Name </b>: {car.name || car.BookingDetails.name}
                    <hr style={{ border: "1px solid black" }} />
                  </h6>

                  <p>
                    <b>PickUp Location </b>:{" "}
                    {car.location || car.BookingDetails.location} <br />
                    <b>Mobile No </b> : {car.mobil || car.BookingDetails.mobil}
                    <br />
                    <b>Model </b> :{" "}
                    {car.car_name || car.BookingDetails.car_name}
                  </p>
                  <div className="btns">
                    <button className="bt" onClick={() => TranForm(car)}>
                      Change Details
                    </button>
                    {/* <button className="bt">Feedback</button> */}
                    <button className="bt" onClick={() => Confirm(car)}>
                      Cancel
                    </button>
                  </div>
                </div>
                <div className="detail">
                  <h5 class="card-title"> Booking Timmings & Rent : {"   "}</h5>
                  <table id="table">
                    <tr>
                      <td>From Date</td>
                      <td className="cen">:</td>
                      <td>
                        {SplitTime(
                          car.StartTime || car.BookingDetails.StartTime
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>To Date</td>
                      <td className="cen">:</td>
                      <td>
                        {SplitTime(car.EndTime || car.BookingDetails.EndTime)}
                      </td>
                    </tr>
                    <tr>
                      <td>Total Rent</td>
                      <td className="cen">:</td>
                      <td>{car.car_rent || car.BookingDetails.car_rent}/-</td>
                    </tr>
                  </table>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
  return status == 0 ? (
    <Loadings />
  ) : AllBookings.length !== 0 ? (
    Maincon
  ) : (
    Alter
  );
}

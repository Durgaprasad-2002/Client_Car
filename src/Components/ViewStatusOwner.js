import React, { useState, useEffect } from "react";
import "./CarStatus.css";
import Navbar from "./Navbar";
import Loadings from "./Loadings";
import { Navigate, useNavigate } from "react-router-dom";
import NavbarOwner from "./NavbarOwner";
export default function ViewStatusOwner() {
  let navigate = useNavigate();

  //----------getting Todays Date-------------

  const current = new Date();
  const date = [
    current.getFullYear(),
    current.getMonth() + 1,
    current.getDate(),
  ];

  //-----------Setting  Booked and has To take cars details----------------------------------

  let [bookedCars, setbookedCars] = useState([]);

  const setdata = () => {
    const result = AllBookings.filter(checkcar);

    function checkcar(car) {
      const tempdate_time = car.EndTime.split("T");
      const tempdate = tempdate_time[0].split("-");
      console.log(date + " " + tempdate);
      if (parseInt(tempdate[0]) >= parseInt(date[0])) {
        if (parseInt(tempdate[1]) >= parseInt(date[1])) {
          return car;
        }
      }
    }
    setbookedCars(result);
  };

  //----------Getting All bookings data--------------------------------------------

  let [AllBookings, setAllbookings] = useState([]);
  const getbookings = async () => {
    const response = await fetch(
      "https://clean-flip-flops-moth.cyclic.app/bookingsdata",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setAllbookings(data);
  };

  useEffect(() => {
    getbookings();
  }, []);

  useEffect(() => {
    setdata();
  }, [AllBookings]);

  let [car, setcar] = useState({});
  let Modaldata = () => {
    return (
      <div class="card card-body" style={{ padding: "4px" }}>
        <table>
          <tr>
            <td>User Name</td>
            <td className="cen">:</td>
            <td>{car.name}</td>
          </tr>
          <tr>
            <td>User Mobile</td>
            <td className="cen">:</td>
            <td>{car.mobil}</td>
          </tr>
          <tr>
            <td>User Address</td>
            <td className="cen">:</td>
            <td>{car.address}</td>
          </tr>
          <tr>
            <td>From Time</td>
            <td className="cen">:</td>
            <td>{car.StartTime}</td>
          </tr>
          <tr>
            <td>To Time</td>
            <td className="cen">:</td>
            <td>{car.EndTime}</td>
          </tr>
          <tr>
            <td>Total Rent</td>
            <td className="cen">:</td>
            <td>{car.car_rent}/-</td>
          </tr>
        </table>
      </div>
    );
  };

  let Loading = <Loadings />;
  let Maincon = (
    <>
      <NavbarOwner />
      <div className="con">
        {bookedCars.map((car) => {
          return (
            <>
              <div
                class="card"
                style={{
                  margin: "10px ",
                  width: "320px",
                  boxShadow: "0px 4px 8px 0px black",
                  border: "none",
                }}
              >
                <img src={car.car_image} class="card-img-top" alt="car Image" />
                <div class="card-body" style={{ padding: "7px 5px 0px 5px" }}>
                  <h6 class="card-title">
                    <b style={{ lineHeight: "30px" }}>{car.car_name}</b>
                    <button
                      onClick={() => setcar(car)}
                      class="btn btn-primary btn-sm"
                      className="btn btn-outline-primary btn-outline-1"
                      data-bs-target="#exampleModalToggle"
                      data-bs-toggle="modal"
                      style={{
                        margin: "0px 0px 5px 0px",
                        float: "right",
                      }}
                    >
                      Show Status
                    </button>
                  </h6>
                </div>
              </div>
            </>
          );
        })}
      </div>

      {/* --------------------- modal Data --------------------- */}
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
                Booking Details
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
                padding: "30px",
              }}
            >
              {Modaldata()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return bookedCars.length != 0 ? Maincon : Loading;
}

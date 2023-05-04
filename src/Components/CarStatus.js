import React, { useState, useEffect } from "react";
import "./CarStatus.css";
import Navbar from "./Navbar";
import Loadings from "./Loadings";
import { Navigate, useNavigate } from "react-router-dom";
export default function CarStatus() {
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

  let Loading = <Loadings />;
  let Maincon = (
    <>
      <Navbar />
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
                <div class="card-body" style={{ padding: "7px" }}>
                  <h5 class="card-title"> {car.car_name}</h5>
                  <p class="card-text"></p>
                  <p>
                    <button
                      class="btn btn-primary btn-sm"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseExample"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                      style={{ margin: "0px 0px 5px 0px" }}
                    >
                      Show Status
                    </button>
                    <button
                      class="btn btn-primary btn-sm"
                      type="button"
                      onClick={() => {
                        navigate("/modify", {});
                      }}
                      style={{ margin: "0px 0px 5px 5px" }}
                    >
                      Change Status
                    </button>
                    <button
                      class="btn btn-primary btn-sm"
                      type="button"
                      onClick={() => {
                        navigate("/feedback", { state: car });
                      }}
                      style={{ margin: "0px 0px 5px 5px" }}
                    >
                      Feeback
                    </button>
                  </p>
                  <div class="collapse" id="collapseExample">
                    <div class="card card-body" style={{ padding: "4px" }}>
                      <table>
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
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
  return bookedCars.length != 0 ? Maincon : Loading;
}

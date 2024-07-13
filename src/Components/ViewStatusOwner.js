import React, { useState, useEffect } from "react";
import "./CarStatus.css";
import Navbar from "./Navbar";
import Loadings from "./Loadings";
import { Navigate, useNavigate } from "react-router-dom";
import NavbarOwner from "./NavbarOwner";
import axios from "axios";
import {
  BsLinkedin,
  BsGithub,
  BsFacebook,
  BsTwitter,
  BsWhatsapp,
  BsMailbox,
  BsMailbox2,
  BsPinMapFill,
  BsFile,
} from "react-icons/bs";
export default function ViewStatusOwner() {
  let [status, setstatus] = useState(0);

  const SplitTime = (t) => {
    if (t == null) return t;
    let time = t.split("T");
    return time[0] + ", " + time[1];
  };

  let navigate = useNavigate();

  //----------getting Todays Date-------------

  const currentdate = new Date();
  const datecurr = [
    currentdate.getFullYear(),
    currentdate.getMonth() + 1,
    currentdate.getDate(),
  ];

  let [AllBookings, setAllbookings] = useState([]);

  const CheckValid = async (data) => {
    const result = data.filter(checkcar);

    function checkcar(car) {
      const tempdate_time =
        car?.EndTime?.split("T") || car?.BookingDetails?.EndTime?.split("T");
      const tempdate = tempdate_time[0]?.split("-");

      let d1 = new Date(tempdate);
      let d2 = new Date(datecurr);
      if (d1 >= d2) {
        return car;
      }
    }

    setAllbookings(result);
  };

  //----------Getting All bookings data--------------------------------------------

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

  useEffect(() => {
    getbookings();
  }, []);

  let [car, setcar] = useState({});

  let Modaldata = () => {
    return (
      <div
        class="card card-body"
        style={{
          padding: "4px",
          margin: "0px 0px 0px 0px",
          overflowX: "scroll",
        }}
      >
        <table>
          <tr>
            <td>User Name</td>
            <td className="cen">:</td>
            <td>{car?.name || car?.BookingDetails?.name}</td>
          </tr>
          <tr>
            <td>User Mobile</td>
            <td className="cen">:</td>
            <td>{car?.mobil || car?.BookingDetails?.mobil}</td>
          </tr>
          <tr>
            <td>User Address</td>
            <td className="cen">:</td>
            <td>{car?.address || car?.BookingDetails?.address}</td>
          </tr>
          <tr>
            <td>
              From <small>Date&Time</small>
            </td>
            <td className="cen">:</td>
            <td>
              {SplitTime(car?.StartTime || car?.BookingDetails?.StartTime)}
            </td>
          </tr>
          <tr>
            <td>
              To <small>Date&Time</small>
            </td>
            <td className="cen">:</td>
            <td>{SplitTime(car?.EndTime || car?.BookingDetails?.EndTime)}</td>
          </tr>
          <tr>
            <td>Total Rent</td>
            <td className="cen">:</td>
            <td>{car?.car_rent || car?.BookingDetails?.car_rent}/-</td>
          </tr>
        </table>
      </div>
    );
  };

  let Alter = (
    <>
      <>
        <NavbarOwner />
        <div className="NoBookings">
          <div
            className="bg-dark"
            style={{
              padding: "60px 25px 70px 25px",
              borderRadius: "10px",
              margin: "15px",
            }}
          >
            <h4 className="No-title">Currently No Cars are in Service..!</h4>
          </div>
        </div>
      </>
    </>
  );

  let Loading = <Loadings />;
  let Maincon = (
    <>
      <NavbarOwner />
      <div
        className="con"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          height: "fit-content",
        }}
      >
        {AllBookings.map((car) => {
          return (
            <>
              <div
                class="card"
                style={{
                  margin: "0px 3px 30px 3px",
                  width: "280px",
                  minWidth: "250px",
                  padding: "0px 6px  0px 0px",
                  boxShadow: "0px 4px 8px 0px black",
                  border: "none",
                }}
              >
                <img
                  src={car.car_image || car.BookingDetails.car_image}
                  class="card-img-top"
                  alt="car Image"
                />
                <div class="card-body" style={{ padding: "7px 5px 0px 5px" }}>
                  <h6 class="card-title">
                    <b
                      style={{
                        lineHeight: "30px",
                        color: "black",
                        fontFamily: "serif",
                      }}
                    >
                      {car?.car_name || car?.BookingDetails?.car_name}
                    </b>
                    <br />
                    <button
                      onClick={() => setcar(car)}
                      class="btn btn-primary btn-sm"
                      className="btn btn-outline-primary btn-outline-1"
                      data-bs-target="#exampleModalToggle"
                      data-bs-toggle="modal"
                      style={{
                        margin: "0px 0px 5px 0px",
                        float: "left",
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

  return status == 0 ? (
    <Loadings />
  ) : AllBookings.length !== 0 ? (
    Maincon
  ) : (
    Alter
  );
}

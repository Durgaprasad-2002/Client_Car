import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Loadings from "./Loadings";
import { Navigate, useNavigate } from "react-router-dom";
import NavbarOwner from "./NavbarOwner";
import axios from "axios";
import "./History.css";
import e from "cors";

export default function ViewHistoryOwner() {
  const SplitTime = (t) => {
    if (t != null) {
      let time = t.split("T");
      return time[0] + ", " + time[1];
    }
    return t;
  };

  let navigate = useNavigate();

  let Loading = <Loadings />;

  let [AllBookings, setAllbookings] = useState([]);

  //----------getting Todays Date-------------

  const currentdate = new Date();
  const datecurr = [
    currentdate.getFullYear(),
    currentdate.getMonth() + 1,
    currentdate.getDate(),
  ];

  //----------Getting All bookings data--------------------------------------------

  const getbookings = async () => {
    await axios
      .get("https://bbt-server-1lhz.onrender.com/bookingsdata")
      .then((items) => {
        // ------------Filtering Data Based on Cars--------------------

        let Datas = [];
        let map = new Map();
        for (let index = 0; index < items.data.length; index++) {
          const element = items.data[index];
          let id = element?.BookingDetails?.car_id || element?.car_id;
          let d1 = new Date(datecurr);
          let d2 = new Date(
            element?.BookingDetails?.EndTime || element?.EndTime
          );
          if (d2 <= d1) {
            if (map.has(id)) {
              Datas[map.get(id)].Bookings.push(element);
            } else {
              map.set(id, Datas.length);
              Datas.push({ car_id: id, Bookings: [element] });
            }
          }
        }

        setAllbookings(Datas);

        //----------------------------------------------------------------------------
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getbookings();
  }, []);

  let [prev, setPrev] = useState(null);

  const ShowMethod = (ele) => {
    if (ele !== prev) {
      if (prev !== null) {
        let t = document.getElementsByTagName("table")[prev];
        t.style.display = "none";
      }
      let t = document.getElementsByTagName("table")[ele];
      t.style.display = "block";
      setPrev(ele);
    } else {
      let t = document.getElementsByTagName("table")[prev];
      t.style.display = "none";
      setPrev(null);
    }
  };

  let Maincon = (
    <>
      <NavbarOwner />
      <div className="hisContainer">
        {AllBookings.map((car, key) => {
          return (
            <div className="MainHisCard">
              <div className="HisCard">
                <div>
                  <img
                    className="Hisimg"
                    src={car?.Bookings[0]?.BookingDetails?.car_image}
                  />
                </div>
                <div className="HisCarinfo">
                  <h4 className="CarTitle">Car Details</h4>
                  <b>Modal Name : </b>{" "}
                  {car?.Bookings[0]?.BookingDetails?.car_name}
                  <br />
                  <b>Reg No : </b>{" "}
                  {car?.Bookings[0]?.BookingDetails?.car_number}
                  <br />
                  <b>Fuel Type : </b>{" "}
                  {car?.Bookings[0]?.BookingDetails?.car_fuel}
                  <br />
                  <b>Max Capacity : </b>{" "}
                  {car?.Bookings[0]?.BookingDetails?.car_seating} Persons
                  <br />
                  <button
                    style={{ marginTop: "7px" }}
                    className="btn btn-outline-primary btn-outline-1"
                    onClick={() => ShowMethod(key)}
                  >
                    Show Bookings
                  </button>
                </div>
              </div>
              <br />

              <table
                className="table table-light table-responsive table-hover"
                style={{
                  display: "none",
                  marginLeft: "10px",
                }}
              >
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Booking Name</th>
                    <th scope="col">Mail Id</th>
                    <th scope="col">Mobile No</th>
                    <th scope="col">PickUp Location</th>
                    <th scope="col">Booking Date</th>
                    <th scope="col">From Time</th>
                    <th scope="col">To Time</th>
                  </tr>
                </thead>
                <tbody>
                  {car?.Bookings.map((InCar) => {
                    return (
                      <tr>
                        <td className="td">{InCar.BookingDetails.name}</td>
                        <td className="td">{InCar.BookingDetails.address}</td>
                        <td className="td">{InCar.BookingDetails.mobil}</td>
                        <td className="td">{InCar.BookingDetails.location}</td>
                        <td className="td">{InCar.BookingDetails.Date}</td>
                        <td className="td">{InCar.BookingDetails.StartTime}</td>
                        <td className="td">{InCar.BookingDetails.EndTime}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </>
  );

  // let Modaldata = () => {
  //   return (
  //     <div
  //       class="card card-body"
  //       style={{
  //         padding: "4px",
  //         margin: "0px 5px 0px 0px",
  //         overflowX: "scroll",
  //       }}
  //     >
  //       <table>
  //         <tr>
  //           <td>User Name</td>
  //           <td className="cen">:</td>
  //           <td>{car?.name || car?.BookingDetails?.name}</td>
  //         </tr>
  //         <tr>
  //           <td>User Mobile</td>
  //           <td className="cen">:</td>
  //           <td>{car?.mobil || car?.BookingDetails?.mobil}</td>
  //         </tr>
  //         <tr>
  //           <td>User Address</td>
  //           <td className="cen">:</td>
  //           <td>{car?.address || car?.BookingDetails?.address}</td>
  //         </tr>
  //         <tr>
  //           <td>
  //             From <small>Date&Time</small>
  //           </td>
  //           <td className="cen">:</td>
  //           <td>
  //             {SplitTime(car?.BookingDetails?.StartTime || car?.StartTime)}
  //           </td>
  //         </tr>
  //         <tr>
  //           <td>
  //             To <small>Date&Time</small>
  //           </td>
  //           <td className="cen">:</td>
  //           <td>{SplitTime(car?.BookingDetails?.EndTime || car?.EndTime)}</td>
  //         </tr>
  //         <tr>
  //           <td>Total Rent</td>
  //           <td className="cen">:</td>
  //           <td>{car?.car_rent || car?.BookingDetails?.car_rent}/-</td>
  //         </tr>
  //       </table>
  //     </div>
  //   );
  // };

  // let Maincon = (
  //   <>
  //     <NavbarOwner />
  //     <div
  //       className="con"
  //       style={{
  //         display: "flex",
  //         flexDirection: "row",
  //         justifyContent: "space-around",
  //         height: "fit-content",
  //       }}
  //     >
  //       {AllBookings.map((car) => {
  //         return (
  //           <>
  //             <div
  //               class="card"
  //               style={{
  //                 margin: "0px 3px 30px 3px",
  //                 width: "280px",
  //                 minWidth: "250px",
  //                 padding: "0px 6px  0px 0px",
  //                 boxShadow: "0px 4px 8px 0px black",
  //                 border: "none",
  //               }}
  //             >
  //               <img
  //                 src={car.car_image || car.BookingDetails.car_image}
  //                 class="card-img-top"
  //                 alt="car Image"
  //               />
  //               <div class="card-body" style={{ padding: "7px 5px 0px 5px" }}>
  //                 <h6 class="card-title">
  //                   <b
  //                     style={{
  //                       lineHeight: "30px",
  //                       color: "black",
  //                       fontFamily: "serif",
  //                     }}
  //                   >
  //                     {car?.car_name || car?.BookingDetails?.car_name}
  //                   </b>
  //                   <br />
  //                   <button
  //                     onClick={() => setcar(car)}
  //                     class="btn btn-primary btn-sm"
  //                     className="btn btn-outline-primary btn-outline-1"
  //                     data-bs-target="#exampleModalToggle"
  //                     data-bs-toggle="modal"
  //                     style={{
  //                       margin: "0px 0px 5px 0px",
  //                       float: "left",
  //                     }}
  //                   >
  //                     Show Status
  //                   </button>
  //                 </h6>
  //               </div>
  //             </div>
  //           </>
  //         );
  //       })}
  //     </div>
  //     {/* --------------------- modal Data --------------------- */}
  //     <div
  //       className="modal fade"
  //       id="exampleModalToggle"
  //       aria-hidden="true"
  //       aria-labelledby="exampleModalToggleLabel"
  //       tabindex="-1"
  //     >
  //       <div
  //         className="modal-dialog modal-dialog-centered "
  //         style={{
  //           width: "auto",
  //           maxWidth: "500px",
  //           minWidth: "310px",
  //         }}
  //       >
  //         <div className="modal-content">
  //           <div className="modal-header bg-dark text-white">
  //             <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
  //               Booking Details
  //             </h1>
  //             <button
  //               type="button"
  //               className="btn-close bg-light "
  //               data-bs-dismiss="modal"
  //               aria-label="Close"
  //             ></button>
  //           </div>
  //           <div
  //             className="modal-body"
  //             style={{
  //               padding: "30px",
  //             }}
  //           >
  //             {Modaldata()}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return AllBookings.length != 0 ? Maincon : Loading;
}

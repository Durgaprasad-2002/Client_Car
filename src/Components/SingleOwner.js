import React from "react";
import "./singleCar.css";
import Loadings from "./Loadings";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavbarOwner from "./NavbarOwner";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
export default function SingleOwner() {
  let [col, setcol] = useState("black");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state.car_status.trim() == "Available") {
      setcol("green");
    } else if (location.state.car_status.trim() === "Booked") {
      setcol("red");
    }
  }, [location]);

  const Del = (e) => {
    axios
      .delete(`https://bbt-server-1lhz.onrender.com/deletecar/${e}`, {})
      .then(() => {
        alert("Successfully deleted");
        navigate("/OwnerDash", { state: e });
      })
      .catch((err) => {
        alert("Trying Again Cause Server is Busy");
      });
  };

  const Modify = (e) => {
    navigate("/carDataChange", { state: e });
  };

  let Loading = <Loadings />;
  let MainCon = (
    <>
      <NavbarOwner />
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
                        {/* className="text-body-secondary"
className="text-body-secondary"
className="text-body-secondary"
className="text-body-secondary"
className="text-body-secondary"
className="text-body-secondary" */}
                        <p className="card-text">
                          <small>
                            {location.state.car_rent} Rent Per hour /-
                          </small>
                          <br />
                          <small>Fuel Type : {location.state.car_fuel}</small>
                          <br />
                          <small>
                            Max Persons : {location.state.car_seating}
                          </small>
                          <br />
                          <small>
                            License Number : {location.state.car_number}
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
                          <br />
                          <small>
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-outline-1"
                              onClick={() => Modify(location.state)}
                            >
                              Change Details
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-outline-1"
                              onClick={() =>
                                Del(
                                  location?.state?._id ||
                                    location?.state?.carData?._id
                                )
                              }
                              style={{ marginLeft: "10px" }}
                            >
                              Delete
                            </button>
                          </small>
                          <br />
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
    </>
  );

  return location.state.car_image != "" ? MainCon : Loading;
}

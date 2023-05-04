import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import "./UserDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from "jquery";
import Loadings from "./Loadings";
import Popper from "popper.js";
import { Link, useNavigate } from "react-router-dom";
export default function UserDashboard() {
  const navigate = useNavigate();
  let [CarsDetails, setCarsDetails] = useState([]);

  const getUser = async () => {
    const response = await fetch(
      "https://clean-flip-flops-moth.cyclic.app/getdata",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    setCarsDetails(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const toComponentB = (id) => {
    const list = CarsDetails;
    const employee = list.filter((incar) => incar._id == id);
    navigate("/single", { state: employee[0] });
  };

  let Loading = <Loadings />;
  let MainCon = (
    <div>
      <Navbar />
      <div className="AvailableCars">
        {CarsDetails.map((car) => {
          return (
            <>
              <div className="carInfo">
                <img className="image" src={car.car_image} />
                <div className="carPricing">
                  <article>
                    <h5>{car.car_name}</h5>
                    <h6>
                      <b style={{ fontWeight: "500" }}>Rent Price </b> :{" "}
                      {car.car_rent}
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          toComponentB(car._id);
                        }}
                      >
                        More Info
                      </button>
                    </h6>
                  </article>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
  return CarsDetails.length != 0 ? MainCon : Loading;
}

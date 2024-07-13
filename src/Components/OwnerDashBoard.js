import React from "react";
import NavbarOwner from "./NavbarOwner";
import Loadings from "./Loadings";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./Footer";

export default function OwnerDashBoard() {
  const navigate = useNavigate();
  let [CarsDetails, setCarsDetails] = useState([]);

  const getUser = async () => {
    const response = await fetch(
      "https://bbt-server-1lhz.onrender.com/getdata",
      {
        method: "GET",
      }
    );
    const data = await response.json();

    setCarsDetails(data);
  };

  useEffect(() => {
    if (localStorage.getItem("CarDetails") !== null) {
      let retString = localStorage.getItem("CarDetails");
      let retArray = JSON.parse(retString);
      setCarsDetails(retArray.data);
      localStorage.removeItem("CarDetails");
    } else {
      getUser();
    }
  }, []);

  const toComponentB = (id) => {
    const list = CarsDetails;
    let Ob = { data: list };
    let string = JSON.stringify(Ob);
    localStorage.setItem("CarDetails", string);

    const employee = list.filter((incar) => incar._id == id);
    navigate("/SingleOwner", { state: employee[0] });
  };

  let Loading = <Loadings />;
  let MainCon = (
    <>
      <div>
        <NavbarOwner />
        <div>
          <br />
          <br />
          <h3
            style={{
              color: "white",
              fontFamily: "serif",
              textAlign: "left",
              marginInlineStart: "5%",
              fontSize: "2rem",
            }}
          >
            Our Car Collection
            <article
              style={{ border: "2px solid lightblue", width: "15.3rem" }}
            ></article>
          </h3>
        </div>
        <div className="AvailableCars">
          {CarsDetails.map((car) => {
            return (
              <>
                <div className="carInfo">
                  <img className="image" src={car.car_image} />
                  <div className="carPricing">
                    <article>
                      <h5>
                        {car.car_name}{" "}
                        <button
                          style={{ float: "right" }}
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            toComponentB(car._id);
                          }}
                        >
                          More Info
                        </button>
                      </h5>
                    </article>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <Footer />
      </div>
    </>
  );
  return CarsDetails.length != 0 ? MainCon : Loading;
}

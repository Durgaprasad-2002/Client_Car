import React from "react";
import Navbar from "./Navbar";
import "./Feedback.css";
import { useState } from "react";
export default function Feedback() {
  let [FeedbackCar, setFeedbackCar] = useState({});
  let [AllCars, setAllCars] = useState([]);
  return (
    <>
      <Navbar />
      <div className="feedback">
        <div class="container d-flex justify-content-center mt-5">
          <div class="card text-center mb-5">
            <div class="circle-image">
              <img
                src="https://www.motorbeam.com/wp-content/uploads/Mahindra-XUV700-Bookings-1200x900.jpg"
                width="50"
              />
            </div>

            <span class="name mb-1 text-black fw-500">Mahindra Xuv 700</span>
            <div class="rate bg-success py-3 text-white mt-3">
              <h6 class="mb-0">Rate the Car</h6>

              <div class="rating">
                {" "}
                <input type="radio" name="rating" value="5" id="5" />
                <label for="5">☆</label>{" "}
                <input type="radio" name="rating" value="4" id="4" />
                <label for="4">☆</label>{" "}
                <input type="radio" name="rating" value="3" id="3" />
                <label for="3">☆</label>{" "}
                <input type="radio" name="rating" value="2" id="2" />
                <label for="2">☆</label>{" "}
                <input type="radio" name="rating" value="1" id="1" />
                <label for="1">☆</label>
              </div>

              <div class="buttons px-4 mt-0">
                <button class="btn btn-warning btn-block rating-submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

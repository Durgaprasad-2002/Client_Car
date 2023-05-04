import React from "react";
import "./main.css";
export default function Main() {
  return (
    <>
      <h2
        style={{
          background: "#202020",
          width: "100%",
          height: "80px",
          marginTop: "-60px",
          marginBottom: "70px",
          textAlign: "center",
          color: "white",
          textShadow: "2px 2px slategrey",
          fontFamily: "fantasy",
          paddingBlockStart: "20px",
        }}
      >
        Big Boy Toyz Rentals
      </h2>
      <div className="body">
        <div className="Contents">
          <div className="conCard">
            <div class="card">
              <div className="div">
                <img
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "20px",
                  }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGPtJ8ELxEzK-1PY0jN8kAv9UbBuYiwv-4_-jVL0cMms6tQ4kI_VBOD7SOPn70deNFlP4&usqp=CAU"
                />
                <h5 style={{ textAlign: "center" }}>User's </h5>
              </div>
              <div className="cont">
                <button
                  className="btn btn-primary"
                  onClick={() => (window.location.href = "/Client_Car/Login")}
                >
                  User's Login
                </button>
              </div>
            </div>
          </div>
          <div className="conCard">
            <div class="card">
              <div className="div">
                <img
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "20px",
                  }}
                  src="https://media.istockphoto.com/id/1008952574/vector/hand-giving-a-key-to-other-hand-icon-vector-black-illustration.jpg?s=612x612&w=0&k=20&c=8fuve1RN2_RptH1GxRaeNgR1eSRV113xxIGWL2806PY="
                />
                <h5 style={{ textAlign: "center" }}>Owner's </h5>
              </div>
              <div className="cont">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    (window.location.href = "/Client_Car/LoginOwner")
                  }
                >
                  Owner's Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

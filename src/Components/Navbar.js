// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import $ from "jquery";
// import Popper from "popper.js";

// export default function Navbar() {
//   const Logout = () => {
//     localStorage.clear();
//     window.location.href = "/Client_Car/Login";
//   };

//   return (
//     <div
//       className="NavBar fixed-top"
//       style={{ backgroundColor: "black", color: "black" }}
//     >
//       <nav
//         className="navbar fixed-top bg-dark"
//         style={{
//           boxShadow: "0px 0px 10px 0px black",
//           background: "black",
//         }}
//       >
//         <div className="container-fluid">
//           <a
//             className="navbar-brand text-white"
//             href="#"
//             style={{
//               fontFamily: "Brush Script MT,cursive",
//               fontSize: "30px",
//               color: "black",
//             }}
//           >
//             Big Boy Toyz
//           </a>
//           <button
//             className="navbar-toggler bg-white"
//             type="button"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#offcanvasNavbar"
//             aria-controls="offcanvasNavbar"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div
//             className="offcanvas offcanvas-end"
//             tabindex="-1"
//             id="offcanvasNavbar"
//             aria-labelledby="offcanvasNavbarLabel"
//           >
//             <div className="offcanvas-header bg-dark text-white">
//               <h5
//                 className="offcanvas-title"
//                 id="offcanvasNavbarLabel"
//                 style={{
//                   fontFamily: "sans-serif",
//                   font: "18px",
//                 }}
//               >
//                 {localStorage.getItem("userMail") !== null
//                   ? localStorage.getItem("userMail")
//                   : "Login for Bookings"}
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close bg-white"
//                 data-bs-dismiss="offcanvas"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="offcanvas-body">
//               <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
//                 <li className="nav-item">
//                   <a
//                     className="nav-link active"
//                     aria-current="page"
//                     href="/Client_Car/dash"
//                   >
//                     Available Cars
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link active"
//                     aria-current="page"
//                     href="/Client_Car/status"
//                   >
//                     Current Bookings
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link active" aria-current="page">
//                     Rental Modification
//                   </a>
//                 </li>
//                 {/* <li className="nav-item">
//                   <a className="nav-link active" aria-current="page">
//                     Feedback
//                   </a>
//                 </li> */}
//                 <li className="nav-item">
//                   <a
//                     className="nav-link active"
//                     aria-current="page"
//                     style={{ cursor: "pointer" }}
//                     // href="/Client_Car/Login"
//                     onClick={Logout}
//                   >
//                     Logout
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BiLogIn } from "react-icons/bi";

function NavbarOwner() {
  return (
    <div className="nav-body">
      <Navbar key="lg" expand="lg" className="bg-dark mb-3 fixed-top bg-dark">
        <Container fluid>
          <Navbar.Brand className="title">Big Boy Toyz</Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-lg`}
            className="close"
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header
              closeButton
              className="close"
              style={{ borderBottom: "1px solid darkgrey" }}
            >
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                {localStorage.getItem("userMail") !== null
                  ? localStorage.getItem("userMail")
                  : "Login for Bookings"}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link className="icons" href="/Client_Car/dash">
                  Available Cars
                </Nav.Link>
                <Nav.Link className="icons" href="/Client_Car/status">
                  Bookings
                </Nav.Link>
                <Nav.Link className="mail">
                  <b>User</b> :{" "}
                  {localStorage.getItem("userMail") !== null
                    ? localStorage.getItem("userMail")
                    : "Login for Bookings"}
                </Nav.Link>
                <Nav.Link
                  className="log"
                  onClick={() => {
                    window.location.href = "/Client_Car/LoginOwner";
                    localStorage.clear();
                  }}
                >
                  <b>
                    {" "}
                    <BiLogIn />
                  </b>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarOwner;

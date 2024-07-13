// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import $ from "jquery";
// import Popper from "popper.js";
// import { useNavigate } from "react-router-dom";
// export default function NavbarOwner() {
//   const navigate = useNavigate();
//   return (
//     <div className="NavBar">
//       <nav
//         className="navbar fixed-top bg-dark"
//         style={{ boxShadow: "0px 0px 10px 0px black" }}
//       >
//         <div className="container-fluid">
//           <a
//             className="navbar-brand text-white"
//             href="#"
//             style={{
//               fontFamily: "Brush Script MT,cursive",
//               fontSize: "30px",
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
//                   fontFamily: "serif",
//                   font: "18px ",
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
//                     href="/Client_Car/OwnerDash"
//                   >
//                     Available Cars
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link active"
//                     aria-current="page"
//                     href="/Client_Car/ViewStatusOwner"
//                   >
//                     In Rent Cars
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link active"
//                     aria-current="page"
//                     href="/Client_Car/ViewHistory"
//                   >
//                     Previous Rented Cars
//                   </a>
//                 </li>

//                 <li className="nav-item">
//                   <a
//                     // href="/Client_Car/LoginOwner"
//                     onClick={() => {
//                       window.location.href = "/Client_Car/LoginOwner";

//                       localStorage.clear();
//                     }}
//                     className="nav-link active"
//                     aria-current="page"
//                     style={{ cursor: "pointer" }}
//                   >
//                     Logout
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <button
//               type="button"
//               className="btn btn-outline-primary btn-outline-1"
//               style={{
//                 left: "25px",
//                 bottom: "25px",
//                 position: "relative",
//                 width: "fit-content",
//               }}
//               onClick={() => {
//                 navigate("/newcar", {});
//               }}
//             >
//               Add New Car
//             </button>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BiLogIn } from "react-icons/bi";
import "./Navbar.css";

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
                <Nav.Link className="icons" href="/Client_Car/OwnerDash">
                  Collection
                </Nav.Link>
                <Nav.Link className="icons" href="/Client_Car/ViewStatusOwner">
                  In Rent
                </Nav.Link>
                <Nav.Link className="icons" href="/Client_Car/ViewHistory">
                  Previous Rented
                </Nav.Link>

                <Nav.Link className="icons" href="/Client_Car/newcar">
                  Add New
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

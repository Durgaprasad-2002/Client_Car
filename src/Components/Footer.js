import React from "react";
import "./Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
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

export default function Footer() {
  return (
    <>
      <footer className="bg-dark">
        <div className="digiAccounts">
          <a
            href="https://www.linkedin.com/in/veera-venkata-sai-durga-prasad-thota-60653020a/"
            target="new"
          >
            {" "}
            <BsLinkedin
              className="accs"
              to="https://www.linkedin.com/in/veera-venkata-sai-durga-prasad-thota-60653020a/"
            />
          </a>
          <hr style={{ color: "white", borderColor: "white", width: "40px" }} />

          <a href="https://github.com/Durgaprasad-2002" target="new">
            {" "}
            <BsGithub
              className="accs"
              to="https://github.com/Durgaprasad-2002"
            />
          </a>
          <hr style={{ color: "white", borderColor: "white", width: "40px" }} />

          <a href="https://wa.me/9177943677?text=Hello..!" target="new">
            {" "}
            <BsWhatsapp
              className="accs"
              to="https://wa.me/9177943677?text=Hello..!"
            />
          </a>
          <hr style={{ color: "white", borderColor: "white", width: "40px" }} />

          <a href="mailto:prasaddurga2031@gmail.com" target="new">
            {" "}
            <BsMailbox className="accs" />
          </a>
        </div>
        <hr
          style={{
            color: "white",
            borderColor: "lightblue",
            width: "auto",
          }}
        />
        <div className="Cp">
          <p>
            © 2023 Copyright: <b>BBT</b>
          </p>
        </div>
      </footer>
    </>
  );
}

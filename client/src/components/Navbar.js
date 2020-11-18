import React from "react";
import logo from "../assets/img/ovostudio.svg";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light p-0">
      <span className="navbar-brand mb-0 h1">
        <img src={logo} width="120" height="80" alt="OVOSTUDIO" />
      </span>
    </nav>
  );
};

export default Navbar;

import React from "react";
import Navbar from "../components/Navbar";

const Layout = ({ children, title }) => {
  return (
    <div className="container-fluid p-0">
      <Navbar />
      <div className="container">
        <h2 className="text-center">{title}</h2>
        <div className="row">
          <div className="col-md-6 offset-md-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

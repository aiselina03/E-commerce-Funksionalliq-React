import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <div className="mainLayout">
        <Navbar />
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default MainLayout;

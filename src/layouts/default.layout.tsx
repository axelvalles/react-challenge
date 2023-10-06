import React from "react";
import Navbar from "../components/navbar/navbar.component";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="min-h-screen h-full">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default DefaultLayout;

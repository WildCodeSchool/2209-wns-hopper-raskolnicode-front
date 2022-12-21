import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <hr />
      <Outlet />
    </>
  );
};

export default Layout;

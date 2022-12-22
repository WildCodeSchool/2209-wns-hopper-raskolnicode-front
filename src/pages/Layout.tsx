import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Layout = (props: {onTokenChange: () => void}) => {
  return (
    <>
      <Navbar onTokenChange={props.onTokenChange}/>
      <hr />
      <Outlet />
    </>
  );
};

export default Layout;

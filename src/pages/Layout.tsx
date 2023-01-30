import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Faker from "../components/Faker/Faker";
import Footer from "../components/Footer/Footer";

const Layout = (props: {onTokenChange: () => void}) => {
  return (
    <>
      <Navbar onTokenChange={props.onTokenChange}/>
      <hr className="mb-0" style={{margin: "0"}}/>
      <Outlet />
      <Faker />
      <Footer/>
    </>
  );
};

export default Layout;

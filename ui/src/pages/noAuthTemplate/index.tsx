import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../../components/Footer";
import Header from "../../components/Sidebar";

const NoAuthTemplate = () => (
  <>
    <Header />
    <Outlet />;
    <Footer />
  </>
);

export default NoAuthTemplate;

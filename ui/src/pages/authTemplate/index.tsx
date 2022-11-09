import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import styles from "./styles.module.scss";

const AuthTemplate = () => (
  <div className={styles.container}>
    <Sidebar />
    <div className={styles.content}>
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default AuthTemplate;

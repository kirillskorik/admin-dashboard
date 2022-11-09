import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

import AuthStore from "../../store/Auth";
import SidebarLink from "./Link";
import styles from "./styles.module.scss";

const Sidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    AuthStore.logout();
    navigate("/login");
  };

  return (
    <div className={styles.wrapper}>
      <SidebarLink title="Main">
        <HomeIcon />
      </SidebarLink>
      <SidebarLink title="Logout" onClick={logoutHandler}>
        <LogoutIcon />
      </SidebarLink>
    </div>
  );
};

export default Sidebar;

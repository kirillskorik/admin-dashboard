import React from "react";

import styles from "./styles.module.scss";

type SidebarLinkTypes = {
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const SidebarLink = ({ title, children, onClick }: SidebarLinkTypes) => (
  <div className={styles.wrapper}>
    <div className={styles.linkWrapper} onClick={onClick}>
      <span className={styles.icon}>{children}</span>
      <span className={styles.link}>{title}</span>
    </div>
  </div>
);

export default SidebarLink;

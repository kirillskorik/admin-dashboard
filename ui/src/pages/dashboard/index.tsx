import React from "react";

import UsersTable from "../../components/UsersTable";
import styles from "./styles.module.scss";

const DashboardPage = () => {
  return (
    <div className={styles["wrapper"]}>
      <UsersTable />
    </div>
  );
};

export default DashboardPage;

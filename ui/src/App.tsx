import React from "react";

import UIRouter from "./router";
import styles from "./App.module.scss";

const App = () => (
  <div className={styles.body}>
    <UIRouter />
  </div>
);

export default App;

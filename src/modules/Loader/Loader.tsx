import React from "react";
import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div className={styles.spinner__container}>
      <div className={styles.loading__spinner}></div>
    </div>
  );
}

export default Loader;

import React, { memo } from "react";
import { TFinalConfiguration } from "types";
import styles from "./CarPriceFinal.module.scss";

type Props = {
  title: string;
  value: string;
};

function CarPriceFinal({ title, value}: TFinalConfiguration) {
  return (
    <div className={styles.container}>
      <div className={styles.container__wrapper}>
        <h1 className={styles.container__heading}>{title}</h1>
        <div className={styles.container__value}>
          <div className={styles.container__value__input}>{value}<span className={styles.container__value__input__indicator}>₽</span></div>
        </div>
      </div>
    </div>
  );
}

export default memo(CarPriceFinal);

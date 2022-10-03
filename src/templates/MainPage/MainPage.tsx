import React, { memo } from "react";
import { IndicatorComponent, CarPriceFinal } from "components";
import { Button } from "modules";
import { useConfigurations, useFinalValues, useSubmit } from "hooks";
import styles from "./MainPage.module.scss";

function MainPage() {
  const { configurations, values, handleChangeValues } = useConfigurations();
  const { finalConfigurations, monthlyPay, leaseAgreementAmount } =
    useFinalValues(values);
  const { loading, handleSubmit } = useSubmit({
    values,
    monthlyPay,
    leaseAgreementAmount,
  });

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <header className={styles.main__header}>
          Рассчитайте стоимость автомобиля в лизинг
        </header>
        <div className={styles.main__prices}>
          {configurations.map((configuration) => (
            <IndicatorComponent
              onChange={handleChangeValues}
              {...configuration}
            />
          ))}
        </div>
        <div className={styles.main__finalPrices}>
          <div className={styles.main__finalPrices__values}>
            {finalConfigurations.map((finalConfiguration) => (
              <CarPriceFinal {...finalConfiguration} />
            ))}
          </div>
          <Button isDisabled={loading} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default memo(MainPage);

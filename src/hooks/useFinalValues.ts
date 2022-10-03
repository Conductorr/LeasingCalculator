import { useMemo } from "react";
import { numberWithSpaces } from "helpers";
import { TFinalConfiguration, TValues } from "types";

export type TConfigurationFinalResult = {
  finalConfigurations: TFinalConfiguration[];
  leaseAgreementAmount: number;
  monthlyPay: number;
};

export function useFinalValues(values: TValues): TConfigurationFinalResult {
  const monthlyPay: number = useMemo(() => {
    const { price, initial, months } = values;

    return Math.round(
      (price - initial) *
        ((0.035 * Math.pow(1 + 0.035, months)) /
          (Math.pow(1 + 0.035, months) - 1))
    );
  }, [values]);

  const leaseAgreementAmount = useMemo(() => {
    const { initial, months } = values;

    return Math.round(initial + months * monthlyPay);
  }, [values]);

  const finalConfigurations: TFinalConfiguration[] = useMemo(
    () => [
      {
        value: numberWithSpaces(leaseAgreementAmount),
        title: "Сумма договора лизинга",
      },
      {
        value: numberWithSpaces(monthlyPay),
        title: "Ежемесячный платеж от",
      },
    ],
    [monthlyPay]
  );

  return { finalConfigurations, leaseAgreementAmount, monthlyPay };
}

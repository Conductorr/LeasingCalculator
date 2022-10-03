import { useState, useMemo, useCallback, useEffect } from "react";
import { mathFloorRubles } from "helpers";
import { TConfiguration, ValuesNames, TValues } from "types";
import { TConfigurationResult } from "./types";

const MINIMUM_VALUES: TValues = {
  [ValuesNames.price]: 1000000,
  [ValuesNames.initial]: 100000,
  [ValuesNames.months]: 1,
};

export function useConfigurations(): TConfigurationResult {
  const [values, setValues] = useState<TValues>(MINIMUM_VALUES);

  const tenPercentsOfCarPrice = useMemo(
    () => mathFloorRubles((values[ValuesNames.price] / 100) * 10),
    [values]
  );
  const sixtyPercentsOfCarPrice = useMemo(
    () => mathFloorRubles((values[ValuesNames.price] / 100) * 60),
    [values]
  );

  const MAXIMUM_VALUES: TValues = {
    [ValuesNames.price]: 6000000,
    [ValuesNames.initial]: sixtyPercentsOfCarPrice,
    [ValuesNames.months]: 60,
  };

  useEffect(() => {
    [ValuesNames.price, ValuesNames.initial, ValuesNames.months].forEach(
      (name) => {
        if (values[name] < MINIMUM_VALUES[name]) {
          setValues((prevValues) => ({
            ...prevValues,
            [name]: MINIMUM_VALUES[name],
          }));
        }

        if (values[name] > MAXIMUM_VALUES[name]) {
          setValues((prevValues) => ({
            ...prevValues,
            [name]: MAXIMUM_VALUES[name],
          }));
        }
      }
    );

    if (values[ValuesNames.initial] < tenPercentsOfCarPrice) {
      setValues((prevValues) => ({
        ...prevValues,
        [ValuesNames.initial]: tenPercentsOfCarPrice,
      }));
    }

    if (values[ValuesNames.initial] > sixtyPercentsOfCarPrice) {
      setValues((prevValues) => ({
        ...prevValues,
        [ValuesNames.initial]: sixtyPercentsOfCarPrice,
      }));
    }
  }, [values, tenPercentsOfCarPrice, sixtyPercentsOfCarPrice]);

  const configurations: TConfiguration[] = useMemo(
    () => [
      {
        name: ValuesNames.price,
        value: values[ValuesNames.price],
        title: "Стоимость автомобиля",
        valueIndicator: "₽",
        min: MINIMUM_VALUES[ValuesNames.price],
        max: 6000000,
      },
      {
        name: ValuesNames.initial,
        value: Math.round(values[ValuesNames.initial]),
        title: "Первоначальный взнос",
        valueIndicator: "",
        min: tenPercentsOfCarPrice,
        max: sixtyPercentsOfCarPrice,
        additionalValueIndicator: `${Math.round(
          (values[ValuesNames.initial] / values[ValuesNames.price]) * 100
        )}%`,
        size: "s",
      },
      {
        name: ValuesNames.months,
        value: values[ValuesNames.months],
        title: "Срок лизинга",
        min: MINIMUM_VALUES[ValuesNames.months],
        max: 60,
        valueIndicator: "мес.",
      },
    ],
    [values, tenPercentsOfCarPrice, sixtyPercentsOfCarPrice]
  );

  const handleChangeValues = useCallback(
    (name: string, value: number | string) => {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: Number(value),
      }));
    },
    []
  );

  return { configurations, values, handleChangeValues };
}

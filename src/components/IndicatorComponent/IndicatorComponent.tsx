import React, {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { removeSpaces, numberWithSpaces } from "helpers";
import { TConfiguration } from "types";
import styles from "./IndicatorComponent.module.scss";
import RangeSlider from "../UI/RangeSlider";

type Props = {
  onChange: (name: string, value: number | string) => void;
} & TConfiguration;

function IndicatorComponent({
  value,
  name,
  valueIndicator,
  title,
  min,
  max,
  additionalValueIndicator,
  size = "m",
  onChange,
}: Props): JSX.Element {
  const [textInputValue, setTextInputValue] = useState<string>(String(value));

  const handleChangeTextInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue } = event.target;

      const valueWithoutSpaces = removeSpaces(inputValue);

      if (valueWithoutSpaces.match(/^\d+$/)) {
        setTextInputValue(numberWithSpaces(valueWithoutSpaces));
      }
    },
    []
  );

  const handleChangeRangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue, name: inputName } = event.target;

      onChange(inputName, Number(removeSpaces(inputValue)));
    },
    [onChange]
  );

  useEffect(() => {
    setTextInputValue(numberWithSpaces(value));
  }, [value]);

  return (
    <div className={styles.content}>
      <header className={styles.content__header}>{title}</header>
      <div className={styles.content__value}>
        <div className={styles.content__value__amount}>
          <input
            value={textInputValue}
            name={name}
            type="text"
            onBlur={handleChangeRangeInput}
            onChange={handleChangeTextInput}
            className={styles.content__value__amount__count}
          />
          <div
            className={`value__amount__count__indicator value__amount__count__indicator_${size}`}
          >
            {valueIndicator}
            {additionalValueIndicator}
          </div>
        </div>
        <div className={styles.slider}>
          <RangeSlider
            min={min}
            max={max}
            name={name}
            value={value}
            onChange={handleChangeRangeInput}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(IndicatorComponent);

import React from "react";
import classNames from "classnames";
import Loader from "modules/Loader";
import styles from "./Button.module.scss";

type Props = {
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
};

function Button({ isDisabled, onClick, isLoading }: Props) {
  return (
    <>
      <button
        className={classNames(styles["button"], {
          [styles["button__disabled"]]: isDisabled,
          [styles["button__loading"]]: isLoading,
        })}
        disabled={isDisabled || isLoading}
        onClick={onClick}
        type="button"
      >
        {isDisabled ? (
          <Loader />
        ) : (
          <span className={styles.button__text}>Оставить заявку</span>
        )}
      </button>
    </>
  );
}

export default Button;

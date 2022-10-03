import React, { ChangeEvent, memo, useState } from "react";
import classNames from "classnames";
import styles from "./RangeSlider.module.scss";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { hover } from "@testing-library/user-event/dist/hover";

type Props = {
  name: string;
  value: number;
  min?: number;
  max: number;
  onChange: any; // TODO
};

function RangeSlider(props: Props) {
  const Colors = {
    primary: "#FF9514",
    secondary: "#FFFFFF",
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: Colors.primary,
      },
      secondary: {
        main: Colors.secondary,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Slider
        min={1000000}
        className={styles.range}
        {...props}
        valueLabelDisplay="off"
      />
    </ThemeProvider>
  );
}

export default memo(RangeSlider);

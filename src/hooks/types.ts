import { TConfiguration, TValues } from "types";

export type TConfigurationResult = {
  configurations: TConfiguration[];
  values: TValues;
  handleChangeValues: (name: string, value: number | string) => void;
};

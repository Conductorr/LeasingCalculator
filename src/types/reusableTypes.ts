export enum ValuesNames {
  price = "price",
  initial = "initial",
  months = "months",
}

export type TValues = {
  [ValuesNames.price]: number;
  [ValuesNames.initial]: number;
  [ValuesNames.months]: number;
};

export type TConfiguration = {
  name: ValuesNames;
  value: any;
  title: string;
  valueIndicator: string;
  max: number;
  min?: number;
  additionalValueIndicator?: string;
  size?: "s" | "m";
};

export type TFinalConfiguration = {
  value: string;
  title: string;
};

export function mathFloorRubles(number: number): number {
  const numberWithDecimalPart = String(number).split(".");

  // console.log({ number });

  return numberWithDecimalPart[1] ? Number(number.toFixed(2)) : number;
}

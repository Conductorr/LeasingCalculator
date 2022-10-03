export function numberWithSpaces(value: string | number): string {
  if (typeof Number(value) !== "number") {
    return String(value);
  }

  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function removeSpaces(value: string | number) {
  const valueAsString = String(value);

  return valueAsString.replace(/\s/g, "");
}

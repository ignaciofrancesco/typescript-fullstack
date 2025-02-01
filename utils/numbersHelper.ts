// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPositiveNumber = (number: any): boolean => {
  // Validate it s a number
  if (isNaN(Number(number))) {
    return false;
  }

  // Validate it is greater than zero
  if (Number(number) <= 0) {
    return false;
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNumber = (number: any): boolean => {
  if (isNaN(Number(number))) {
    return false;
  }
  return true;
};

export { isNumber, isPositiveNumber };

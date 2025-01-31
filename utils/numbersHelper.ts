const isPositiveNumber = (n: any): boolean => {
  // Validate it s a number
  if (isNaN(Number(n))) {
    return false;
  }

  // Validate it is greater than zero
  if (Number(n) <= 0) {
    return false;
  }

  return true;
};

export default { isPositiveNumber };

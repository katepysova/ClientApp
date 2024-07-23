export const convertJoulesToGrams = (energy) => {
  return (energy / (9 * Math.pow(10, 16))) * 1000;
};

export const formatNumberToPrecision = (num, precision = 4) => {
  return num.toPrecision(precision);
};

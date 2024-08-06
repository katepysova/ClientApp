export const convertJoulesToGrams = (energy) => {
  return (energy / 3600000) * 417;
  // reference: https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator#results
};

export const formatNumberToPrecision = (num, precision = 2) => {
  return num.toFixed(precision);
};

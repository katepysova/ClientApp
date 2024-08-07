export const convertJoulesToGrams = (energy) => {
  return (energy / 3600000) * 417;
  // reference: https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator#results
};

export const formatNumberToPrecision = (num, precision = 4) => {
  return num === 0 ? 0 : num.toFixed(precision);
};

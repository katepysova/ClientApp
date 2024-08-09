export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const dateFormat = "DD/MM/YYYY";

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const LIMIT = 9;

export const LOADER_TIMEOUT = 500;

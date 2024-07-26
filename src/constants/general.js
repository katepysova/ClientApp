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

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

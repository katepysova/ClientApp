import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Select from "@components/shared/Select/Select.jsx";
import { monthNames } from "@constants/general.js";

import "./DropdownDate.scss";

function CustomDropdownDate({ year, month, day, onDayChange, onMonthChange, onYearChange }) {
  const currentYear = new Date().getFullYear();

  const generateYears = () => {
    const years = [];
    for (let i = currentYear; i <= currentYear + 30; i++) {
      years.push({ value: i, label: i });
    }
    return years;
  };

  const generateMonths = () => {
    if (year?.value) {
      return monthNames.map((name, index) => ({ value: index + 1, label: name }));
    }
    return [];
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const generateDays = () => {
    if (year?.value && month?.value) {
      const daysInMonth = getDaysInMonth(year.value, month.value);
      return Array.from({ length: daysInMonth }, (v, k) => ({ value: k + 1, label: k + 1 }));
    }
    return [];
  };

  useEffect(() => {
    if (year?.value && month?.value) {
      const daysInMonth = getDaysInMonth(year.value, month.value);
      if (day?.value > daysInMonth) {
        onDayChange({ value: daysInMonth, label: daysInMonth });
      }
    }
  }, [year, month]);

  return (
    <div className="dropdown-date">
      <Select
        value={year}
        onChange={onYearChange}
        options={generateYears()}
        placeholder="Select year"
        label={"Year"}
      />
      <Select
        value={month}
        onChange={onMonthChange}
        options={generateMonths()}
        placeholder="Select month"
        label={"Month"}
      />
      <Select
        value={day}
        onChange={onDayChange}
        options={generateDays()}
        placeholder="Select day"
        label={"Day"}
      />
    </div>
  );
}

CustomDropdownDate.propTypes = {
  year: PropTypes.object,
  month: PropTypes.object,
  day: PropTypes.object,
  onDayChange: PropTypes.func.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired
};

export default CustomDropdownDate;

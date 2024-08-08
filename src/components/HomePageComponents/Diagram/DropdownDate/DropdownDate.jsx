import React, { useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import Select from "@components/shared/Select/Select.jsx";
import { monthNames, getDaysInMonth } from "@constants/general.js";
import { useSelector } from "react-redux";
import { selectMinDate } from "@store/date/dateSelector.js";

import "./DropdownDate.scss";

function CustomDropdownDate({
  year,
  month,
  day,
  onDayChange,
  onMonthChange,
  onYearChange,
  className
}) {
  const minDate = useSelector(selectMinDate);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const startYear = minDate?.getFullYear() || currentYear;
  const startMonth = minDate?.getMonth() || currentMonth;
  const startDay = minDate?.getDate() || currentDay;

  const generateYears = () => {
    const years = [];
    for (let i = startYear; i <= currentYear; i++) {
      years.push({ value: i, label: i });
    }
    return years;
  };

  const generateMonths = () => {
    if (year?.value) {
      let leftBoundary = 0;
      let rightBoundary = monthNames.length;
      if (year?.value === startYear) {
        leftBoundary = startMonth;
      }
      if (year?.value === currentYear) {
        rightBoundary = currentMonth;
      }
      return monthNames
        .map((name, index) => ({ value: index + 1, label: name }))
        .slice(leftBoundary, rightBoundary + 1);
    }
    return [];
  };

  const generateDays = () => {
    if (year?.value && month?.value) {
      const daysInMonth = getDaysInMonth(year.value, month.value);
      let leftBoundary = 0;
      let rightBoundary = daysInMonth;

      if (year.value === startYear && month.value === startMonth + 1) {
        leftBoundary = startDay - 1;
      }

      if (year.value === currentYear && month.value === currentMonth + 1) {
        rightBoundary = currentDay;
      }

      const days = Array.from({ length: daysInMonth }, (v, k) => ({ value: k + 1, label: k + 1 }));

      return days.slice(leftBoundary, rightBoundary);
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

  useEffect(() => {
    if (year?.value && month?.value) {
      if (year.value === currentYear && month.value > currentMonth + 1) {
        onMonthChange({ value: currentMonth + 1, label: monthNames[currentMonth] });
      }
      if (year.value === startYear && month.value < startMonth + 1) {
        onMonthChange({ value: startMonth + 1, label: monthNames[startMonth] });
      }
    }
  }, [year]);

  return (
    <div className={cn("dropdown-date", className)}>
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
  onYearChange: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default CustomDropdownDate;

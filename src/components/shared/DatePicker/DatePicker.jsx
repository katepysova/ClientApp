import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker/dist/es";
import "react-datepicker/dist/react-datepicker.css";

import Icon from "@components/shared/Icon/Icon.jsx";
import icons from "@components/shared/Icon/icons.js";

import "./DatePicker.scss";

function CustomDatePicker({ placeholder = "Please select a date", label = "Date", ...props }) {
  return (
    <div className="custom-datepicker">
      {label && <span className="custom-datepicker__label">{label}</span>}

      <DatePicker
        showIcon={true}
        icon={<Icon symbol={icons.calendar} />}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        maxDate={new Date()}
        dateFormat="dd/MM/YYYY"
        placeholderText={placeholder}
        isClearable={true}
        clearIcon={<Icon symbol={icons.calendar} />}
        {...props}
      />
    </div>
  );
}

CustomDatePicker.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string
};

export default CustomDatePicker;

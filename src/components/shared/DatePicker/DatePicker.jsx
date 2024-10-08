import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker/dist/es";
import "react-datepicker/dist/react-datepicker.css";

import Icon from "@components/shared/Icon/Icon.jsx";
import icons from "@components/shared/Icon/icons.js";

import "./DatePicker.scss";

function CustomDatePicker({ placeholder = "Select date", label = "Date", ...props }) {
  return (
    <div className="custom-datepicker">
      {label && <span className="custom-datepicker__label">{label}</span>}

      <DatePicker
        showIcon={true}
        icon={<Icon symbol={icons.calendar} />}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
        dateFormat="dd/MM/yyyy" // See: https://github.com/Hacker0x01/react-datepicker/issues/1600#issuecomment-471239698
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

import React from "react";
import ReactSelect from "react-select";
import PropTypes from "prop-types";
import cn from "classnames";
import selectStyles from "@components/shared/Select/SelectStyles.js";

import "./Select.scss";

function Select({ options, placeholder, label, ...props }) {
  const currentClass = cn("react-select");
  return (
    <div>
      {label && <span className="react-select__label">{label}</span>}
      <ReactSelect
        isClearable={true}
        options={options}
        hideSelectedOptions={false}
        placeholder={placeholder}
        styles={selectStyles}
        className={currentClass}
        classNamePrefix="react-select"
        components={{
          IndicatorSeparator: () => null
        }}
        {...props}
      />
    </div>
  );
}

Select.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  label: PropTypes.string
};

export default Select;

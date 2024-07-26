import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./Button.scss";

function Button({ children, className, ...props }) {
  const currentClassName = cn("btn btn--primary", className);
  return (
    <button className={currentClassName} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  isLink: PropTypes.bool,
  href: PropTypes.string,
  className: PropTypes.string
};

export default Button;

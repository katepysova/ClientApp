import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./Card.scss";

function Card({ children, className, title, subtitle }) {
  return (
    <div className={cn("card", className)}>
      {title && <h3 className="card__title heading-tertiary">{title}</h3>}
      {subtitle && <h4 className="card__subtitle heading-4">{subtitle}</h4>}
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default Card;

import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import "./Card.scss";

function Card({ children, className, title }) {
  return (
    <div className={cn("card", className)}>
      {title && <h3 className="card__title heading-tertiary">{title}</h3>}
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  title: PropTypes.string
};

export default Card;

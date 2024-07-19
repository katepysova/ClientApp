import React from "react";
import PropTypes from "prop-types";

import "./Card.scss";

function Card({ children }) {
  return <div className="card">{children}</div>;
}

Card.propTypes = {
  children: PropTypes.any
};

export default Card;

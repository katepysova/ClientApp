import React from "react";
import PropTypes from "prop-types";

function Icon({ symbol, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox={symbol.viewBox}>
      <use xlinkHref={`#${symbol.id}`} />
    </svg>
  );
}

Icon.propTypes = {
  symbol: PropTypes.any,
  size: PropTypes.number
};

export default Icon;

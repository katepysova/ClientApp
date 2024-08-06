import React from "react";
import PropTypes from "prop-types";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function Tooltip({ ...props }) {
  return (
    <ReactTooltip {...props} style={{ backgroundColor: "#696969", color: "#fff", zIndex: 100 }} />
  );
}

Tooltip.propTypes = {
  props: PropTypes.any
};

export default Tooltip;

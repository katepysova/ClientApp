import React from "react";
import PropTypes from "prop-types";
import "./List.scss";

function List({ children }) {
  return <ol className="list">{children}</ol>;
}

List.propTypes = {
  children: PropTypes.any.isRequired
};
export default List;

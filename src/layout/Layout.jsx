import React from "react";
import PropTypes from "prop-types";
import "./Layout.scss";

function Layout({ children }) {
  return (
    <div className="wrapper">
      <main className="main">{children}</main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any
};

export default Layout;

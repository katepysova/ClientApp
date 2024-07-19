import React from "react";
import PropTypes from "prop-types";
import Header from "@components/shared/Header/Header.jsx";
import "./Layout.scss";

function Layout({ children }) {
  return (
    <div className="wrapper">
      <Header />
      <main className="main">{children}</main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any
};

export default Layout;

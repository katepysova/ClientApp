import React from "react";
import { Link } from "react-router-dom";
import logo from "@images/logo.png";
import icons from "@components/shared/Icon/icons.js";
import Icon from "@components/shared/Icon/Icon.jsx";
import { routes } from "@constants/routes.js";

import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__title">
          <Link to={routes.index}>
            <img className="header__logo" src={logo} alt="logo" />
          </Link>
          <h3 className="title">
            <span>Laptop Energy</span>
            <Icon symbol={icons.leaf} />
          </h3>
        </div>
        <h4 className="update-status">Last updated: today</h4>
      </div>
    </header>
  );
}

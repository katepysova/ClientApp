import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import logo from "@images/logo.png";
import { routes } from "@constants/routes.js";
import { dateFormat } from "@constants/general.js";
import { selectLastUpdatedDate } from "@store/date/dateSelector.js";
import "./Header.scss";

export default function Header() {
  const lastUpdatedDate = useSelector(selectLastUpdatedDate);

  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__title">
          <Link to={routes.index}>
            <img className="header__logo" src={logo} alt="logo" />
          </Link>
          <h3 className="header__title-text">PowerLeaf</h3>
        </div>
        <p className="header__update-status">
          Last updated: {moment(new Date(lastUpdatedDate)).format(dateFormat) || "-"}
        </p>
      </div>
    </header>
  );
}

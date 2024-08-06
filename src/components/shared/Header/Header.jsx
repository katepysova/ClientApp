import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import logo from "@images/logo.png";
import { routes } from "@constants/routes.js";

import "./Header.scss";

const format = "DD/MM/YYYY HH:mm:ss";

export default function Header() {
  const [lastUpdate, setLastUpdate] = useState("-");

  const getStatusUpdate = async () => {
    try {
      const data = await window.electron.fetchData(
        `SELECT 
                MAX(Interval.start_time) as lastUpdate
                FROM Interval`
      );
      let { lastUpdate } = data[0];
      lastUpdate = lastUpdate ? moment(new Date(lastUpdate)).format(format) : "-";
      setLastUpdate(lastUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStatusUpdate();
  }, []);

  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__title">
          <Link to={routes.index}>
            <img className="header__logo" src={logo} alt="logo" />
          </Link>
          <h3 className="header__title-text">PowerLeaf</h3>
        </div>
        <p className="header__update-status">Last updated: {lastUpdate}</p>
      </div>
    </header>
  );
}

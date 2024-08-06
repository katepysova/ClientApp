import React from "react";
import Tasks from "@components/HomePageComponents/Tasks/Tasks.jsx";
import Diagram from "@components/HomePageComponents/Diagram/Diagram.jsx";
import Rating from "@components/HomePageComponents/Rating/Rating.jsx";

import "./Home.scss";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-page__container container">
        <section className="home-page__main grid">
          <Rating className="column--1" />
          <Tasks className="column--2" />
          <Diagram className="column--3" />
        </section>
      </div>
    </div>
  );
}

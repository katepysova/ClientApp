import React from "react";

import Card from "@components/shared/Card/Card.jsx";
import Tasks from "@components/HomePageComponents/TasksComponent/Tasks.jsx";
import Diagram from "@components/HomePageComponents/Diagram/Diagram.jsx";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-page__container container">
        <section className="home-page__main grid">
          <Card className="column--1" title="Your rating" />
          <Tasks className="column--2" />
          <Diagram className="column--3" />
        </section>
      </div>
    </div>
  );
}

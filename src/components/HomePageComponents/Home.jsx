import React, { useEffect, useState } from "react";

import Card from "@components/shared/Card/Card.jsx";
import Task from "@components/HomePageComponents/Task/Task.jsx";
import List from "@components/shared/List/List.jsx";

import "./Home.scss";

export default function Home() {
  const [tasksConsumptions, setTaskConsumptions] = useState([]);

  const getTasksConsumptionData = async () => {
    try {
      const tasksConsumptionData = await window.electron.fetchData(
        `SELECT TaskConsumption.task_name,
                SUM(TaskConsumption.energy_consumption) as energy_consumption,
                Task.icon
         FROM TaskConsumption
                  JOIN Task
                       ON TaskConsumption.task_name = Task.task_name
         GROUP BY Task.task_name
         ORDER BY energy_consumption DESC LIMIT 9;

        `
      );
      setTaskConsumptions(tasksConsumptionData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasksConsumptionData();
  }, []);

  return (
    <div className="home-page">
      <div className="home-page__container container">
        <section className="home-page__main grid">
          <Card className="column--1" title="Your rating" />
          <Card className="column--2" title="Top 9 Carbon Emitting Applications">
            <List>
              {tasksConsumptions.map((task) => (
                <Task key={task.task_name} task={task} />
              ))}
            </List>
          </Card>
          <Card className="column--3" title="Diagram" />
        </section>
      </div>
    </div>
  );
}

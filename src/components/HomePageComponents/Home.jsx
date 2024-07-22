import React, { useEffect, useState } from "react";

import Card from "@components/shared/Card/Card.jsx";
import TaskCard from "@components/HomePageComponents/TaskCard/TaskCard.jsx";
import "./Home.scss";

export default function Home() {
  const [taskConsumptions, setTaskConsumptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const taskConsumptionData = await window.electron.fetchData(
        `SELECT
                TaskConsumption.task_name, 
                SUM(TaskConsumption.energy_consumption) as energy_consumption,
                Task.icon
                FROM TaskConsumption
                JOIN Task
                ON TaskConsumption.task_name = Task.task_name
                GROUP BY Task.task_name
                ORDER BY energy_consumption DESC
                LIMIT 10;
                
        `
      );
      setTaskConsumptions(taskConsumptionData);
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <div className="home-page__container container">
        <h1 className="heading-primary u-margin-button-56">Carbon Footprint of the Laptop </h1>
        <Card>
          <div className="list">
            <h3 className="heading-tertiary">Top 10 Carbon Emitting Applications</h3>
            {taskConsumptions.map((consumption) => (
              <TaskCard key={consumption?.task_name} task={consumption} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

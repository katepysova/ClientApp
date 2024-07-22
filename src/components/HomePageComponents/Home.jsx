import React, { useEffect, useState } from "react";

import Card from "@components/shared/Card/Card.jsx";
import TaskCard from "@components/TaskCard/TaskCard.jsx";
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
      console.log({ taskConsumptionData });
      setTaskConsumptions(taskConsumptionData);
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <div className="home-page__container container">
        <Card>
          <h3 className="heading-tertiary">Task Consumptions</h3>
          <div className="list">
            {taskConsumptions.map((consumption) => (
              <TaskCard key={consumption?.task_name} task={consumption} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

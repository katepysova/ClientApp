import React, { useEffect, useState } from "react";
import moment from "moment";

import Card from "@components/shared/Card/Card.jsx";
import Task from "@components/HomePageComponents/Task/Task.jsx";
import List from "@components/shared/List/List.jsx";

import "./Home.scss";
import CustomDatePicker from "../shared/DatePicker/DatePicker.jsx";

export default function Home() {
  const [tasksConsumptions, setTaskConsumptions] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const getTasksConsumptionData = async () => {
    try {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate, true);

      console.log(formattedStartDate, formattedEndDate);

      let baseQuery = `
        SELECT 
        TaskConsumption.task_name, SUM(TaskConsumption.energy_consumption) as energy_consumption, Task.icon
        FROM TaskConsumption
        JOIN Task
        ON TaskConsumption.task_name = Task.task_name
        LEFT JOIN INTERVAL
        ON TaskConsumption.interval_id = Interval.id`;

      if (formattedStartDate && formattedEndDate) {
        baseQuery += `\n WHERE Interval.start_time BETWEEN '${formattedStartDate}' AND '${formattedEndDate}'`;
      } else if (formattedStartDate) {
        baseQuery += `\n WHERE Interval.start_time >= '${formattedStartDate}'`;
      } else if (formattedEndDate) {
        baseQuery += `\n WHERE Interval.start_time <'${formattedEndDate}'`;
      }

      baseQuery += `\n GROUP BY Task.task_name
         ORDER BY energy_consumption DESC LIMIT 9;`;

      console.log(baseQuery);
      const tasksConsumptionData = await window.electron.fetchData(baseQuery);
      setTaskConsumptions(tasksConsumptionData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasksConsumptionData();
  }, [startDate, endDate]);

  const formatDate = (date, isEndDate) => {
    if (!date) {
      return null;
    }
    const format = "yyyy-MM-DD";
    if (isEndDate) {
      return `${moment(date).add(1, "day").format(format)}`;
    }
    return `${moment(date).format(format)}`;
  };

  return (
    <div className="home-page">
      <div className="home-page__container container">
        <section className="home-page__main grid">
          <Card className="column--1" title="Your rating" />
          <Card className="column--2" title="Top 9 Carbon Emitting Applications">
            <CustomDatePicker
              selectsStart
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
              startDate={startDate}
            />
            <CustomDatePicker
              selectsEnd
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              endDate={endDate}
              startDate={startDate}
              minDate={startDate}
            />
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

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import CustomDatePicker from "@components/shared/DatePicker/DatePicker.jsx";
import Card from "@components/shared/Card/Card.jsx";
import List from "@components/HomePageComponents/TasksComponent/List/List.jsx";
import Task from "@components/HomePageComponents/TasksComponent/Task/Task.jsx";
import Loader from "@components/shared/Loader/Loader.jsx";
import moment from "moment/moment";

import "./Tasks.scss";
import EmptyState from "../../shared/EmptyState/EmptyState.jsx";

function Tasks({ className }) {
  const [tasksConsumptions, setTaskConsumptions] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getTasksConsumptionData = async () => {
    const formatDateForQuery = (date, isEndDate) => {
      if (!date) {
        return null;
      }
      const format = "yyyy-MM-DD";
      if (isEndDate) {
        return `${moment(date).add(1, "day").format(format)}`;
      }
      return `${moment(date).format(format)}`;
    };

    try {
      setIsLoading(true);
      const formattedStartDate = formatDateForQuery(startDate);
      const formattedEndDate = formatDateForQuery(endDate, true);

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

      const tasksConsumptionData = await window.electron.fetchData(baseQuery);
      setTaskConsumptions(tasksConsumptionData);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    getTasksConsumptionData();
  }, [startDate, endDate]);

  return (
    <div className={cn("tasks", className)}>
      <Card title="Top 9 Carbon Emitting Applications">
        <div className="tasks__calendars">
          <CustomDatePicker
            label="Start Date"
            selectsStart
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            startDate={startDate}
          />
          <CustomDatePicker
            label="End Date"
            selectsEnd
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            endDate={endDate}
            startDate={startDate}
            minDate={startDate}
          />
        </div>
        {isLoading && <Loader />}
        {tasksConsumptions.length === 0 && !isLoading && <EmptyState />}
        {tasksConsumptions.length > 0 && !isLoading && (
          <List>
            {tasksConsumptions.map((task) => (
              <Task key={task.task_name} task={task} />
            ))}
          </List>
        )}
      </Card>
    </div>
  );
}

Tasks.propTypes = {
  className: PropTypes.string
};

export default Tasks;

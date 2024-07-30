import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames";
import CustomDatePicker from "@components/shared/DatePicker/DatePicker.jsx";
import Card from "@components/shared/Card/Card.jsx";
import List from "@components/HomePageComponents/TasksComponent/List/List.jsx";
import Task from "@components/HomePageComponents/TasksComponent/Task/Task.jsx";
import Loader from "@components/shared/Loader/Loader.jsx";
import EmptyState from "@components/shared/EmptyState/EmptyState.jsx";
import moment from "moment";
import { getDaysInMonth } from "@constants/general.js";

import { selectMinDate, selectExactDate } from "@store/date/dateSelector.js";

import "./Tasks.scss";

function Tasks({ className }) {
  const minDate = useSelector(selectMinDate);
  const dateFromDiagram = useSelector(selectExactDate);
  const [tasksConsumptions, setTaskConsumptions] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const getTasksConsumptionData = async () => {
    const formatDateForQuery = (date) => {
      if (!date) {
        return null;
      }
      const format = "YYYY-MM-DD";
      return `${moment(date).format(format)}`;
    };

    try {
      setIsLoading(true);
      const formattedStartDate = formatDateForQuery(startDate);
      const formattedEndDate = formatDateForQuery(endDate);

      let baseQuery = `
        SELECT 
        TaskConsumption.task_name, SUM(TaskConsumption.energy_consumption) as energy_consumption, Task.icon,
        DATE(Interval.start_time) as date
        FROM TaskConsumption
        JOIN Task
        ON TaskConsumption.task_name = Task.task_name
        LEFT JOIN INTERVAL
        ON TaskConsumption.interval_id = Interval.id`;

      if (formattedStartDate && formattedEndDate) {
        baseQuery += `\n WHERE date BETWEEN '${formattedStartDate}' AND '${formattedEndDate}'`;
      } else if (formattedStartDate) {
        baseQuery += `\n WHERE date >= '${formattedStartDate}'`;
      } else if (formattedEndDate) {
        baseQuery += `\n WHERE date <'${formattedEndDate}'`;
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

  const applyDateFromDiagram = () => {
    if (dateFromDiagram) {
      const { year, month, day } = dateFromDiagram || {};
      if (year && month && day) {
        const date = new Date(`${year}/${month}/${day}`);
        setStartDate(date);
        setEndDate(date);
      } else if (year && month) {
        const start = new Date(`${year}/${month}/${"01"}`);
        const end = new Date(
          Math.min(new Date(`${year}/${month}/${getDaysInMonth(year, month)}`), new Date())
        );
        setStartDate(start);
        setEndDate(end);
      } else if (year) {
        const start = new Date(`${year}/${"01"}/${"01"}`);
        const end = new Date(Math.min(new Date(`${year}/${"12"}/${"31"}`), new Date()));
        setStartDate(start);
        setEndDate(end);
      } else {
        setStartDate(null);
        setEndDate(null);
      }
    }
  };

  useEffect(() => {
    getTasksConsumptionData();
  }, [startDate, endDate]);

  useEffect(() => {
    applyDateFromDiagram();
  }, [dateFromDiagram]);

  return (
    <div className={cn("tasks", className)}>
      <Card title="Top 9 Carbon Emitting Applications">
        <div className="tasks__calendars">
          <CustomDatePicker
            label="Start Date"
            selectsStart
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            onSelect={(date) => setStartDate(date)}
            startDate={startDate}
            minDate={minDate}
            maxDate={new Date()}
          />
          <CustomDatePicker
            label="End Date"
            selectsEnd
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            onSelect={(date) => setEndDate(date)}
            endDate={endDate}
            startDate={startDate}
            minDate={startDate || minDate}
            maxDate={new Date()}
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
  className: PropTypes.string,
  dateFromDiagram: PropTypes.object
};

export default Tasks;

import React, { useEffect, useState } from "react";
import "./Home.scss";

export default function Home() {
  const [intervals, setIntervals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskConsumptions, setTaskConsumptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const intervalData = await window.electron.fetchData("SELECT * FROM Interval");
      setIntervals(intervalData);

      const taskData = await window.electron.fetchData("SELECT * FROM Task");
      setTasks(taskData);

      const taskConsumptionData = await window.electron.fetchData("SELECT * FROM TaskConsumption");
      setTaskConsumptions(taskConsumptionData);
    };

    fetchData();
  }, []);

  const renderIcon = (iconData) => {
    if (iconData && iconData.length > 0) {
      const base64Icon = btoa(String.fromCharCode.apply(null, new Uint8Array(iconData)));
      return <img src={`data:image/png;base64,${base64Icon}`} alt="Task Icon" />;
    }
    return null;
  };

  return (
    <div>
      <h2>Intervals</h2>
      <table className="data-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>PC ID</th>
          <th>Start Time</th>
          <th>Stop Time</th>
          <th>Total Energy Consumption</th>
          <th>Platform</th>
        </tr>
        </thead>
        <tbody>
        {intervals.map((interval) => (
          <tr key={interval.id}>
            <td>{interval.id}</td>
            <td>{interval.pc_id}</td>
            <td>{interval.start_time}</td>
            <td>{interval.stop_time}</td>
            <td>{interval.total_energy_consumption}</td>
            <td>{interval.platform}</td>
          </tr>
        ))}
        </tbody>
      </table>

      <h2>Tasks</h2>
      <table className="data-table">
        <thead>
        <tr>
          <th>Task Name</th>
          <th>Icon</th>
        </tr>
        </thead>
        <tbody>
        {tasks.map((task) => (
          <tr key={task.task_name}>
            <td>{task.task_name}</td>
            <td>{renderIcon(task.icon)}</td>
          </tr>
        ))}
        </tbody>
      </table>

      <h2>Task Consumptions</h2>
      <table className="data-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Task Name</th>
          <th>Interval ID</th>
          <th>Energy Consumption</th>
        </tr>
        </thead>
        <tbody>
        {taskConsumptions.map((consumption) => (
          <tr key={consumption.id}>
            <td>{consumption.id}</td>
            <td>{consumption.task_name}</td>
            <td>{consumption.interval_id}</td>
            <td>{consumption.energy_consumption}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
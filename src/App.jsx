import React, { useEffect } from "react";
import AppRouter from "@/router/Router.jsx";
import { useDispatch } from "react-redux";
import dateTypes from "@store/date/dateTypes.js";
import "@styles/main.scss";

const ENERGY_CONSUMPTION_THRESHOLD = 100; // Joules

export default function App() {
  const dispatch = useDispatch();

  const getMinDate = async () => {
    try {
      const data = await window.electron.fetchData(
        `SELECT 
                MIN(Interval.start_time) as minDate
                FROM Interval`
      );
      const { minDate } = data[0];
      dispatch({ type: dateTypes.setMinDate, payload: minDate ? new Date(minDate) : null });
    } catch (error) {
      console.error(error);
    }
  };

  const getOverTreshholdEnergyConsumingApps = async () => {
    try {
      let data = await window.electron.fetchData(
        `SELECT TaskConsumption.task_name,
            TaskConsumption.energy_consumption,
            DATE(Interval.start_time) as date
            FROM TaskConsumption
            LEFT JOIN INTERVAL
            ON TaskConsumption.interval_id = INTERVAL.id
            WHERE TaskConsumption.energy_consumption >= ${ENERGY_CONSUMPTION_THRESHOLD}
            AND INTERVAL.start_time = (
                SELECT MAX(INTERVAL.start_time)
                FROM INTERVAL
            ) AND date = DATE('now')`
      );
      data?.forEach((app) => {
        const title = `${app?.task_name}`;
        const body = "Is consuming too much energy.";
        setTimeout(() => {
          window.electron.notify({ title, body });
        }, 1000);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMinDate();
    setInterval(() => {
      getOverTreshholdEnergyConsumingApps();
    }, 3000 * 60);
  }, []);

  return <AppRouter />;
}

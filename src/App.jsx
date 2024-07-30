import React, { useEffect } from "react";
import "@styles/main.scss";
import AppRouter from "@/router/Router.jsx";
import { useDispatch } from "react-redux";
import dateTypes from "@store/date/dateTypes.js";

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

  useEffect(() => {
    getMinDate();
  }, []);

  return <AppRouter />;
}

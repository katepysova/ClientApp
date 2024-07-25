import React, { useState } from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import cn from "classnames";
import Card from "@components/shared/Card/Card.jsx";
import Loader from "@components/shared/Loader/Loader.jsx";
import EmptyState from "@components/shared/EmptyState/EmptyState.jsx";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController);

function Diagram({ className }) {
  const [totalConsumption, setTotalConsumption] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTotalConsumption = async () => {
    try {
      setIsLoading(true);
      const query = `SELECT SUM(Interval.total_energy_consumption) as total_energy_consumption,
    DATE(Interval.start_time) as date
    FROM Interval
    GROUP BY date
    `;
      const totalConsumptionData = await window.electron.fetchData(query);
      console.log({ totalConsumptionData });
      setTotalConsumption(totalConsumptionData);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  useState(() => {
    getTotalConsumption();
  }, []);

  const data = {
    labels: totalConsumption.map((item) => item?.date),
    datasets: [
      {
        label: "Total Energy Consumption",
        backgroundColor: "rgba(52, 150, 81, 0.6)",
        borderColor: "rgba(52, 150, 81, 1)",
        borderWidth: 1,
        data: totalConsumption.map((item) => item?.total_energy_consumption)
      }
    ]
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date" // Name of y-axis
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Consumption (Joules)" // Name of y-axis
        }
      }
    }
  };
  return (
    <div className={cn("diagram", className)}>
      <Card title="Total Energy Consumption">
        {isLoading && <Loader />}
        {totalConsumption.length === 0 && !isLoading && <EmptyState />}
        {totalConsumption.length > 0 && !isLoading && <Bar data={data} options={options} />}
      </Card>
    </div>
  );
}

Diagram.propTypes = {
  className: PropTypes.string
};
export default Diagram;

import React, { useEffect, useState } from "react";
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
import CustomDropdownDate from "@components/shared/DropdownDate/DropdownDate.jsx";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function Diagram({ className }) {
  const [totalConsumption, setTotalConsumption] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const [year, setYear] = useState({ value: currentYear, label: currentYear });
  const [month, setMonth] = useState({ value: currentMonth + 1, label: monthNames[currentMonth] });
  const [day, setDay] = useState({ value: currentDay, label: currentDay });

  const handleYearChange = (selectedOption) => {
    setYear(selectedOption);
  };

  const handleMonthChange = (selectedOption) => {
    setMonth(selectedOption);
  };

  const handleDayChange = (selectedOption) => {
    setDay(selectedOption);
  };

  const formatValues = (year, month, day) => {
    const data = {
      year: year?.value || null,
      month: month?.value || null,
      day: day?.value || null
    };
    return data;
  };

  const getTotalConsumption = async () => {
    try {
      const formattedData = formatValues(year, month, day);
      setIsLoading(true);
      let query = `
        SELECT SUM(Interval.total_energy_consumption) as total_energy_consumption,
               DATE(Interval.start_time) as date
            FROM Interval
    `;
      if (formattedData.year && formattedData.month && formattedData.day) {
        query += `\n WHERE strftime('%Y', date) = '${formattedData.year}'`;
      } else if (formattedData.year && formattedData.month) {
        query += `\n WHERE strftime('%Y', date) = '${formattedData.year}' AND strftime('%m', date) = '${formattedData.month}`;
      } else if (formattedData.year) {
        query += `\n WHERE strftime('%Y', date) = '${formattedData.year}'`;
      }

      query += `\n GROUP BY date`;
      console.log(query);
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

  useEffect(() => {
    getTotalConsumption();
  }, [day, month, year]);

  const data = {
    labels: totalConsumption.map((item) => item?.date),
    datasets: [
      {
        label: "Total Energy Consumption",
        backgroundColor: "rgba(171, 0, 102, 0.75)",
        borderColor: "rgba(171, 0, 102, 1)",
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
        <CustomDropdownDate
          year={year}
          month={month}
          day={day}
          onMonthChange={handleMonthChange}
          onDayChange={handleDayChange}
          onYearChange={handleYearChange}
        />
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

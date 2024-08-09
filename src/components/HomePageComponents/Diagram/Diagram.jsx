import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import dateTypes from "@store/date/dateTypes.js";
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
import CustomDropdownDate from "@components/HomePageComponents/Diagram/DropdownDate/DropdownDate.jsx";
import Button from "@components/shared/Button/Button.jsx";

import { monthNames, dateFormat, LOADER_TIMEOUT } from "@constants/general.js";
import { formatNumberToPrecision } from "@common/service.js";

import "./Diagram.scss";
import moment from "moment";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController);

function Diagram({ className }) {
  const dispatch = useDispatch();
  const [totalConsumptionArray, setTotalConsumptionArray] = useState([]);
  const [totalConsumptionValue, setTotalConsumptionValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  const [year, setYear] = useState({ value: currentYear, label: currentYear });
  const [month, setMonth] = useState({ value: currentMonth + 1, label: monthNames[currentMonth] });
  const [day, setDay] = useState({ value: currentDay, label: currentDay });

  const handleYearChange = (selectedOption) => {
    setYear(selectedOption);
    handleMonthChange(null);
  };

  const handleMonthChange = (selectedOption) => {
    setMonth(selectedOption);
    setDay(null);
  };

  const handleDayChange = (selectedOption) => {
    setDay(selectedOption);
  };

  const formatValues = (year, month, day) => {
    month = month?.value ? ("0" + month.value).slice(-2) : null;
    day = day?.value ? ("0" + day.value).slice(-2) : null;
    const date = {
      year: year?.value || null,
      month,
      day
    };
    return date;
  };

  const handleResetButtonClick = () => {
    setYear({ value: currentYear, label: currentYear });
    setMonth({ value: currentMonth + 1, label: monthNames[currentMonth] });
    setDay({ value: currentDay, label: currentDay });
  };

  const handleRefreshButtonClick = async () => {
    const formattedDate = formatValues(year, month, day);
    dispatch({ type: dateTypes.setExactDate, payload: formattedDate });
    dispatch({ type: dateTypes.fetchLastUpdatedDate });
    await getTotalConsumption();
  };

  const setTotalConsumptionFormatted = (value) => {
    if (!value) {
      setTotalConsumptionValue(0);
    } else {
      setTotalConsumptionValue(formatNumberToPrecision(value));
    }
  };

  useEffect(() => {
    handleRefreshButtonClick();
    getTotalConsumption();
  }, [year, month, day]);

  const getTotalConsumption = async () => {
    try {
      const formattedDate = formatValues(year, month, day);
      setIsLoading(true);
      let query = `SELECT SUM(Interval.total_energy_consumption) as total_energy_consumption,
               DATE(Interval.start_time) as date,
               strftime('%Y', Interval.start_time) as year,
               strftime('%m', Interval.start_time) as month,
               strftime('%d', Interval.start_time) as day
            FROM Interval`;
      if (formattedDate.year && formattedDate.month && formattedDate.day) {
        query += `\n WHERE date = '${formattedDate.year}-${formattedDate.month}-${formattedDate.day}'`;
        query += `\n GROUP BY date`;
      } else if (formattedDate.year && formattedDate.month) {
        query += `\n WHERE year = '${formattedDate.year}' AND month = '${formattedDate.month}'`;
        query += `\n GROUP BY date`;
      } else if (formattedDate.year) {
        query += `\n WHERE year = '${formattedDate.year}'`;
        query += `\n GROUP BY month`;
      } else {
        query += `\n GROUP BY year`;
      }

      const totalConsumptionData = await window.electron.fetchData(query);
      const sum = totalConsumptionData.reduce(
        (acc, value) => acc + value?.total_energy_consumption,
        0
      );
      setTotalConsumptionArray(totalConsumptionData);
      setTotalConsumptionFormatted(sum);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, LOADER_TIMEOUT);
    }
  };

  const data = {
    labels: totalConsumptionArray.map((item) => {
      if (month && year) {
        return item?.date && moment(new Date(item?.date)).format(dateFormat);
      } else if (year) {
        return `${item?.month}/${item?.year}`;
      } else {
        return `${item?.year}`;
      }
    }),
    datasets: [
      {
        label: "Total Energy Consumption",
        backgroundColor: "rgba(171, 0, 102, 0.75)",
        borderColor: "rgba(171, 0, 102, 1)",
        borderWidth: 1,
        data: totalConsumptionArray.map((item) => item?.total_energy_consumption),
        font: 16
      }
    ]
  };

  const options = {
    onClick: (e) => {
      const points = e.chart.getElementsAtEventForMode(e, "nearest", { intersect: true }, true);
      if (points.length) {
        const firstPoint = points[0];
        const labelDate = e.chart.data.labels[firstPoint.index];
        const dateComponents = labelDate.split("/");
        const labelYear = Number(dateComponents[dateComponents.length - 1]) || null;
        const labelMonth = Number(dateComponents[dateComponents.length - 2]) || null;
        const labelDay = Number(dateComponents[dateComponents.length - 3]) || null;
        handleYearChange(labelYear ? { value: labelYear, label: labelYear } : null);
        handleMonthChange(
          labelMonth ? { value: labelMonth, label: monthNames[labelMonth - 1] } : null
        );
        handleDayChange(labelDay ? { value: labelDay, label: labelDay } : null);
      }
    },
    onHover: (e, chartElement) => {
      if (chartElement.length === 1) {
        e.native.target.style.cursor = "pointer";
      }
    },
    plugins: {
      title: {
        font: {
          size: 24,
          style: "italic",
          family: "Helvetica Neue"
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date", // Name of y-axis
          font: {
            size: 16,
            weight: "bold"
          }
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Consumption (Joules)", // Name of y-axis
          font: {
            size: 16,
            weight: "bold"
          }
        }
      }
    }
  };

  // const yearlyConsumption = totalConsumptionArray.length === 0 ? "0": ((totalConsumptionValue * 200) / totalConsumptionArray.length).toString();
  // const cardTitle = `Estimated Annual Consumption: ${yearlyConsumption} Joules (${yearlyConsumption / 3600000} kWh)`;
  const cardTitle = `Total Energy Consumption: ${totalConsumptionValue} Joules (${formatNumberToPrecision(totalConsumptionValue / 3600000, 6)} kWh)`;

  return (
    <div className={cn("diagram", className)}>
      <Card title={cardTitle}>
        <CustomDropdownDate
          className={"diagram__dates"}
          year={year}
          month={month}
          day={day}
          onMonthChange={handleMonthChange}
          onDayChange={handleDayChange}
          onYearChange={handleYearChange}
        />
        <div className="diagram__buttons">
          <Button className="btn--primary" onClick={handleResetButtonClick}>
            Reset to current date
          </Button>
          <Button className="btn--secondary" onClick={handleRefreshButtonClick}>
            Refresh
          </Button>
        </div>
        {isLoading && <Loader />}
        {totalConsumptionArray.length === 0 && !isLoading && <EmptyState />}
        {totalConsumptionArray.length > 0 && !isLoading && (
          <div className="diagram__chart">
            <Bar data={data} options={options} />
          </div>
        )}
      </Card>
    </div>
  );
}

Diagram.propTypes = {
  className: PropTypes.string
};
export default Diagram;

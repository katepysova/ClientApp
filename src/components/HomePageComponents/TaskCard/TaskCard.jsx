import React from "react";
import PropTypes from "prop-types";
import emptyImage from "@images/empty_image.png";
import Icon from "@components/shared/Icon/Icon.jsx";
import icons from "@components/shared/Icon/icons.js";
import { convertJoulesToGrams, formatNumberToPrecision } from "@common/service.js";
import "./TaskCard.scss";

const renderIcon = (iconData) => {
  if (iconData && iconData.length > 0) {
    const base64Icon = btoa(String.fromCharCode.apply(null, new Uint8Array(iconData)));
    return <img src={`data:image/png;base64,${base64Icon}`} alt="Task Icon" />;
  }
  return <img src={emptyImage} alt="Task Icon" />;
};

function TaskCard({ task }) {
  const energyConsumptionInGrams = convertJoulesToGrams(task.energy_consumption);
  const commonItems = [
    {
      icon: icons.coffee,
      title: "1 cup of coffee - 50g CO2",
      carbonValue: (energyInJoules) => {
        const energyInGrams = convertJoulesToGrams(energyInJoules);
        const value = (1 * energyInGrams) / 50;
        return `${formatNumberToPrecision(value)} cups of coffee`;
      }
    },
    {
      icon: icons.beer,
      title: "1 pint of beer - 665g CO2",
      carbonValue: (energyInJoules) => {
        const energyInGrams = convertJoulesToGrams(energyInJoules);
        const value = (1 * energyInGrams) / 665;
        return `${formatNumberToPrecision(value)} pints of beer`;
      }
    },
    {
      icon: icons.clothes,
      title: "€50 on clothes - 187g CO2",
      carbonValue: (energyInJoules) => {
        const energyInGrams = convertJoulesToGrams(energyInJoules);
        const value = (50 * energyInGrams) / 187;
        return `€${formatNumberToPrecision(value)}`;
      }
    },
    {
      icon: icons.bag,
      title: "1 plastic bag - 33g CO2",
      carbonValue: (energyInJoules) => {
        const energyInGrams = convertJoulesToGrams(energyInJoules);
        const value = (1 * energyInGrams) / 33;
        return `${formatNumberToPrecision(value)} plastic bags`;
      }
    }
  ];

  return (
    <div className="task-card">
      <div className="task-card__header">
        <div className="task-card__icon">{renderIcon(task.icon)}</div>
        <h4 className="task-card__name">{task.task_name}</h4>
      </div>
      <div className="task-card__body">
        <p>
          <span className="task-card__label">Energy Consumption: </span>
          <span className="task-card__value">
            {formatNumberToPrecision(task.energy_consumption, 6)} joules
          </span>
        </p>
        <p>
          <span className="task-card__label">Equivalent in grams: </span>
          <span className="task-card__value">
            {formatNumberToPrecision(energyConsumptionInGrams)} grams
          </span>
        </p>
        <p>
          <span className="task-card__label">The Carbon Footprint of Common Items: </span>
        </p>
        <ul className="task-card__list">
          {commonItems.map((item) => (
            <li className="task-card__list-item" key={item.title}>
              <Icon symbol={item.icon} />
              <div>
                <p className="task-card__label">{item.title}</p>
                <p>{item.carbonValue(task.energy_consumption)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired
};

export default TaskCard;

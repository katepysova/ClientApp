import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import emptyImage from "@images/empty_image.png";
import Icon from "@components/shared/Icon/Icon.jsx";
import icons from "@components/shared/Icon/icons.js";
import { convertJoulesToGrams, formatNumberToPrecision } from "@common/service.js";
import "./Task.scss";

const renderIcon = (iconData) => {
  if (iconData && iconData.length > 0) {
    const base64Icon = btoa(String.fromCharCode.apply(null, new Uint8Array(iconData)));
    return <img src={`data:image/png;base64,${base64Icon}`} alt="Task Icon" />;
  }
  return <img src={emptyImage} alt="Task Icon" />;
};

function Task({ task, days }) {
  const [isSpoilerOpen, toggleSpoilerOpen] = useState(false);
  const energyConsumptionInGrams = convertJoulesToGrams(task.energy_consumption);
  const commonItems = [
    {
      icon: icons.coffee,
      title: "1 cup of coffee - 50g CO2",
      carbonValue: (energyInJoules) => {
        const energyInGrams = convertJoulesToGrams(energyInJoules);
        const value = (1 * energyInGrams) / 50;
        const annual_value = (value * 200) / days;
        return `${formatNumberToPrecision(annual_value)} cups of coffee`;
      }
    },
    {
      icon: icons.beer,
      title: "1 pint of beer - 665g CO2",
      carbonValue: (energyInJoules) => {
        const energyInGrams = convertJoulesToGrams(energyInJoules);
        const value = (1 * energyInGrams) / 665;
        const annual_value = (value * 200) / days;
        return `${formatNumberToPrecision(annual_value)} pints of beer`;
      }
    },
    {
      icon: icons.bag,
      title: "1 plastic bag - 33g CO2",
      carbonValue: (energyInJoules) => {
        const energyInGrams = convertJoulesToGrams(energyInJoules);
        const value = (1 * energyInGrams) / 33;
        const annual_value = (value * 200) / days;
        return `${formatNumberToPrecision(annual_value)} plastic bags`;
      }
    }
  ];

  const handleClick = () => {
    toggleSpoilerOpen(!isSpoilerOpen);
  };

  const itemElements = commonItems.map((item, index) => (
    <div key={index} className="task__common">
      <span className="task__common-label">
        <Icon symbol={item["icon"]}></Icon>
      </span>
      <span className="task__common-value">
        {item["carbonValue"](task.energy_consumption)} per year
      </span>
    </div>
  ));

  return (
    <li className={cn("task spoiler", { open: isSpoilerOpen })}>
      <button className="task__header spoiler-header" onClick={handleClick}>
        <div className="task__title">
          {renderIcon(task.icon)}
          <span>{task.task_name || "Name Undefined"}</span>
        </div>
        <span className="spoiler-icon">
          <Icon symbol={icons.arrowDown}></Icon>
        </span>
      </button>
      <div className="spoiler-body" style={{ overflow: "auto" }}>
        <div className="task__extra">
          <div className="task__info">
            <span className="task__info-label">Energy Consumption: </span>
            <span className="task__info-value">
              {formatNumberToPrecision(task.energy_consumption)} Joules (
              {formatNumberToPrecision(task.energy_consumption / 3600000, 6)} kWh)
            </span>
          </div>
          <div className="task__info">
            <span className="task__info-label">Equivalent in grams of CO2: </span>
            <span className="task__info-value">
              {formatNumberToPrecision(energyConsumptionInGrams)} Grams
            </span>
          </div>
          <div className="task__common-metrics">{itemElements}</div>
        </div>
      </div>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  days: PropTypes.number.isRequired
};

export default Task;

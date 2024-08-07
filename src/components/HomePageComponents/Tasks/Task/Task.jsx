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

function Task({ task }) {
  const [isSpoilerOpen, toggleSpoilerOpen] = useState(false);
  const energyConsumptionInGrams = convertJoulesToGrams(task.energy_consumption);
  // eslint-disable-next-line no-unused-vars
  const commonItems = [
    {
      icon: icons.coffee,
      class: 'coffee',
      title: "1 cup of coffee - 50g CO2",
      carbonValue: (energyInJoules) => {
        const energyInGrams = convertJoulesToGrams(energyInJoules);
        const value = (1 * energyInGrams) / 50;
        return `${formatNumberToPrecision(value)} cups of coffee`;
      }
    },
    {
      icon: icons.beer,
      class: 'beer',
      title: "1 pint of beer - 665g CO2",
      carbonValue: (energyInJoules) => {
        const energyInGrams = convertJoulesToGrams(energyInJoules);
        const value = (1 * energyInGrams) / 665;
        return `${formatNumberToPrecision(value)} pints of beer`;
      }
    },
    {
      icon: icons.clothes,
      class: 'clothes',
      title: "€50 on clothes - 187g CO2",
      carbonValue: (energyInJoules) => {
        const energyInGrams = convertJoulesToGrams(energyInJoules);
        const value = (50 * energyInGrams) / 187;
        return `€${formatNumberToPrecision(value)} of clothes`;
      }
    },
    {
      icon: icons.bag,
      class: 'bag',
      title: "1 plastic bag - 33g CO2",
      carbonValue: (energyInJoules) => {
        const energyInGrams = convertJoulesToGrams(energyInJoules);
        const value = (1 * energyInGrams) / 33;
        return `${formatNumberToPrecision(value)} plastic bags`;
      }
    }
  ];

  const handleClick = () => {
    toggleSpoilerOpen(!isSpoilerOpen);
  };

  const itemElements = commonItems.map((item, index) => (
    <div key={index} className="task__info">
      <span className="task__info-label">
        <Icon symbol={item["icon"]}></Icon>
      </span>
      <span className="task__info-value">{item["carbonValue"](task.energy_consumption)}</span>
    </div>
  ));

  console.log(itemElements);
  return (
    <li className={cn("task spoiler", { open: isSpoilerOpen })}>
      <button className="task__header spoiler-header" onClick={handleClick}>
        <div className="task__title">
          {renderIcon(task.icon)}
          <span>{task.task_name}</span>
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
              {formatNumberToPrecision(task.energy_consumption / 3600000, 4)} kWh)
            </span>
          </div>
          <div className="task__info">
            <span className="task__info-label">Equivalent in grams of CO2: </span>
            <span className="task__info-value">
              {formatNumberToPrecision(energyConsumptionInGrams)} Grams
            </span>
          </div>
          {itemElements}
        </div>
      </div>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired
};

export default Task;

import React from "react";
import PropTypes from "prop-types";
import emptyImage from "@images/empty_image.png";
import "./TaskCard.scss";

const renderIcon = (iconData) => {
  if (iconData && iconData.length > 0) {
    const base64Icon = btoa(String.fromCharCode.apply(null, new Uint8Array(iconData)));
    return <img src={`data:image/png;base64,${base64Icon}`} alt="Task Icon" />;
  }
  return <img src={emptyImage} alt="Task Icon" />;
};

function TaskCard({ task }) {
  return (
    <div className="task-card">
      <div className="task-card__header">
        <div className="task-card__icon">{renderIcon(task.icon)}</div>
        <h4 className="task-card__name">{task.task_name}</h4>
      </div>

      <div>Energy Consumption: {task.energy_consumption}</div>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.object.isRequired
};

export default TaskCard;

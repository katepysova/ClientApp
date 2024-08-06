import React from "react";
import PropTypes from "prop-types";
import Tooltip from "@components/shared/Tooltip/Tooltip.jsx";
import plantGreen from "@images/plant-green.svg";
import plantRed from "@images/plant-red.svg";
import plantBlue from "@images/plant-blue.svg";
import plantYellow from "@images/plant-yellow.svg";
import info from "@images/info_image.png";

import "./RatingCard.scss";

function generateIconByRating(r, n) {
  const top10PercentThreshold = Math.ceil(0.1 * n);
  const bottom10PercentThreshold = Math.floor(0.9 * n);
  const top50PercentThreshold = Math.ceil(0.5 * n);
  const bottom50PercentThreshold = Math.floor(0.5 * n);

  // Check if the user is in the top 10%
  const isTop10Percent = r <= top10PercentThreshold;
  if (isTop10Percent) {
    return {
      image: plantGreen,
      tooltipContent: "You are in the top 10% least energy consuming users.",
      id: 1
    };
  }
  // Check if the user is in the top 50%
  const isTop50Percent = r <= top50PercentThreshold;
  if (isTop50Percent) {
    return {
      image: plantBlue,
      tooltipContent: "You are in the top 50% least energy consuming users.",
      id: 2
    };
  }
  // Check if the user is in the bottom 10%
  const isBottom10Percent = r > bottom10PercentThreshold;
  if (isBottom10Percent) {
    return {
      image: plantRed,
      tooltipContent: "You are in the top 10% most energy consuming users.",
      id: 3
    };
  }
  // Check if the user is in the bottom 50%
  const isBottom50Percent = r > bottom50PercentThreshold;
  if (isBottom50Percent) {
    return {
      image: plantYellow,
      tooltipContent: "You are in the top 50% most energy consuming users.",
      id: 4
    };
  }
}

function RatingCard({ rating, index }) {
  const { image, tooltipContent, id } = generateIconByRating(rating.value, rating.machines);
  const tooltipId = `rating-info--${index}-${id}`;
  console.log(tooltipId);
  return (
    <div className="rating-card">
      <figure className="rating-card__image">
        <img src={image} alt="plant" />
      </figure>

      <h5 className={"rating-card__title heading-4"}>{rating.title}</h5>
      <p className={"rating-card__value"}>
        {rating.value} / {rating.machines}
      </p>
      <div className={"rating-card__tooltip"}>
        <img src={info} alt={info} data-tooltip-id={tooltipId} />
        <Tooltip id={tooltipId} content={tooltipContent} place="bottom" />
      </div>
    </div>
  );
}

RatingCard.propTypes = {
  rating: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default RatingCard;

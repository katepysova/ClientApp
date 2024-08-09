import React from "react";
import PropTypes from "prop-types";
import Tooltip from "@components/shared/Tooltip/Tooltip.jsx";
import plantGreen from "@images/plant-green.svg";
import plantRed from "@images/plant-red.svg";
import plantBlue from "@images/plant-blue.svg";
import plantYellow from "@images/plant-yellow.svg";
import info from "@images/info_image.png";

import "./RatingCard.scss";

const RATING_DATA = {
  10: {
    image: plantGreen,
    tooltipContent: "You are in the top 10% least energy consuming users.",
    id: 1
  },
  50: {
    image: plantBlue,
    tooltipContent: "You are in the top 50% least energy consuming users.",
    id: 2
  },
  90: {
    image: plantYellow,
    tooltipContent: "You are in the top 50% most energy consuming users.",
    id: 3
  },
  100: {
    image: plantRed,
    tooltipContent: "You are in the top 10% most energy consuming users.",
    id: 4
  }
};

const getRelativeScore = (r, n) => {
  // r = n - r + 1;
  return r <= n / 2 ? ((r - 1) / n) * 100 : (r / n) * 100;
};

function getRating(r, n) {
  let percentage = getRelativeScore(r, n);

  for (let threshold in RATING_DATA) {
    if (percentage <= Number(threshold)) {
      return RATING_DATA[threshold];
    }
  }
  return RATING_DATA["50"];
}

function RatingCard({ rating, index }) {
  const { image, tooltipContent, id } = getRating(rating.rating, rating.totalMachines);
  const tooltipId = `rating-info--${index}-${id}`;
  return (
    <div className="rating-card">
      <figure className="rating-card__image">
        <img src={image} alt="plant" />
      </figure>

      <h5 className={"rating-card__title heading-5"}>{rating.title}</h5>
      <p className={"rating-card__value"}>
        {rating.rating} / {rating.totalMachines}
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

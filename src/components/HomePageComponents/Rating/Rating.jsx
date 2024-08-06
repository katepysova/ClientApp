import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import Card from "@components/shared/Card/Card.jsx";
import RatingCard from "@components/HomePageComponents/Rating/RatingCard/RatingCard.jsx";

import "./Rating.scss";

function Rating({ className }) {
  const rating = [
    {
      title: "Rating 1",
      value: 1,
      machines: 10
    },
    {
      title: "Rating 2",
      value: 2,
      machines: 10
    },
    {
      title: "Rating 3",
      value: 6,
      machines: 10
    },
    {
      title: "Rating 4",
      value: 10,
      machines: 10
    }
  ];
  return (
    <div className={cn("rating", className)}>
      <Card title="Your rating">
        <div className="rating__list">
          {rating.map((item, index) => (
            <RatingCard key={item.title} rating={item} index={index} />
          ))}
        </div>
      </Card>
    </div>
  );
}

Rating.propTypes = {
  className: PropTypes.string
};

export default Rating;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import API from "@common/api.js";
import Card from "@components/shared/Card/Card.jsx";
import RatingCard from "@components/HomePageComponents/Rating/RatingCard/RatingCard.jsx";
import { apiURLs } from "@constants/apiUrls.js";

import "./Rating.scss";

function Rating({ className }) {
  // eslint-disable-next-line no-unused-vars
  const [ratingList, setRatingList] = useState([]);

  const getRatingList = async () => {
    try {
      const body = { pc_id: "" };
      const response = await API.post(apiURLs.rankings, body);
      const ratingsData = response.data;

      console.log(ratingsData);
      setRatingList(ratingsData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRatingList();
  }, []);

  const rating = [
    {
      title: "Rating 1",
      value: 1,
      machines: 10
    },
    {
      title: "Rating 2",
      value: 4,
      machines: 10
    },
    {
      title: "Rating 3",
      value: 8,
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

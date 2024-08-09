import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames";
import API from "@common/api.js";
import Card from "@components/shared/Card/Card.jsx";
import RatingCard from "@components/HomePageComponents/Rating/RatingCard/RatingCard.jsx";
import Loader from "@components/shared/Loader/Loader.jsx";
import { apiURLs } from "@constants/apiUrls.js";
import { selectUserPcId } from "@store/user/userSelector.js";
import { LOADER_TIMEOUT } from "@constants/general.js";

import "./Rating.scss";

function Rating({ className }) {
  const userPcId = useSelector(selectUserPcId);
  const [ratingList, setRatingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRatingList = async () => {
    try {
      setIsLoading(true);
      const body = { pc_id: userPcId };
      const response = await API.post(apiURLs.rankings, body);
      const ratingsData = response.data;
      setRatingList(ratingsData);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, LOADER_TIMEOUT);
    }
  };

  useEffect(() => {
    getRatingList();
  }, []);

  return (
    <div className={cn("rating", className)}>
      <Card title="Your rating">
        {isLoading && <Loader />}
        {ratingList.length === 0 && !isLoading && (
          <div className="rating__empty-state heading-tertiary">Data not found</div>
        )}
        {ratingList.length > 0 && !isLoading && (
          <div className="rating__list">
            {ratingList.map((item, index) => (
              <RatingCard key={item.title} rating={item} index={index} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

Rating.propTypes = {
  className: PropTypes.string
};

export default Rating;

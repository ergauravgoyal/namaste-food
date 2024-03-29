import React from "react";
import { CDN_URL } from "../utils/constants";

const styleCard = {
  backgroundColor: "transparent",
};

const RestaurantCard = (restaurantData) => {
  const {
    resName,
    cuisine,
    starRating,
    deliveryTime,
    cloudinaryImageId,
    costForTwo,
  } = restaurantData;

  return (
    <div style={styleCard}>
      <img
        className="res-logo"
        alt="rajasthani food"
        src={`${CDN_URL}${cloudinaryImageId}`}
      />
      <h3>{resName}</h3>
      <h4>{cuisine}</h4>
      <h4>{starRating} stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{deliveryTime}</h4>
    </div>
  );
};
export default RestaurantCard;

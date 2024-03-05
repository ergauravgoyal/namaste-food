import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import "./Body.css";
// import { resList } from "../utils/mockData";

const Body = () => {
  const [resList, setResList] = useState([]);
  const [sortedList, setSortedList] = useState(resList);
  const [isLoading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const sortTopRestaurents = () => {
    //The sort function does not create a new array, it mutates the old one. So you're rearranging the existing state, and then setting state with the same array. Since it's the same array, react thinks the state hasn't changed and skips rendering.
    const list = [...resList];
    list.sort((a, b) => b.info.avgRating - a.info.avgRating);
    setSortedList(list);
  };
  const filterTopRestaurents = () => {
    const list = resList.filter((a) => a.info.avgRating > 4.5);
    setSortedList(list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {};
  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.45970&lng=77.02820"
      );
      const json = await data.json();
      console.log(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setResList(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setSortedList(
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e?.target?.value)}
          />
          <button onClick={handleSearch}>Search </button>
        </div>
        <button className="filter-btn" onClick={() => sortTopRestaurents()}>
          Sort Restautents by Rating
        </button>
        <button className="filter-btn" onClick={() => filterTopRestaurents()}>
          Filter Top Rated Restaurents
        </button>
      </div>
      <div className="restaurant-container">
        {isLoading ? (
          <>
            <Shimmer />
          </>
        ) : (
          <>
            {" "}
            {sortedList?.map(({ info }) => {
              const {
                id,
                name,
                cuisines,
                sla,
                avgRating,
                cloudinaryImageId,
                costForTwo,
              } = info ? info : {};
              return (
                <RestaurantCard
                  key={id}
                  resName={name}
                  cuisine={cuisines.join(", ")}
                  deliveryTime={sla.slaString}
                  starRating={avgRating}
                  cloudinaryImageId={cloudinaryImageId}
                  costForTwo={costForTwo}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Body;

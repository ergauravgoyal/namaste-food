import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import "./Body.css";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [resList, setResList] = useState([]);
  const [sortedList, setSortedList] = useState(resList);
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
  });

  const [geolocationFound, isGeoLocationFound] = useState(false);
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
    if (position.longitude !== null && !isLoading) {
      debugger;
      fetchData(position);
      setLoading(true);
    }
  }, [position, geolocationFound]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      isGeoLocationFound(true);
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        localStorage.setItem("longitude", position.coords.longitude);
        localStorage.setItem("latitude", position.coords.latitude);
      });
    } else {
      isGeoLocationFound(false);
      console.log("Geolocation is not available");
    }
  }, []);

  useEffect(() => {
    if (searchText === "") {
      setSortedList(resList);
    }
  }, [searchText]);

  const handleSearch = () => {
    console.log(sortedList);

    const list = sortedList.filter(({ info }) =>
      info.name.toLowerCase().includes(searchText)
    );
    if (list.length > 0) {
      setSortedList(list);
    }
  };

  const fetchData = async (position) => {
    try {
      const data = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${position.latitude}&lng=${position.longitude}`
      );
      const json = await data.json();
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

  const onlineStatus = useOnlineStatus();
  return (
    <>
      {onlineStatus ? (
        <div className="body">
          <div className="filter">
            <div className="search">
              <input
                type="text"
                className="search-box"
                value={searchText}
                onChange={(e) => setSearchText(e?.target?.value.toLowerCase())}
              />
              <button onClick={handleSearch}>Search </button>
            </div>
            <button className="filter-btn" onClick={() => sortTopRestaurents()}>
              Sort Restautents by Rating
            </button>
            <button
              className="filter-btn"
              onClick={() => filterTopRestaurents()}
            >
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
                  const { id, name, cuisines, sla, avgRating, costForTwo } =
                    info ? info : {};

                  return (
                    <Link
                      to={`/restaurant/${id}`}
                      key={id}
                      className="res-card"
                    >
                      <RestaurantCard
                        resName={name}
                        cuisine={cuisines.join(", ")}
                        deliveryTime={sla.slaString}
                        starRating={avgRating}
                        costForTwo={costForTwo}
                        {...info}
                      />
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
      ) : (
        <h1>Please check your internet connection</h1>
      )}
    </>
  );
};

export default Body;

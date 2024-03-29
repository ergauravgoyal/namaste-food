import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { CDN_URL, MENU_ITEM_CDN_URL } from "../utils/constants";
import "./RestaurentMenu.css";
import { useParams } from "react-router-dom";

// const MENU_ITEM_CDN_URL =
//   "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";
const RestaurantMenu = () => {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    const longitude = localStorage.getItem("longitude");
    const latitude = localStorage.getItem("longitude");
    fetchMenu(longitude, latitude, resId);
  }, []);

  const fetchMenu = async (longitude, latitude, id) => {
    const URL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.45970&lng=77.02820&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;
    const dynamicURL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&restaurantId=${id}`;
    const data = await fetch(URL);
    const json = await data.json();
    console.log(json.data);
    setResInfo(json.data);
  };

  const { name, cuisines, cloudinaryImageId, costForTwoMessage } = resInfo
    ?.cards[2]?.card?.card?.info
    ? resInfo?.cards[2]?.card?.card?.info
    : {};

  const { itemCards } = resInfo
    ? resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
        ?.card
    : {};
  debugger;

  return (
    <>
      {resInfo === null ? (
        <Shimmer />
      ) : (
        <div className="menu">
          <h1>{name}</h1>
          <img src={`${CDN_URL}${cloudinaryImageId}`} />
          <p>
            {cuisines.join(", ")} - {costForTwoMessage}
          </p>

          <div className="menu-item-container">
            {itemCards?.map((item) => {
              debugger;
              const { id, name, imageId, price, description } = item
                ? item?.card?.info
                : {};

              return (
                <div key={id} className="menu-item">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "space-between",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: "700" }}>{name}</span>
                      <span>
                        {" "}
                        &#8377;
                        {price / 100}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: "grey" }}>{description}</span>
                    </div>
                  </div>
                  <img src={`${MENU_ITEM_CDN_URL}${imageId}`} alt={name} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default RestaurantMenu;
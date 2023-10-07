import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faHeart as faHeartOutline,
} from "@fortawesome/free-solid-svg-icons";
import { useFavoriteContext } from "../context/FavoriteContext";
import { useState } from "react";

function FavoriteButton({ auctionId }) {
  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoriteContext();

  const [isFavorited, setIsFavorited] = useState(favorites.includes(auctionId));

  const handleClick = () => {
    if (isFavorited) {
      removeFromFavorites(auctionId);
    } else {
      addToFavorites(auctionId);
    }

    setIsFavorited(!isFavorited);
  };

  return (
    <FontAwesomeIcon
      icon={isFavorited ? faHeartSolid : faHeartOutline}
      onClick={handleClick}
      style={{ color: isFavorited ? "red" : "black", cursor: "pointer" }}
    />
  );
}

export default FavoriteButton;

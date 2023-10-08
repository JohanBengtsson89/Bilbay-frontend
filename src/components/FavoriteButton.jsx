import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faHeart as faHeartOutline,
} from "@fortawesome/free-solid-svg-icons";
import { useFavoriteContext } from "../context/FavoriteContext";

function FavoriteButton({ auctionId }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavoriteContext();

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setIsFavorited(favorites.some(favorite => favorite.auctionId === auctionId));
  }, [favorites, auctionId]);

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

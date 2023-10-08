import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FavoriteContext = createContext();

export const useFavoriteContext = () => useContext(FavoriteContext);

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  const [auctionList, setAuctions] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserId(storedUser.id);

      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavorites(storedFavorites.filter(fav => fav.userId === storedUser.id));
    }
  }, []);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/auctions");
        setAuctions(res.data);
      } catch (err) {
        console.log("Error fetching data: " + err);
      }
    };
    fetchAuctions();
  }, []);

  const addToFavorites = (auctionId) => {
    try {
      const newFavorite = { userId, auctionId };
      const newFavorites = [...favorites, newFavorite];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = (auctionId) => {
    try {
      const updatedFavorites = favorites.filter((fav) => fav.auctionId !== auctionId);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const getAuctionDetails = (favoritesAuctionId) => {
    const favorite = favorites.find((fav) => fav.auctionId === favoritesAuctionId);
    if (favorite) {
      const auction = auctionList.find((auction) => auction.id === favorite.auctionId);
      return auction ? auction.product : null;
    }
  };

  const contextValue = {
    userId,
    auctionList,
    favorites,
    addToFavorites,
    removeFromFavorites,
    getAuctionDetails,
  };

  return (
    <FavoriteContext.Provider value={contextValue}>
      {children}
    </FavoriteContext.Provider>
  );
};

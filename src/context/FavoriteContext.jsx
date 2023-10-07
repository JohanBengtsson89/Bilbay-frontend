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

      const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
      setFavorites(storedFavorites);
      console.log(storedFavorites);
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
      const newFavorites = [...favorites, auctionId];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = (auctionId) => {
    try {
      const updatedFavorites = favorites.filter((id) => id !== auctionId);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const getAuctionDetails = (favoritesAuctionId) => {
    const auction = auctionList.find(
      (auction) => auction.id === favoritesAuctionId
    );
    return auction ? auction.product : null;
  };

  const contextValue = {
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

import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const AuctionsContext = createContext();

export function useAuctions() {
  return useContext(AuctionsContext);
}

export function AuctionsProvider({ children }) {
  let userId = null;
  try {
    userId = JSON.parse(window.localStorage.getItem("user")).id;

    //****This code works instead of verifying by userID****
    // if (document.cookie.indexOf("your_cookie_name=") === -1) {
    //   console.log("Cookie is not present. Stopping code execution.");
      
    //   return null;}

  } catch (error) {
    console.log("Not logged in: ", error);
  }

  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/auth/auctions`)
      .then((response) => {
        setAuctions(response.data);
        setLoading(false); // Set loading to false when data is fetched
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        setLoading(false); // Set loading to false in case of error
        setError(err); // Set the error message
      });
      axios
      .get(`${apiUrl}/api/auth/favorite/${userId}`, { withCredentials: true })
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data
          : [response.data];
    
        // Create an array of objects with each object containing an ID
        const favoritesArray = data.map((item) => ({ id: item.id }));
    
        // Set the favorites array in state
        setFavorites(favoritesArray);
    
        console.log("Favorite Array:", favoritesArray);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  // useEffect(() => {
  //   console.log("Favorites Updated:", favorites);
  // }, [favorites]);

  return (
    <AuctionsContext.Provider
      value={{ auctions, setAuctions, loading, error, favorites, setFavorites }}
    >
      {children}
    </AuctionsContext.Provider>
  );
}
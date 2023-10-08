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
  } catch (error) {
    console.log("Not logged in: ", error);
  }

  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/auctions`)
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
      .get(`${apiUrl}/api/auth/favorite/${userId}`)
      .then((response) => {
        console.log(response.data)
        const id = Array.isArray(response.data)
          ? response.data.map((item) => item.id)
          : response.data.id;

        // Set the 'id' or array of 'id's as favorites
        setFavorites(Array.isArray(id) ? id : [id]);

        console.log("Favorite ID(s):", id);

        // console.log("response.data.id: ", response.data.id)
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  useEffect(() => {
    console.log("Favorites Updated:", favorites);
  }, [favorites]);

  return (
    <AuctionsContext.Provider value={{ auctions, setAuctions, loading, error, favorites, setFavorites }}>
      {children}
    </AuctionsContext.Provider>
  );
}

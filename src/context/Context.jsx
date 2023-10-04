import axios from "axios";
import { createContext, useState, useEffect, useContext  } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const AuctionsContext = createContext();

export function useAuctions() {
  return useContext(AuctionsContext);
}

export function AuctionsProvider({ children }) {
    
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/auctions`)
      .then((response) => {
        setAuctions(response.data);
        setLoading(false); // Set loading to false when data is fetched
        setError(null);    // Clear any previous errors
      })
      .catch((err) => {
        setLoading(false); // Set loading to false in case of error
        setError(err);     // Set the error message
      });
  }, []); 
  
  return (
    <AuctionsContext.Provider value={{ auctions, loading, error }}>
      {children}
    </AuctionsContext.Provider>
  );
}

import axios from "axios";
import { useState, useEffect } from "react";

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "http://localhost:8080/api/auctions";

    axios
      .get(apiUrl)
      .then((response) => {
        setAuctions(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      Auctions
      <ul>
        {auctions.map((auction) => (
          <li key={auction.id}>
            <h3>ID: {auction.id}</h3>
            <p>User: {auction.user}</p>
            <p>Product: {auction.product}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Auctions;

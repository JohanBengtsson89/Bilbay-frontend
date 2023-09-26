import axios from "axios";
import { useState, useEffect } from "react";

const AuctionsPage = () => {
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
    <>
    <div>Auctions</div>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly"
        // marginLeft: "25%",
        // marginRight: "25%"
      
      }}
    >
      <div className="mx-auto" style={{display: "flex",
        flexWrap: "wrap", alignSelf: "center"}}>
      {auctions.map((auction) => (
        <div key={auction.id} style={{ padding: "10px", width: "30%", display: "flex", flexDirection: "column", border: "solid black" }}>
          <h3>ID: {auction.id}</h3>
          <p>User: {auction.user}</p>
          <p>Product: {auction.product.productName}</p>
        </div>
      ))}
      </div>
    </div>
    </> 
  );
  
};

export default AuctionsPage;

import axios from "axios";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";

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
      <div
        className="auctionsContainer"
        // style={{
        //   display: "flex",
        //   flexWrap: "wrap",
        //   justifyContent: "space-evenly",
        //   // marginLeft: "25%",
        //   // marginRight: "25%"
        // }}
      >
        <div>Sidemenu</div>
        <div
          className="auctionsMain m-0"
          // style={{ display: "flex", flexWrap: "wrap", alignSelf: "center" }}
        >
          {auctions.map((auction) => (
            <div
              key={auction.id}
              className="h-96 w-72 content-center"
              style={{
                margin: "15px",
                // width: "33.33%",
                // minHeight: "200px",
                // display: "flex",
                // flexDirection: "column",

                backgroundColor: "#BFC3CC",
              }}
            >
            <Link to={`/auction/${auction.id}`}>
              <div
                style={{
                  backgroundImage: `url(${auction.product.productSpecification.productPhoto})`, 
                  borderRadius: "10px",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  minHeight: "50%",
                }}
              ></div>
              </Link>
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

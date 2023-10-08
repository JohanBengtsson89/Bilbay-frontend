import React, { useEffect, useState } from "react";
import { useAuctions, AuctionsProvider } from "../../context/Context";
import { Auctions } from "../Auctions";
import { Link } from "react-router-dom";
import Lambo from'../../assets/Lamboo.png';
import {
  useFavoriteContext,
  FavoriteProvider,
} from "../../context/FavoriteContext";

export const HomePage = () => {
  const { auctions } = useAuctions();
  const [randomAuctions, setRandomAuctions] = useState([]);

  const getRandomAuctions = (arr, count) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const numberOfRandomAuctions = 3;
    setRandomAuctions(getRandomAuctions(auctions, numberOfRandomAuctions));
  }, [auctions]);

  return (
    <>
      <p
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Bilbay Auction
      </p>
      
      {auctions.length > 2 ? (
        <>
          <div
            style={{
              marginTop: "100px",
              justifyContent: "center",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <Auctions filteredAuctions={randomAuctions} />
          </div>
          <Link to={`/auctions`}>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                className="button1"
                style={{
                  border: "1px solid transparent",
                  backgroundColor: "#c89090",
                  fontSize: "medium",
                  borderRadius: "8px",
                  padding: "10px 20px",
                }}
              >
                More Auction
              </button>
            </div>
          </Link>
        </>
      ) : (
        <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "70vh",
      marginTop:"50px"
    }}
  >
    <img
      src={Lambo}
      alt="Car Placeholder"
      style={{ maxWidth: "70%" }}
    />
    <Link to={`/auctions`} style={{ textDecoration: "none", marginTop: "10px", display: "block" }}>
      <button
        className="button1"
        style={{
          backgroundColor: "#c89090",
          fontSize: "18px",
          borderRadius: "8px",
          padding: "10px 20px",
          cursor: "pointer",
          marginTop:"30px"
        }}
      >
        More Auction
      </button>
    </Link>
  </div>
      )}
    </>
  );
};
const FavoriteWithContext = () => (
  <FavoriteProvider>
    <HomePage />
  </FavoriteProvider>
);

export default FavoriteWithContext;

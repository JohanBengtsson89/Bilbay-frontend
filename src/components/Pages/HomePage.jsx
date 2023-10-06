import React, { useEffect, useState } from "react";
import { useAuctions } from "../../context/Context";
import { Auctions } from "../Auctions";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { auctions} = useAuctions();
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
  );
};

export default HomePage;

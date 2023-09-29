import React, { useEffect, useState } from "react";
import "./BidComponent.css";
import axios from "axios";

const BidComponent = () => {
  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState([]);
  const [buyerId, setBuyerId] = useState("9");
  const [auctionId, setAuctionId] = useState("1");

  useEffect(() => {
    //we must have a dynamic id for user by checking localhost data and get the id there
    axios
      .get("http://localhost:8080/api/test/user/9")
      .then((response) => {
        //console.log(response);
        //setBuyerId(response.data);
        //setAuctionId(response.data.auctions.id)
      })
      .catch((error) => {
        console.error("error fetching IDs : ", error);
      });
    //We must have dynamic auction-id instead of hard coding
    axios
      .get(`http://localhost:8080/api/1/all-bids`)
      .then((response) => {
        console.log("Bids:", response.data);
        setBids(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bids:", error);
      });
  }, []);

  const handleBidAmountChange = (event) => {
    setBidAmount(event.target.value);
  };

  const handleAddBid = () => {
    const newBid = {
      buyer: { id: buyerId },
      auction: { id: auctionId },
      bidAmount: parseInt(bidAmount),
    };

    axios
      .post("http://localhost:8080/api/bid", newBid)
      .then((response) => {
        setBids([...bids, response.data]);
      })
      .catch((error) => {
        console.error("Error creating bid:", error);
      });

    setBidAmount("");
  };

  return (
    <div style={{ display: "flex",
     justifyContent: "center",
      alignItems: "center",
       height: "120vh",
        width: "60vh",
        marginLeft:"60%"
        }}>
      <div className="container">
        <div style={{padding:"15px"}}>
          <ul>
            {bids.map((bid, index) => (
              <li key={index}>
                {index + 1} - $ {bid.bidAmount}{" "}
                <span style={{ margin: "50px" }}></span> {bid.createdAt}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <input
            placeholder="$"
            className="input"
            type="number"
            id="bidAmount"
            value={bidAmount}
            onChange={handleBidAmountChange}
          />
          <button className="button" onClick={handleAddBid}>
            Add bid
          </button>
        </div>

      </div>
    </div>
  );
};

export default BidComponent;

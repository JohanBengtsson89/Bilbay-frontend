import React, { useEffect, useState } from "react";
import "./BidComponent.css";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const BidComponent = () => {
  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState([]);
  const [buyerId, setBuyerId] = useState("9");
  const [auctionId, setAuctionId] = useState("1");

  useEffect(() => {
    
    axios
      .get(`${apiUrl}/api/test/user/${buyerId}`, { withCredentials: true })
      .then((response) => {
      })
      .catch((error) => {
        console.error("error fetching IDs : ", error);
      });

    axios
      .get(`${apiUrl}/api/auth/${buyerId}/all-bids`, { withCredentials: true })
      .then((response) => {
        console.log("Bids:", response.data);
        const sortedBids = response.data.sort((a, b) =>  b.bidAmount - a.bidAmount);
        setBids(sortedBids);
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

    if (bids.length > 0 && newBid.bidAmount <= bids[0].bidAmount) {
      alert("OOOOPPPSS: Bid amount must be higher than the latest bid.");
      return;
    }

    axios
      .post(`${apiUrl}/api/auth/bid`, newBid, { withCredentials: true })
      .then((response) => {
        setBids([...bids, response.data]);
      })
      .catch((error) => {
        console.error("Error creating bid:", error);
      });

    setBidAmount("");
  };

  return (
    <div className="bg-[#bfc3cc] w-fit px-5 absolute bottom-0 mb-40 right-0 mr-20 rounded-lg ">
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
  );
};

export default BidComponent;

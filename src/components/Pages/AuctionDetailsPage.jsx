import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AuctionDetailsStyles.css";
import picture from "/src/assets/robert-bye-tG36rvCeqng-unsplash.jpg";
import { Button } from "@mui/base";
import Axios from "axios";
import { fontSize } from "@mui/system";

const apiUrl = import.meta.env.VITE_API_URL;

const AuctionDetails = () => {
  const params = useParams();
  const [bidAmount, setBidAmount] = useState("");
  const [auction, setAuction] = useState({});
  const [product, setProduct] = useState({});
  const [productSpecification, setProductSpecification] = useState({});
  const [bids, setBids] = useState([]);
  const [error, setError] = useState(null);
  const [buyerId, setBuyerId] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setBuyerId(storedUser.id);
    }
  }, []);

  const getAuction = () => {
    Axios.get(`${apiUrl}/api/auction/${params.auctionId}`)
      .then((response) => {
        setAuction(response.data);
        setProduct(response.data.product);
        setProductSpecification(response.data.product.productSpecification);

        const sortedBids = [...response.data.bids]
          .sort((bidA, bidB) => bidB.bidAmount - bidA.bidAmount)
          .slice(0, 5);

        setBids(sortedBids);
      })
      .catch((error) => {
        setError(error);
        console.log("Halloj error");
      });
  };

  const handleBidAmountChange = (event) => {
    setBidAmount(event.target.value);
  };

  const handleAddBid = () => {
    const newBid = {
      buyer: { id: buyerId },
      auction: { id: auction.id },
      bidAmount: parseInt(bidAmount),
    };

    if (bids.length > 0 && newBid.bidAmount <= bids[0].bidAmount || isNaN(newBid.bidAmount)) {
      alert("OOOOPPPSS: Bid amount must be higher than the latest bid.");
      return;
    }
    console.log(newBid)

    Axios.post(`${apiUrl}/api/bid`, newBid)
      .then((response) => {
        setBids([...bids, response.data]);
      })
      .catch((error) => {
        console.error("Error creating bid:", error);
      });

    setBidAmount("");
  };

  useEffect(() => {
    getAuction();
  }, [bids]);

  return (
    <>
      <div className="product-specs">
        <div className="left-side">
          <img
            className="picture"
            src={productSpecification.productPhoto}
            alt="Error loading picture"
          />
          <div style={{ fontSize: "32px" }}>Name: {product.productName}</div>
          <div style={{ width: "745px" }}>{product.productDescription}</div>
        </div>
        <div className="right-side">
          <div className="product-info">
            <div style={{ fontSize: "24px" }}>Product specification:</div>
            <div>HorsePower: {productSpecification.enginePower}</div>
            <div>Mileage: {productSpecification.mileage}</div>
            <div>Gear: {productSpecification.gear}</div>
          </div>
          <div className="bids-info">
            <div style={{ fontSize: "24px" }}>Bids:</div>
            <ul>
              {bids.map((bid, index) => (
                <li key={index}>
                  {index + 1} - $ {bid.bidAmount}{" "}
                  <span style={{ margin: "50px" }}></span> {bid.createdAt}
                </li>
              ))}
            </ul>
            <div className="place-bid">
              <input
                placeholder="$"
                className="input-bid"
                type="number"
                id="bidAmount"
                value={bidAmount}
                onChange={handleBidAmountChange}
              />
              <Button
                className="place-bid-btn"
                onClick={handleAddBid}
                style={{ backgroundColor: "#C89090" }}
              >
                Place Bid
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionDetails;

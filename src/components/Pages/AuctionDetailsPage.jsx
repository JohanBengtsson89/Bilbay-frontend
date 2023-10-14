import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AuctionDetailsStyles.css";
import picture from "/src/assets/robert-bye-tG36rvCeqng-unsplash.jpg";
import { Button } from "@mui/base";
import Axios from "axios";
import { fontSize } from "@mui/system";
import { FavoriteButton } from "../FavoriteButton";

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
  const [errorMessage, setErrorMessage] = useState(null);

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
        console.log("Error fetching data");
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

    if (
      (bids.length > 0 && newBid.bidAmount <= bids[0].bidAmount) ||
      isNaN(newBid.bidAmount) ||
      newBid.bidAmount <= product.originalPrice
    ) {
      setErrorMessage("Bid amount must be higher than the latest bid");
      return;
    }

    Axios.post(`${apiUrl}/api/bid`, newBid)
      .then((response) => {
        const sortedBids = [...bids, response.data]
          .sort((bidA, bidB) => bidB.bidAmount - bidA.bidAmount)
          .slice(0, 5);
        setBids(sortedBids);
        console.log(bids);
      })
      .catch((error) => {
        console.error("Error creating bid:", error);
      });

    setBidAmount("");
    setErrorMessage(null);
  };

  useEffect(() => {}, [bids]);

  useEffect(() => {
    getAuction();
  }, [params.auctionId]);

  return (
    <>
      <div className="product-specs">
        <div className="left-side">
          <img
            className="picture"
            src={productSpecification.productPhoto}
            alt="Error loading picture"
          />
          <div className="price-favo">
            <div
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                borderBottom: "1px solid black",
                paddingRight: "60%",
              }}
            >
              {" "}
              $ {product.originalPrice}{" "}
            </div>
            <FavoriteButton className="favoBtn" auctionId={auction.id} />
          </div>
          <div style={{ fontSize: "32px", fontWeight: "bold" }}>
            {product.productName}
          </div>

          <div style={{ width: "745px" }}>{product.productDescription}</div>
        </div>
        <div className="right-side">
          <div className="product-info">
            <div
              className="highest-bid"
              style={{ borderBottom: "1px solid black", fontWeight: "bold" }}
            >
              <p style={{ fontSize: "15px", marginLeft: "3%" }}>Highest bid</p>
              <h1 style={{ marginLeft: "3%", fontSize: "32px" }}>
                {" "}
                $ {bids.length > 0 ? bids[0].bidAmount : 0}
              </h1>
            </div>

            <div style={{ fontSize: "24px" }}>Product specification:</div>

            <li>Brand: {productSpecification.brand}</li>
            <li>Model year: {productSpecification.modelYear} </li>
            <li>Gear: {productSpecification.gear}</li>
            <li>Engine power: {productSpecification.enginePower}</li>
            <li>Mileage: {productSpecification.mileage}</li>
            <li>Colour: {productSpecification.color} </li>
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
                style={{
                  backgroundColor: "#C89090",
                  cursor: buyerId ? "pointer" : "not-allowed",
                  opacity: buyerId ? 1 : 0.5,
                }}
                disabled={!buyerId}
              >
                Place Bid
              </Button>
            </div>
            <p className="text-red-500 text-sm pl-7">{errorMessage}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionDetails;

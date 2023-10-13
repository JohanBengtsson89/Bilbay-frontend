import { Link } from "react-router-dom";
import { FavoriteButton } from "./FavoriteButton";

export function Auctions({ filteredAuctions }) {
  return (
    <div className="auctionsMain m-0">
      {filteredAuctions.map((auction) => (
        <div
          key={auction.id}
          className="h-96 w-72 content-center"
          style={{
            margin: "15px",
            backgroundColor: "#BFC3CC",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link to={`/auction/${auction.id}`}>
            <img
              src={auction.product.productSpecification.productPhoto}
              style={{
                borderRadius: "10px",
                minHeight: "auto",
                width: "100%",
              }}
            />
          </Link>
          <div style={{ flex: 1 }}>
            <p>Product: {auction.product.productName}</p>
            <p>Model Year: {auction.product.productSpecification.modelYear}</p>
            <p>Gearbox: {auction.product.productSpecification.gear}</p>
            <p>
              Engine Power: {auction.product.productSpecification.enginePower}
            </p>
            <p>Mileage: {auction.product.productSpecification.mileage}</p>
            <p>Color: {auction.product.productSpecification.color}</p>
          </div>
          <div className="favoriteBtn">
            <FavoriteButton auctionId={auction.id} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Auctions;

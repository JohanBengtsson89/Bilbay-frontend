import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import {
  FavoriteProvider,
} from "../context/FavoriteContext";
import { useAuctions } from "../context/Context";
//I added a ternary to make sure auction runs wether filteredAuction or the main auction
export function Auctions({ filteredAuctions }) {
  // const {auctions } = useAuctions([]);
  // const { auctions } = filteredAuctions ? { auctions: filteredAuctions } : useAuctions([]);

  return (
    <FavoriteProvider>
    <div className="auctionsMain m-0">
      {filteredAuctions.map((auction) => (
        <div
          key={auction.id}
          className="h-96 w-72 content-center"
          style={{
            margin: "15px",
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
                width: "100%",
              }}
            ></div>
          </Link>
          <p>ID: {auction.product.productSpecification.id}</p>
          <p>Gear: {auction.product.productSpecification.gear}</p>
          <p>User: {auction.user}</p>
          <p>Product: {auction.product.productName}</p>
          <p>Model Year: {auction.product.productSpecification.modelYear}</p>
          <FavoriteButton auctionId={auction.id} />
        </div>
      ))}
    </div>
    </FavoriteProvider>
  );
}

// const FavoriteWithContext = () => (
  
//     <Auctions />
  
// );

export default Auctions;

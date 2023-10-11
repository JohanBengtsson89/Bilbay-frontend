import { Link } from "react-router-dom";
import { useAuctions } from "../context/Context";
import { FavoriteButton } from "./FavoriteButton";

export default function Favorite() {
  const { auctions, favorites, setFavorites } = useAuctions();

  return (
    <div className="auctionsMain m-0">
      {favorites.map((favorite, index) => {
        {
          /* const productAuction = getAuctionDetails(favorite.auctionId); */
        }
        {
          /* console.log("Auction Details:", productAuction); */
        }
        const matchingAuction = auctions.find(
          (auction) => auction.id === favorite.id
        );
        return (
          <div
            className="h-96 w-72 content-center"
            key={index}
            style={{ margin: "15px", backgroundColor: "#BFC3CC" }}
          >
            <p>Auction ID: {favorite.id}</p>

            <Link to={`/auction/${favorite.auctionId}`}>
              <div
                style={{
                  backgroundImage: `url(${matchingAuction.product.productSpecification.productPhoto})`,
                  borderRadius: "10px",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  minHeight: "50%",
                  width: "100%",
                }}
              ></div>
            </Link>
            <div>
              {/* {console.log("Favorites: ", favorites)}
              {console.log("Auctions: ", auctions)} */}

              {matchingAuction && ( // Use && to conditionally render when matchingAuction is truthy
                <div key={matchingAuction.id}>
                  <p>User: {matchingAuction.user}</p>
                  <p>Auction Name: {matchingAuction.product.productName}</p>
                  <p>
                    Model Year:{" "}
                    {matchingAuction.product.productSpecification.modelYear}
                  </p>
                  <FavoriteButton auctionId={favorite.id} favorites={favorites} setFavorites={setFavorites} />
                </div>
              )}
              
            </div>
          </div>
        );
      })}
    </div>
  );
}

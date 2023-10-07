import React from "react";
import FavoriteButton from "./FavoriteButton";
import {
  useFavoriteContext,
  FavoriteProvider,
} from "../context/FavoriteContext";
import { Link } from "react-router-dom";

export function Favorite() {
  const { favorites, getAuctionDetails } = useFavoriteContext();

  return (
    <div className="auctionsMain m-0">
      {favorites.map((favoritesAuctionId, index) => {
        const productAuction = getAuctionDetails(favoritesAuctionId);
        return (
          <div
            className="h-96 w-72 content-center"
            key={index}
            style={{ margin: "15px", backgroundColor: "#BFC3CC" }}
          >
            <p>Auction ID: {favoritesAuctionId}</p>
            {productAuction ? (
              <>
                <Link to={`/auction/${favoritesAuctionId}`}>
                  <div
                    style={{
                      backgroundImage: `url(${productAuction.productSpecification.productPhoto})`,
                      borderRadius: "10px",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      minHeight: "50%",
                      width: "100%",
                    }}
                  ></div>
                </Link>
                <div>
                  <p>User: {productAuction.user}</p>
                  <p>Auction Name: {productAuction.productName}</p>
                  <p>
                    Model Year {productAuction.productSpecification.modelYear}
                  </p>
                </div>
              </>
            ) : (
              <p>Auction details not found</p>
            )}
            <FavoriteButton auctionId={favoritesAuctionId} />
          </div>
        );
      })}
    </div>
  );
}

const FavoriteWithContext = () => (
  <FavoriteProvider>
    <Favorite />
  </FavoriteProvider>
);

export default FavoriteWithContext;

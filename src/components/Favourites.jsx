import React from "react";
import FavoriteButton from "./FavoriteButton";
import {useFavoriteContext,FavoriteProvider,} from "../context/FavoriteContext";
import { Link } from "react-router-dom";

export function Favorite() {
  const {userId, favorites, getAuctionDetails } = useFavoriteContext();
  const validFavorites = favorites.filter((favorite) => favorite.userId === userId);

  return (
    <div className="auctionsMain m-0">
      {validFavorites.map((favorite, index) => {
        const productAuction = getAuctionDetails(favorite.auctionId);
        console.log("Auction Details:", productAuction);

        

        return (
          <div
            className="h-96 w-72 content-center"
            key={index}
            style={{ margin: "15px", backgroundColor: "#BFC3CC" }}
          >
            <p>Auction ID: {favorite.auctionId}</p>
            {productAuction ? (
              <>
                <Link to={`/auction/${favorite.auctionId}`}>
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
            <FavoriteButton auctionId={favorite.auctionId} />
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

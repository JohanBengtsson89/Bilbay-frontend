import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faHeart as faHeartOutline,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserId(storedUser.id);

      const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
      setFavorites(storedFavorites);

      // axios
      //   .get(`http://localhost:8080/api/getFavorites`)
      //   .then((response) => {
      //     setFavorites(response.data);
      //     localStorage.setItem("favorites", JSON.stringify(response.data));
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching favorites:", error);
      //   });

      axios
        .get("http://localhost:8080/api/auctions")
        .then((response) => {
          setAuctions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching auctions:", error);
        });
    }
  }, []);

  // const addToFavorites = (auctionId) => {
  //   axios
  //     .post(`http://localhost:8080/api/favorite/${userId}/${auctionId}`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         const newFavorites = [...favorites, auctionId];
  //         setFavorites(newFavorites);
  //         localStorage.setItem("favorites", JSON.stringify(newFavorites));
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error adding to favorites:", error);
  //     });
  // };

  const addToFavorites = (auctionId) => {
    try {
      const newFavorites = [...favorites, auctionId];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  function removeFromLocalStorage(auctionId, setFavorites) {
    try {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const updatedFavorites = storedFavorites.filter((id) => id !== auctionId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      if (setFavorites) {
        setFavorites(updatedFavorites);
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  }

  // const removeFromFavorites = (auctionId) => {
  //   axios
  //     .delete(
  //       `http://localhost:8080/api/delete-favorite/${userId}/${auctionId}`
  //     )
  //     .then((response) => {
  //       if (response.status === 200) {
  //         const newFavorites = favorites.filter((item) => item !== auctionId);

  //         removeFromLocalStorage(auctionId);
  //         setFavorites(newFavorites);v
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error removing from favorites:", error);
  //     });
  // };

  const getAuctionDetails = (favoritesAuctionId) => {
    const auction = auctions.find(
      (auction) => auction.id === favoritesAuctionId
    );
    return auction ? auction.product : null;
  };

  return (
    <div>
      <h1 style={{fontWeight:"bold", fontSize:"20px"}}>Favorite</h1>
      <ul>
        {favorites.map((favoritesAuctionId, index) => {
          const productAuction = getAuctionDetails(favoritesAuctionId);
          // const favoriteAuction = auctions.find(
          //   (auction) => auction.id === favoritesAuctionId
          // );
          return (
            <li key={index}>
              <p>Auction ID: {favoritesAuctionId}</p>
              {productAuction ? (
                <div>
                  <p>User: {productAuction.user}</p>
                  <p>Auction Name: {productAuction.productName}</p>
                  <p>
                    Model Year {productAuction.productSpecification.modelYear}
                  </p>
                </div>
              ) : (
                <p>Auction details not found</p>
              )}
              <FontAwesomeIcon
                icon={faHeartSolid}
                onClick={() =>
                  removeFromLocalStorage(favoritesAuctionId, setFavorites)
                }
                style={{color:"red"}}
              />
            </li>
          );
        })}
      </ul>

      <h1 style={{fontWeight:"bold", fontSize:"20px"}}>Auctions</h1>
      <ul>
        {auctions.map((auction, index) => (
          <li key={index}>
            <p>Auction ID: {auction.id}</p>
            <p>User: {auction.user}</p>
            <p>Product name: {auction.product.productName}</p>
            <p>Model Year {auction.product.productSpecification.modelYear}</p>

            {favorites.includes(auction.id) ? (
              <FontAwesomeIcon
                icon={faHeartSolid}
                onClick={() => removeFromLocalStorage(auction.id, setFavorites)}
                style={{color:"red"}}
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeartOutline}
                onClick={() => addToFavorites(auction.id)}
                className="heart-icon"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Favorite;

import { useAuctions } from "../context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartSolid,
  faHeart as faHeartOutline,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export function FavoriteButton({ auctionId }) {
  const { favorites, setFavorites } = useAuctions();

  let userId = null;

  try {
    userId = JSON.parse(window.localStorage.getItem("user")).id;
  } catch (error) {
    console.log("Not logged in: ", error);
  }

  // const addToFavorites = async (auctionId) => {
  //   await axios
  //     .post(`${apiUrl}/api/auth/favorite/${userId}/${auctionId}`,{ withCredentials: true })
  //     .then((response) => {
  //       setFavorites((prevFavorites) => [...prevFavorites, { id: auctionId }]);
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const addToFavorites = async (auctionId) => {
    try {
  const response = await axios.post(`${apiUrl}/api/auth/favorite/${userId}/${auctionId}`, {}, { withCredentials: true });
  setFavorites((prevFavorites) => [...prevFavorites, { id: auctionId }]);
  console.log(response);
} catch (error) {
  console.log(error);
}
  };

  const removeFromFavorites = async (auctionId) => {
    console.log("Before Removal:", favorites);
    await axios
      .delete(`${apiUrl}/api/auth/delete-favorite/${userId}/${auctionId}`, { withCredentials: true })
      .then(() => {
        // Create a shallow copy of the array
        const newFavorites = favorites.filter((fav) => fav.id !== auctionId);

        // Update the state with the modified array
        setFavorites(newFavorites);
      })
      .catch((err) => {
        console.log(err);
      });
    // Create a new array reference without the removed auctionId
    console.log("After Removal:", favorites);

  };
  return (<>

  { userId && 
    <div>
      {favorites.some((favorite) => favorite.id === auctionId) ? (
        <FontAwesomeIcon
          icon={faHeartSolid}
          onClick={() => removeFromFavorites(auctionId)}
          className="heart-icon"
          style={{ color: "red" }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faHeartOutline}
          onClick={() => addToFavorites(auctionId)}
          className="heart-icon"
        />
      )}
    </div>
    }
    </>
  );
}

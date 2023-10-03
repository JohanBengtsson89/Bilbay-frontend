import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faHeart as faHeartOutline } from '@fortawesome/free-solid-svg-icons';
import './Favourite.css';

function Favorite() {
  
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  const [auctionId, setAuctionId] = useState(null);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUserId(storedUser.id);
    }
  }, []);
  

  useEffect(() => {

    const fetchAuction = async () => {
      try {
        const response = await axios.get('api/auctions');
        setAuctions(response.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchAuction();
  }, []);
  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`api/auth/favorite/{user_id}`);
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  const addToFavorites = async () => {
    try {
      const response = await axios.post('api/auth/favorite/{user_id}/{auction_id}', { userId, auctionId });
      const newFavorites = [...favorites, response.data];
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      await axios.delete('api/auth/favorite/{user_id}/{auction_id}');

      const newFavorites = favorites.filter((item) => item !== auctionId);
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  return (
    <div>
      
      <h1 className='auctions' >Auctions</h1>
      <ul>
        {auctions.map((auction, index) => (
          <li key={index}>
            {auction.startPrice}
            {favorites.includes(auction.id) ? (
              <FontAwesomeIcon icon={faHeartSolid} onClick={() => removeFromFavorites(auction.id)} className="heart-icon red"/>
            ) : (
              <FontAwesomeIcon icon={faHeartOutline} onClick={() => addToFavorites(auction.id)} className="heart-icon"/>
            )}
          </li>
        ))}
      </ul>

      <h1 className='favorite'>Favorite Auctions</h1>
      <ul>
        {favorites.map((auctionId, index) => (
          <li key={index}>
            {auctionId} 
            <FontAwesomeIcon icon={faHeartSolid} onClick={() => removeFromFavorites(auctionId)} className="heart-icon red"/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorite;

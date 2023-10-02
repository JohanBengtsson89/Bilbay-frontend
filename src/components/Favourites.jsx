import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faHeart as faHeartOutline } from '@fortawesome/free-solid-svg-icons';
import './Favourite.css';

const products = [
  {
    name: "Product 1",
    price: 19.99,
    description: "Something",
  },
  {
    name: "Product 2",
    price: 29.99,
    description: "Somthing",
  }
  
];

function Favorite() {
  
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);
  const [products, setProducts] = useState([]);

  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.example.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Include the user ID when fetching favorites
        const response = await axios.get(`https://api.example.com/favorites?userId=${userId}`);
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  const addToFavorites = async (productId) => {
    try {
      // Include the user ID and product ID when adding to favorites
      await axios.post('https://api.example.com/add-to-favorites', { userId, productId });
      const newFavorites = [...favorites, productId];
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };
  
  const removeFromFavorites = async (productId) => {
    try {
      // Include the user ID and product ID when removing from favorites
      await axios.delete('https://api.example.com/remove-from-favorites', {
        data: { userId, productId },
      });

      const newFavorites = favorites.filter((item) => item !== productId);
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };
  /* const addToFavorites = (product) => {
    if (!favorites.includes(product)) {
      
      const newFavorites = [...favorites, product];
      setFavorites(newFavorites);
    }
  };

  
  const removeFromFavorites = (product) => {
    const newFavorites = favorites.filter((item) => item !== product);
    setFavorites(newFavorites);
  }; */

  return (
    <div>
      
      <h1 className='products' >Products</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name}
            {favorites.includes(product.id) ? (
              <FontAwesomeIcon
                icon={faHeartSolid}
                onClick={() => removeFromFavorites(product.id)}
                className="heart-icon red"
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeartOutline}
                onClick={() => addToFavorites(product.id)}
                className="heart-icon"
              />
            )}
          </li>
        ))}
      </ul>

      <h1 className='favorite'>Favorite Products</h1>
      <ul>
        {favorites.map((productId, index) => (
          <li key={index}>
            {productId} 
            <FontAwesomeIcon
              icon={faHeartSolid}
              onClick={() => removeFromFavorites(productId)}
              className="heart-icon red"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorite;

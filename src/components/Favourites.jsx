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
  const [productId, setProductId] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      setUserId(storedUser.id);
    }
  }, []);
  

  useEffect(() => {
    // Jag tänker att vi ska hämta auction istället för product, även i backenden
    const fetchProducts = async () => {
      try {
        const response = await axios.get('api/get-all-products');
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

  //Ska vi byta product mot auction?
  const addToFavorites = async () => {
    try {
      const response = await axios.post('api/auth/favorite/{user_id}/{product_id}', { userId, productId });
      const newFavorites = [...favorites, response.data];
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };
  //Ska vi byta product mot auction?
  //Vi ska också fixa remove endpoint i backenden
  const removeFromFavorites = async () => {
    try {
      await axios.delete('api/auth/favorite/{id}');

      const newFavorites = favorites.filter((item) => item !== productId);
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

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

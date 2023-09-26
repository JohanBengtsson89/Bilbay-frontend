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
  
  
  const addToFavorites = (product) => {
    if (!favorites.includes(product)) {
      
      const newFavorites = [...favorites, product];
      setFavorites(newFavorites);
    }
  };

  
  const removeFromFavorites = (product) => {
    const newFavorites = favorites.filter((item) => item !== product);
    setFavorites(newFavorites);
  };

  return (
    <div>
      
      <h1 className='products' >Products</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name}
            {favorites.includes(product.name) ? (
              <FontAwesomeIcon
                icon={faHeartSolid}
                onClick={() => removeFromFavorites(product.name)}
                className="heart-icon red"
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeartOutline}
                onClick={() => addToFavorites(product.name)}
                className="heart-icon"
              />
            )}
          </li>
        ))}
      </ul>

      <h1 className='favorite'>Favorite Products</h1>
      <ul>
        {favorites.map((product, index) => (
          <li key={index}>
            {product} 
            <FontAwesomeIcon
              icon={faHeartSolid}
              onClick={() => removeFromFavorites(product)}
              className="heart-icon red"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorite;

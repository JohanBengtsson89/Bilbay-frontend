import React from 'react'
import {Link} from "react-router-dom"
import { useAuctions } from '../../context/Context';

export function Auctions({ filteredAuctions }) {

  return (
    
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
          <p>User: {auction.user}</p>
          <p>Product: {auction.product.productName}</p>
          <p>Model Year: {auction.product.productSpecification.modelYear}</p>
        </div>
      ))}
    </div>
  );
}

export default Auctions
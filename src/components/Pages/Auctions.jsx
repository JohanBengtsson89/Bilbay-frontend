import React from 'react'
import {Link} from "react-router-dom"

const Auctions = () => {
  return (
    <div>
      <h1>Auctions</h1>
      <ul>
        <li>
          <Link className="auctions" to="/auction/1">
          auction1
          </Link>
        </li>
        <li>
          <Link className="auctions" to="/auction/2">
          auction2
          </Link>
        </li>
        <li>
          <Link className="auctions" to="/auction/3">
          auction3
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Auctions
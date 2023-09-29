import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AuctionDetailsStyles.css";
import picture from "/src/assets/robert-bye-tG36rvCeqng-unsplash.jpg"
import { Button } from "@mui/base";

import Axios from "axios";
import { fontSize } from "@mui/system";

const apiUrl = import.meta.env.VITE_API_URL;

const AuctionDetails = () => {

    const params = useParams();
  const [auction, setAuction] = useState({});
  const [product, setProduct] = useState({});
  const [productSpecification, setProductSpecification] = useState({})
  const [bids, setBids] = useState([])
  const [error, setError] = useState(null);


  const getAuction = () => {
    Axios.get(`${apiUrl}/api/auction/${params.auctionId}`).then((response) => {

        setProduct(response.data.product);
        setProductSpecification(response.data.product.productSpecification);

        const sortedBids = [...response.data.bids].sort((bidA, bidB) => 
            bidB.bidAmount - bidA.bidAmount
        );

        setBids(sortedBids);
        console.log(bids)
    })
    .catch((error) => {
                setError(error);
                console.log("Halloj error")
              });
          }



useEffect(() => {
    getAuction();
    
  }, []);

  return (
    <>
        <div className="product-specs">
        <div className="left-side" >
        <img className="picture" src={productSpecification.productPhoto} alt="picture not found" />
        <div style={{fontSize:"32px"}}>Name: {product.productName}</div>
        <div style={{width: "745px"}}>{product.productDescription}</div>
        </div>
        <div className="right-side">
        <div className="product-info">
            <div style={{fontSize:"24px"}}>Product specification:</div>
            <div>HorsePower: {productSpecification.enginePower}</div>
            <div>Mileage: {productSpecification.mileage}</div>
            <div>Gear: {productSpecification.gear}</div>
        </div>
        <div className="bids-info" >
            <div style={{fontSize:"24px"}}>Bids:</div>
            {bids.map(bid => (
            <div key={bid.id}>{bid.bidAmount}</div>
           ))}
           <div className="place-bid">
            <input className="input-bid" type="number" />
           <Button className="place-bid-btn" style={{backgroundColor:"#C89090"}}>Place Bid</Button>
           </div>
        </div>
        
        </div>
        </div>
    </>
  );
}

export default AuctionDetails;

  //const [users, setUsers] = useState([]);

//   const auctionInfo = {
//     productName,
//     productGear,
//     price,
//   }

//     fetch(`${apiUrl}/api/auction/1`)
//       .then(response => {
//         return response.json()
//       })
//       .then(data => {
//         setAuction(data)
//       })
//       console.log(auction)
//   }



//   const getAuction = () => { axios.get(`${apiUrl}/api/auction/1`)
//       .then((response) => {
//         const auctionData = response.data;
//         setAuction(auctionData);
        
//       })
//       .catch((error) => {
//         setError(error);
//         console.log("Halloj error")
//       });
//   };

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }



import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AuctionDetailsStyles.css";
import Axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const AuctionDetails = () => {

    const params = useParams();
  const [auction, setAuction] = useState({});
  const [product, setProduct] = useState({});
  const [productSpecification, setProductSpecification] = useState({})
  const [error, setError] = useState(null);


  const getAuction = () => {
    Axios.get(`${apiUrl}/api/auction/${params.auctionId}`).then((response) => {
        
        setProduct(response.data.product);
        setProductSpecification(response.data.product.productSpecification);
    })
}

useEffect(() => {
    getAuction();
  }, []);

  return (
    <>
        <div className="product-specs">
        <img className="picture" src={productSpecification.productPhoto} alt="Picture not found" />
        <div className="product-info">
            <div>Name: {product.productName}</div>
            <div>HorsePower: {productSpecification.enginePower}</div>
            <div>Mileage: {productSpecification.mileage}</div>
            <div>Gear: {productSpecification.gear}</div>
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



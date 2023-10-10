import { useAuctions } from "../../context/Context";
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import Favorite from "../Favourites";

import "./UserPageStyles.css";
import { color } from "style-value-types";

const apiUrl = import.meta.env.VITE_API_URL;

const UserPage = () => {
  const [favourites, setFavourites] = useState([]);
  const [user, setUser] = useState("");
  //const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  const { favorites, setFavorites } = useAuctions();

  const [update, setUpdate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    companyName: "",
    orgNumber: "",
    customerType: "Private",
  });

  const onInputChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser.id);
          // fetchFavourites(user)
    };   
  }, []);

  // const fetchFavourites = async (id) => {
  //   const response = await axios.get(`${apiUrl}/api/auth/favorite/${id}`)
  //       setFavourites(response.data); 
  //       console.log("new favourites" + favourites)   
  //   }

  const fetchReviews = async () => {
    const response = await axios.get(`${apiUrl}/api/getAllReviews`)
        setReviews(response.data); 
        // console.log(reviews)   
    }

  //console.log(favourites);

  useEffect(() => {
    fetchReviews();
    // console.log(user)
    // fetchFavourites(user.id);
  }, []);

  return (
    <>
      <div className="flex-container">
        <div className="user-left">
    <form onSubmit={(e) => onSubmit(e)}>
      {/* <div className="pt-28 h-[calc(100vh-theme(spacing.24))] bg-[#EFECEC] lg:pt-5"> */}
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8">
          <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Update</h1>

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="firstName"
              placeholder="First Name *"
              // value={firstName}
              onChange={(e) => onInputChange(e)}
              
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="lastName"
              placeholder="Last Name *"
              // value={lastName}
              onChange={(e) => onInputChange(e)}
              
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="email"
              placeholder="Email"
              // value={email}
              onChange={(e) => onInputChange(e)}
              
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="username"
              placeholder="Username *"
              // value={username}
              onChange={(e) => onInputChange(e)}
              
            />

            <input
              type="password"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="password"
              placeholder="Password"
              // value={password}
              onChange={(e) => onInputChange(e)}
              
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="companyName"
              placeholder="Company Name"
              // value={companyName}
              onChange={(e) => onInputChange(e)}
              
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="orgNumber"
              placeholder="Org-nr"
              // value={orgNumber}
              onChange={(e) => onInputChange(e)}
              
            />

            <select
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="customerType"
              // value={customerType}
              onChange={(e) => onInputChange(e)}
              
            >
              {/* <option value="Private">Private</option> */}
              {/* <option value="Company">Company</option> */}
            </select>

            

            <button
              type="submit"
              className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
            >
              Update
            </button>
            {/* {error && <p className="text-red-500 text-lg">{error}</p>}
            {successMessage && <p className="text-green-700 text-lg">{successMessage}</p>} */}
          </div>
        </div>
      {/* </div> */}
    </form>
        </div>
        <div className="user-right">
          <div style={{ fontSize: "40px" }}>Favorites</div>

          <div className="favourites">
      
            <Favorite style={{color:"red", height:"10px"}} />
            {/* {favourites.map((favourite, index) => (
              <div key={favourite.id}>
                <Link>
                  <div className="card" key={index}>
                    {favourite.id}
                  </div>
                </Link>
              </div>
            ))} */}
            
          </div>

          <div style={{ fontSize: "40px" }}>Reviews</div>
          <div className="reviews">
            {reviews.map((review, index) => (
                <li key={index}>{review.comment}</li>
              ))} 
          </div>
        </div>
      </div>
    </>
  );
};


export default UserPage;

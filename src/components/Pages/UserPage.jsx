import { useAuctions } from "../../context/Context";
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import Favorite from "../Favourites";

import "./UserPageStyles.css";

const apiUrl = import.meta.env.VITE_API_URL;

const UserPage = () => {
  const [favourites, setFavourites] = useState([]);
  const [user, setUser] = useState("");
  //const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);
  //const { favorites, setFavorites } = useAuctions();
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser.id);
    };   
  }, []);

  const fetchReviews = async () => {
    const response = await axios.get(`${apiUrl}/api/getAllReviews`)
        setReviews(response.data); 
        console.log(reviews)   
    }

  
  console.log(favourites);
  console.log(reviews);

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <div className="flex-container">
        <div className="user-left">
          <TextField
            id="outlined-basic"
            label="First name"
            variant="outlined"
          />
          <br />
          <TextField id="outlined-basic" label="Last name" variant="outlined" />
          <br />
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <br />
          <TextField id="outlined-basic" label="Username" variant="outlined" />
          <br />
          <Button type="submit" variant="contained">
            Update
          </Button>
          <br />
          <br />

          <TextField id="outlined-basic" label="Bank name" variant="outlined" />
          <br />
          <TextField
            id="outlined-basic"
            label="Bank account nr"
            variant="outlined"
          />
          <br />
          <Button type="submit" variant="contained">
            Update
          </Button>
          <br />
          <br />

          <TextField id="outlined-basic" label="Card type" variant="outlined" />
          <br />
          <TextField id="outlined-basic" label="Card nr" variant="outlined" />
          <br />
          <TextField
            id="outlined-basic"
            label="Expiry date"
            variant="outlined"
          />
          <br />
          <Button type="submit" variant="contained">
            Update
          </Button>
          <br />
          <br />
        </div>
        <div className="user-right">
          <div style={{ fontSize: "40px" }}>Favorites</div>

          <div className="favourites" style={{height:"60px"}}>
            <Favorite />
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

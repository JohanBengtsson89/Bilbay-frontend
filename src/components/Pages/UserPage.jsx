import { useState, useEffect } from "react";
import { Paper, TextField, Button } from "@mui/material";
import axios from "axios";

import "./UserPageStyles.css";

const UserPage = () => {
  const [favourites, setFavourites] = useState([]);
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser.id);
    // if (storedUser) {
    //   setUser(storedUser.id);
    // }

    axios
      .get(`http://localhost:8082/api/auth/favorite/9`)
      .then((response) => {
        // setFavourites(response.data);
        console.log(response.data.favorites);
      })
      .catch((error) => {
        setError(error);
        console.log("Halloj error" + error);
      });
  };

  console.log(user);

  // Tillfällig array för favourites
  // const favourites = [
  //     {id: 1, name: "car1"},
  //     {id: 2, name: "car2"},
  //     {id: 3, name: "car3"}
  //     ];

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

          <div className="favourites">
            {favourites.map((favourite) => (
              <div key={favourite.id}>
                <div className="card">{favourite}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: "40px" }}>Reviews</div>
          <div className="reviews">Content</div>
        </div>
      </div>
    </>
  );
};

export default UserPage;

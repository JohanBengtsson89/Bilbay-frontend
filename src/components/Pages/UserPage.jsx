import { useAuctions } from "../../context/Context";
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import Favorite from "../Favourites";
import "./UserPageStyles.css";

const apiUrl = import.meta.env.VITE_API_URL;

const UserPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState([]);

  const [update, setUpdate] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    password: "",
    email: "",
    username: "",
    organizationNumber: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser.id);
    }
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/test/user/${user}`);
        const userInfo = response.data;
        setUpdate(userInfo);
        console.log(userInfo);
      } catch (error) {
        console.error("Error fetching user information:", error.message);
        setError("Failed to fetch user information.");
      }
    };

    if (user) {
      getUserInfo();
    }
  }, [user]);

  const onInputChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const res = await axios.put(`${apiUrl}/api/auth/users/${user}`, update);
      console.log(res);
      setSuccessMessage("User information updated successfully!");
    } catch (error) {
      console.error("Error from react:", error.message);
      setError("User information update failed. Please try again.");
    }
  };

  const fetchReviews = async () => {
    const response = await axios.get(`${apiUrl}/api/getAllReviews`);
    setReviews(response.data);
  };


  useEffect(() => {
    fetchReviews();
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
                  placeholder={update.firstName || "Firstname"}
                  value={update.firstName}
                  onChange={(e) => onInputChange(e)}
                />

                <input
                  type="text"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="lastName"
                  placeholder={update.lastName || "Lastname"}
                  value={update.lastName}
                  onChange={(e) => onInputChange(e)}
                />

                <input
                  type="text"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="email"
                  placeholder={update.email || "Email"}
                  value={update.email}
                  onChange={(e) => onInputChange(e)}
                />

                <input
                  type="text"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="username"
                  placeholder={update.username || "Username"}
                  value={update.username}
                  onChange={(e) => onInputChange(e)}
                />

                <input
                  type="password"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="password"
                  placeholder="**********"
                  value={update.password}
                  onChange={(e) => onInputChange(e)}
                  disabled
                />

                <input
                  type="text"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="companyName"
                  placeholder={update.companyName || "Company name"}
                  value={update.companyName}
                  onChange={(e) => onInputChange(e)}
                />

                <input
                  type="text"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="organizationNumber"
                  placeholder={update.organizationNumber || "Organization nr"}
                  value={update.organizationNumber}
                  onChange={(e) => onInputChange(e)}
                />

                <button
                  type="submit"
                  className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
                >
                  Update
                </button>
                {error && <p className="text-red-500 text-lg">{error}</p>}
                {successMessage && (
                  <p className="text-green-700 text-lg">{successMessage}</p>
                )}
              </div>
            </div>
            {/* </div> */}
          </form>
        </div>
        <div className="user-right">
          <div style={{ fontSize: "40px" }}>Favorites</div>

          <div className="favourites">
            <Favorite style={{ color: "red", height: "10px" }} />
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
              <li className="review-list" key={index}>{review.comment}</li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;

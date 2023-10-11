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
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [isCardFormExpanded, setIsCardFormExpanded] = useState(false);
  const [isBankFormExpanded, setIsBankFormExpanded] = useState(false);
  const [isAddressFormExpanded, setIsAddressFormExpanded] = useState(false);

  const [updateUser, setUpdate] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    password: "",
    email: "",
    username: "",
    organizationNumber: "",
  });

  const [cardPayment, setCardPayment] = useState({
    cardType: "",
    cardNumber: "",
    expireDate: "",
    cvv: "",
  });

  const [bankPayment, setBankPayment] = useState({
    bankName: "",
    bankAccountNr: "",
  });

  const [address, setAddress] = useState({
    address: "",
    postalCode: "",
    telephone: "",
    city: "",
    country: "",
  });

  const onAddressInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const onCardInputChange = (e) => {
    setCardPayment({ ...cardPayment, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setUpdate({ ...updateUser, [e.target.name]: e.target.value });
  };

  const onBankInputChange = (e) => {
    setBankPayment({ ...bankPayment, [e.target.name]: e.target.value });
  };

  const toggleCardFormExpansion = () => {
    setIsCardFormExpanded((prev) => !prev);
    setIsFormExpanded(false);
    setIsBankFormExpanded(false);
  };

  const toggleFormExpansion = () => {
    setIsFormExpanded((prev) => !prev);
    setIsCardFormExpanded(false);
    setIsBankFormExpanded(false);
  };

  const toggleBankFormExpansion = () => {
    setIsBankFormExpanded((prev) => !prev);
    setIsCardFormExpanded(false); // Collapse the card form
    setIsFormExpanded(false); // Collapse the other form
  };

  const toggleAddressFormExpansion = () => {
    setAddress({
      address: "",
      postalCode: "",
      telephone: "",
      city: "",
      country: "",
    });
    setIsAddressFormExpanded((prev) => !prev);
    setIsFormExpanded(false);
    setIsCardFormExpanded(false);
    setIsBankFormExpanded(false);
  };

  const onSubmitBankPayment = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const res = await axios.post(`${apiUrl}/api/bankpayment`, {
        user: { id: user },
        ...bankPayment,
      });

      console.log(res);
      setSuccessMessage("Bank payment information added successfully!");
    } catch (error) {
      console.error("Error from react:", error.message);
      setError("Failed to add bank payment information. Please try again.");
    }
  };

  const onSubmitCardPayment = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const res = await axios.post(`${apiUrl}/api/cardpayment`, {
        user: { id: user },
        ...cardPayment,
      });

      console.log(res);
      setSuccessMessage("Card payment information added successfully!");
    } catch (error) {
      console.error("Error from react:", error.message);
      setError("Failed to add card payment information. Please try again.");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const res = await axios.put(
        `${apiUrl}/api/auth/users/${user}`,
        updateUser
      );
      console.log(res);
      setSuccessMessage("User information updated successfully!");
    } catch (error) {
      console.error("Error from react:", error.message);
      setError("User information updateUser failed. Please try again.");
    }
  };

  const onSubmitAddress = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const res = await axios.post(`${apiUrl}/api/address`, {
        user: { id: user },
        ...address,
      });

      console.log(res);
      setSuccessMessage("Address information added successfully!");
    } catch (error) {
      console.error("Error from react:", error.message);
      setError("Failed to add address information. Please try again.");
    }
  };

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
        <div className={`user-left `}>
          {/* Update user detailes */}
          <div
            className={`form-toggle ${isFormExpanded ? "expanded" : ""}`}
            onClick={toggleFormExpansion}
            style={{
              cursor: "pointer",
              padding: "10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
              backgroundColor: "#506081",
              color: "white",
            }}
          >
            Update user details{isFormExpanded}
            </div>
            <form
              style={{ display: isFormExpanded ? "block" : "none" }}
              onSubmit={(e) => onSubmit(e)}
            > 
              {/* <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8"> */}
                <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
                  <h1 className="mb-8 text-3xl text-center">Update</h1>

                  <input
                    type="text"
                    className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                    name="firstName"
                    placeholder={updateUser.firstName || "Firstname"}
                    value={updateUser.firstName}
                    onChange={(e) => onInputChange(e)}
                  />

                  <input
                    type="text"
                    className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                    name="lastName"
                    placeholder={updateUser.lastName || "Lastname"}
                    value={updateUser.lastName}
                    onChange={(e) => onInputChange(e)}
                  />

                  <input
                    type="text"
                    className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                    name="email"
                    placeholder={updateUser.email || "Email"}
                    value={updateUser.email}
                    onChange={(e) => onInputChange(e)}
                  />

                  <input
                    type="text"
                    className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                    name="username"
                    placeholder={updateUser.username || "Username"}
                    value={updateUser.username}
                    onChange={(e) => onInputChange(e)}
                  />

                  <input
                    type="password"
                    className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                    name="password"
                    placeholder="**********"
                    value={updateUser.password}
                    onChange={(e) => onInputChange(e)}
                    disabled
                  />

                  <input
                    type="text"
                    className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                    name="companyName"
                    placeholder={updateUser.companyName || "Company name"}
                    value={updateUser.companyName}
                    onChange={(e) => onInputChange(e)}
                  />

                  <input
                    type="text"
                    className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                    name="organizationNumber"
                    placeholder={updateUser.organizationNumber || "Organization nr"}
                    value={updateUser.organizationNumber}
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
              {/* </div> */}
            </form>
          

          {/* addCardPayment form */}
        <div
            className={`form-toggle ${isCardFormExpanded ? "expanded" : ""}`}
            onClick={toggleCardFormExpansion}
            style={{
              padding: '10px',
              backgroundColor: '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '10px',
              cursor: 'pointer',
              backgroundColor:'#506081',
              color:"white"
            }}
          >
            Add debit or credit card {isCardFormExpanded}
          </div>
          <form
            style={{ display: isFormExpanded ? "block" : "none" }}
            onSubmit={(e) => onSubmit(e)}
          >
            {/* <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8"> */}
            <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Update</h1>

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="firstName"
                placeholder={updateUser.firstName || "Firstname"}
                value={updateUser.firstName}
                onChange={(e) => onInputChange(e)}
              />

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="lastName"
                placeholder={updateUser.lastName || "Lastname"}
                value={updateUser.lastName}
                onChange={(e) => onInputChange(e)}
              />

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="email"
                placeholder={updateUser.email || "Email"}
                value={updateUser.email}
                onChange={(e) => onInputChange(e)}
              />

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="username"
                placeholder={updateUser.username || "Username"}
                value={updateUser.username}
                onChange={(e) => onInputChange(e)}
              />

              <input
                type="password"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="password"
                placeholder="**********"
                value={updateUser.password}
                onChange={(e) => onInputChange(e)}
                disabled
              />

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="companyName"
                placeholder={updateUser.companyName || "Company name"}
                value={updateUser.companyName}
                onChange={(e) => onInputChange(e)}
              />

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="organizationNumber"
                placeholder={updateUser.organizationNumber || "Organization nr"}
                value={updateUser.organizationNumber}
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
            {/* </div> */}
          </form>

          {/* addCardPayment form */}
          <div
            className={`form-toggle ${isCardFormExpanded ? "expanded" : ""}`}
            onClick={toggleCardFormExpansion}
            style={{
              padding: "10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
              cursor: "pointer",
              backgroundColor: "#506081",
              color: "white",
            }}
          >
            Add debit or credit card {isCardFormExpanded}
          </div>
          {isCardFormExpanded && (
            <form onSubmit={(e) => onSubmitCardPayment(e)}>
              <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Add Card Payment</h1>

                <input
                  type="text"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="cardType"
                  placeholder="Card Type"
                  value={cardPayment.cardType}
                  onChange={(e) => onCardInputChange(e)}
                />

                <input
                  type="number"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={cardPayment.cardNumber}
                  onChange={(e) => onCardInputChange(e)}
                />

                <input
                  type="date"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="expireDate"
                  placeholder="Expiration Date"
                  value={cardPayment.expireDate}
                  onChange={(e) => onCardInputChange(e)}
                />

                <input
                  type="number"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="cvv"
                  placeholder="CVV"
                  value={cardPayment.cvv}
                  onChange={(e) => onCardInputChange(e)}
                />

                <button
                  type="submit"
                  className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
                >
                  Add Card Payment
                </button>
                {error && <p className="text-red-500 text-lg">{error}</p>}
                {successMessage && (
                  <p className="text-green-700 text-lg">{successMessage}</p>
                )}
              </div>
            </form>
          )}

          {/* "Add bank payment form" */}
          <div
            className={`form-toggle ${isBankFormExpanded ? "expanded" : ""}`}
            onClick={toggleBankFormExpansion}
            style={{
              padding: "10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
              cursor: "pointer",
              backgroundColor: "#506081",
              color: "white",
            }}
          >
            Add bank account{isBankFormExpanded}
          </div>
          {isBankFormExpanded && (
            <form onSubmit={(e) => onSubmitBankPayment(e)}>
              <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Add Bank Payment</h1>

                <input
                  type="text"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="bankName"
                  placeholder="Bank Name"
                  value={bankPayment.bankName}
                  onChange={(e) => onBankInputChange(e)}
                />

                <input
                  type="text"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="bankAccountNr"
                  placeholder="Bank Account Number"
                  value={bankPayment.bankAccountNr}
                  onChange={(e) => onBankInputChange(e)}
                />

                <button
                  type="submit"
                  className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
                >
                  Add Bank Payment
                </button>
                {error && <p className="text-red-500 text-lg">{error}</p>}
                {successMessage && (
                  <p className="text-green-700 text-lg">{successMessage}</p>
                )}
              </div>
            </form>
          )}
          <div
            className={`form-toggle ${isAddressFormExpanded ? "expanded" : ""}`}
            onClick={toggleAddressFormExpansion}
            style={{
              padding: "10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
              cursor: "pointer",
              backgroundColor: "#506081",
              color: "white",
            }}
          >
            Add Address {isAddressFormExpanded}
          </div>
          {isAddressFormExpanded && (
            <form onSubmit={(e) => onSubmitAddress(e)}>
              <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Add Address</h1>

                <input
                  type="text"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="address"
                  placeholder="Address"
                  value={address.address}
                  onChange={(e) => onAddressInputChange(e)}
                />

                <input
                  type="text"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={address.postalCode}
                  onChange={(e) => onAddressInputChange(e)}
                />

                <input
                  type="tel"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="telephone"
                  placeholder="Telephone"
                  value={address.telephone}
                  onChange={(e) => onAddressInputChange(e)}
                />

                <input
                  type="text"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="city"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => onAddressInputChange(e)}
                />

                <input
                  type="text"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="country"
                  placeholder="Country"
                  value={address.country}
                  onChange={(e) => onAddressInputChange(e)}
                />

                <button
                  type="submit"
                  className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
                >
                  Add Address
                </button>
                {error && <p className="text-red-500 text-lg">{error}</p>}
                {successMessage && (
                  <p className="text-green-700 text-lg">{successMessage}</p>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Favorite and Review */}
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
              <li className="review-list" key={index}>
                {review.comment}
              </li>
              <li className="review-list" key={index}>{review.comment}</li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;

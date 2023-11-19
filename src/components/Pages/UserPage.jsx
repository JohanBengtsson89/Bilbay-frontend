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
  const [roles, setRoles] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isFormExpanded, setIsFormExpanded] = useState(true);
  const [isCardFormExpanded, setIsCardFormExpanded] = useState(false);
  const [isBankFormExpanded, setIsBankFormExpanded] = useState(false);
  const [isAddressFormExpanded, setIsAddressFormExpanded] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const buttonStyle = {
    width: "100%",
    textAlign: "center",
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: isButtonHovered ? "#E57C7C" : "#c89090",
    color: "black",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    marginTop: "1rem",
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setRoles(storedUser.roles);
      console.log(storedUser.roles);
    }
  }, []);

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
  const cardTypes = ["Mastercard", "Visa card"];

  const [bankPayment, setBankPayment] = useState({
    bankName: "",
    bankAccountNr: "",
  });
  const bankNames = [
    "Swedbank",
    "Nordea",
    "Handelsbanken",
    "Ica banken",
    "SEB",
    "Skandia",
    "SBAB",
  ];

  const [address, setAddress] = useState({
    address: "",
    postalCode: "",
    telephone: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    setSuccessMessage("");
    setError("");
  }, [
    isFormExpanded,
    isCardFormExpanded,
    isBankFormExpanded,
    isAddressFormExpanded,
  ]);

  const onCardInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardType" && !cardTypes.includes(value)) {
      console.error("Invalid card type");
      return;
    }

    setCardPayment({ ...cardPayment, [name]: value });
  };

  const onInputChange = (e) => {
    setUpdate({ ...updateUser, [e.target.name]: e.target.value });
  };

  const onBankInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "bankName" && !bankNames.includes(value)) {
      console.error("Invalid bank name");
      return;
    }

    setBankPayment({ ...bankPayment, [name]: value });
  };

  const onAddressInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const toggleCardFormExpansion = () => {
    setIsCardFormExpanded((prev) => !prev);
    setIsFormExpanded(false);
    setIsBankFormExpanded(false);
    setIsAddressFormExpanded(false);
  };

  const toggleFormExpansion = () => {
    setIsFormExpanded((prev) => !prev);
    setIsCardFormExpanded(false);
    setIsBankFormExpanded(false);
    setIsAddressFormExpanded(false);
  };

  const toggleBankFormExpansion = () => {
    setIsBankFormExpanded((prev) => !prev);
    setIsCardFormExpanded(false);
    setIsFormExpanded(false);
    setIsAddressFormExpanded(false);
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
      const res = await axios.post(`${apiUrl}/api/bankpayment` ,{
        user: { id: user },
        ...bankPayment,
      }, { withCredentials: true });

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
      const res = await axios.post(`${apiUrl}/api/cardpayment`,{
        user: { id: user },
        ...cardPayment,
      }, { withCredentials: true });

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
        updateUser, { withCredentials: true }
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
      const res = await axios.post(`${apiUrl}/api/auth/address`,{ withCredentials: true }, {
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
        const response = await axios.get(`${apiUrl}/api/test/user/${user}`, { withCredentials: true });
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
    const response = await axios.get(`${apiUrl}/api/auth/getAllReviews`, { withCredentials: true });
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
            className="form-toggle"
            onClick={toggleFormExpansion}
            style={{
              cursor: "pointer",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
              backgroundColor: isFormExpanded ? "#A3B8CB" : "#506081",
              color: isFormExpanded ? "#000" : "white",
            }}
          >
            Update user details
          </div>
          <form
            style={{ display: isFormExpanded ? "block" : "none" }}
            onSubmit={(e) => onSubmit(e)}
          >
            <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8">
              <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
                <h1 className="mb-8 text-xl text-center">User details</h1>

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
                  style={{
                    display: roles.includes("ROLE_COMPANY") ? "block" : "none",
                  }}
                />

                <input
                  type="text"
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="organizationNumber"
                  placeholder={
                    updateUser.organizationNumber || "Organization nr"
                  }
                  value={updateUser.organizationNumber}
                  onChange={(e) => onInputChange(e)}
                  style={{
                    display: roles.includes("ROLE_COMPANY") ? "block" : "none",
                  }}
                />

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
                  style={buttonStyle}
                  onMouseOver={() => setIsButtonHovered(true)}
                  onMouseOut={() => setIsButtonHovered(false)}
                >
                  Update
                </button>
                {error && <p className="text-red-500 text-lg">{error}</p>}
                {successMessage && (
                  <p className="text-green-700 text-lg">{successMessage}</p>
                )}
              </div>
            </div>
          </form>

          {/* addCardPayment form */}
          <div
            className="form-toggle"
            onClick={toggleCardFormExpansion}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
              cursor: "pointer",
              backgroundColor: isCardFormExpanded ? "#A3B8CB" : "#506081",
              color: isCardFormExpanded ? "#000" : "white",
            }}
          >
            Add debit or credit card
          </div>
          {isCardFormExpanded && (
            <form onSubmit={(e) => onSubmitCardPayment(e)}>
              <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
                <h1 className="mb-8 text-xl text-center">Card Payment</h1>

                <select
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="cardType"
                  value={cardPayment.cardType}
                  onChange={(e) => onCardInputChange(e)}
                >
                  <option value="">Select Card Type</option>
                  {cardTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

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
                  className="w-full text-center py-3 rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
                  style={buttonStyle}
                  onMouseOver={() => setIsButtonHovered(true)}
                  onMouseOut={() => setIsButtonHovered(false)}
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
            className="form-toggle"
            onClick={toggleBankFormExpansion}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
              cursor: "pointer",
              backgroundColor: isBankFormExpanded ? "#A3B8CB" : "#506081",
              color: isBankFormExpanded ? "#000" : "white",
            }}
          >
            Add bank account
          </div>

          {/* bankPayment form */}
          {isBankFormExpanded && (
            <form onSubmit={(e) => onSubmitBankPayment(e)}>
              <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
                <h1 className="mb-8 text-xl text-center">Bank Payment</h1>

                <select
                  className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                  name="bankName"
                  value={bankPayment.bankName}
                  onChange={(e) => onBankInputChange(e)}
                >
                  <option value="">Select Bank Name</option>
                  {bankNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>

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
                  className="w-full text-center py-3 rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
                  style={buttonStyle}
                  onMouseOver={() => setIsButtonHovered(true)}
                  onMouseOut={() => setIsButtonHovered(false)}
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
          {/* Add address  */}
          <div
            className="form-toggle"
            onClick={toggleAddressFormExpansion}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
              cursor: "pointer",
              backgroundColor: isAddressFormExpanded ? "#A3B8CB" : "#506081",
              color: isAddressFormExpanded ? "#000" : "white",
            }}
          >
            Add Address
          </div>
          {isAddressFormExpanded && (
            <form onSubmit={(e) => onSubmitAddress(e)}>
              <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
                <h1 className="mb-8 text-xl text-center">Address</h1>

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
                  className="w-full text-center py-3 rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
                  style={buttonStyle}
                  onMouseOver={() => setIsButtonHovered(true)}
                  onMouseOut={() => setIsButtonHovered(false)}
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
          <div style={{ fontSize: "30px" }}>Favorites</div>

          <div className="favourites">
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

          <div style={{ fontSize: "30px" }}>Reviews</div>
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

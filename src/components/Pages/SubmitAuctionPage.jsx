import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import successfull from "../../assets/successfull.png";

const apiUrl = import.meta.env.VITE_API_URL;

export default function SubmitAuctionPage() {
  const [showAuctionForm, setShowAuctionForm] = useState(false);
  const [showCreateAuctionButton, setShowCreateAuctionButton] = useState(true);
  const [productSuccessMessage, setProductSuccessMessage] = useState("");
  const [auctionSuccessMessage, setAuctionSuccessMessage] = useState("");
  const [productErrorMessage, setProductErrorMessage] = useState("");
  const [auctionErrorMessage, setAuctionErrorMessage] = useState("");
  const [priceErrorMessage, setPriceErrorMessage] = useState("");
  const [user, setUser] = useState({});
  const [product, setProduct] = useState({});
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
      setUser(storedUser.id);
    }
  }, []);

  let navigate = useNavigate();

  const [productDetails, setProductDetails] = useState({
    user: {
      id: user.id,
    },
    category: "",
    productSpecification: {
      productPhoto: "",
      modelYear: "",
      gear: "",
      enginePower: "",
      mileage: 0,
      color: "",
      vinNr: "",
    },

    productName: "",
    productDescription: "",
    originalPrice: 0,
    isAvailable: true,
  });

  const [productAuction, setProductAuction] = useState({
    user: {
      id: user,
    },
    product: {
      id: product,
    },
    reservePrice: "",
    startPrice: "",
    startTime: "",
    endTime: "",
    active: true,
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("productSpecification.")) {
      setProductDetails({
        ...productDetails,
        productSpecification: {
          ...productDetails.productSpecification,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setProductDetails({ ...productDetails, [name]: value });
    }
  };

  const auctionInputChange = (e) => {
    const { name, value } = e.target;
    setProductAuction({ ...productAuction, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    productDetails.user = { id: user };
    try {
      const response = await axios.post(
        `${apiUrl}/api/product`,
        productDetails
      );
      const createdProduct = response.data.id;

      setProduct((prevProduct) => ({
        ...prevProduct,
        id: createdProduct,
      }));

      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      setProductAuction((prevAuction) => ({
        ...prevAuction,
        user: { id: user },
        product: {
          id: createdProduct,
        },
        startTime: formattedDate,
      }));
      setProductSuccessMessage("Product submitted successfully!");
      setProductErrorMessage("");
      setShowAuctionForm(true);
    } catch (error) {
      console.error(error.response);
      setProductErrorMessage("Error submitting product");
    }
  };

  const auctionSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        parseFloat(productAuction.startPrice) >=
        parseFloat(productAuction.reservePrice || 0)
      ) {
        setPriceErrorMessage("Reserved Price must be higher than Start Price");
        return;
      }
      await axios.post(`${apiUrl}/api/post-auction`, {
        ...productAuction,
      });
      // navigate("/auctions");
      setAuctionSuccessMessage("Auction created successfully!");
      setAuctionErrorMessage("");
      setPriceErrorMessage("");
      setShowCreateAuctionButton(false);
    } catch (error) {
      console.error(error.response);
      setAuctionErrorMessage("Error submitting auction");
      setPriceErrorMessage("Reserved Price must be higher than Start Price");
    }
  };

  return (
    <div className="grid grid-cols-2 pt-10  lg:pt-5 lg:grid-cols-1">
      <form onSubmit={(e) => onSubmit(e)} className="md:mb-5 lg:mx-auto">
        <div>
          <div className="container max-w-lg mx-24 lg:px-8 lg:mx-0">
            <div className="bg-[#BFC3CC] px-6 py-8 rounded-xl shadow-md text-black">
              <h1 className="mb-8 text-3xl text-center">Product details</h1>

              <input
                type="url"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="productSpecification.productPhoto"
                placeholder="Car Image *"
                value={productDetails.productSpecification.productPhoto}
                onChange={(e) => onInputChange(e)}
                required
              />

              <select
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="category"
                value={productDetails.category}
                onChange={(e) => onInputChange(e)}
                required
              >
                <option value="">Category *</option>
                <option value="American">American</option>
                <option value="German">German</option>
                <option value="Italian">Italian</option>
                <option value="Swedish">Swedish</option>
                <option value="English">English</option>
              </select>
              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="productName"
                placeholder="Product name *"
                value={productDetails.productName}
                onChange={(e) => onInputChange(e)}
                required
              />

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="productSpecification.modelYear"
                placeholder="Model year *"
                value={productDetails.productSpecification.modelYear}
                onChange={(e) => onInputChange(e)}
                required
              />

              <select
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="productSpecification.gear"
                value={productDetails.productSpecification.gear}
                onChange={(e) => onInputChange(e)}
                required
              >
                <option value="">Gear *</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>

              <input
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                type="text"
                name="productSpecification.enginePower"
                value={productDetails.productSpecification.enginePower}
                onChange={(e) => onInputChange(e)}
                placeholder="Engine power *"
                required
              />

              <div className="mb-4">
                <label htmlFor="mileage" className="block mb-2">
                  Mileage
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="block border-2 border-[#575757] w-1/2 p-1 rounded-lg mr-2"
                    name="productSpecification.mileage"
                    placeholder="Mileage"
                    value={productDetails.productSpecification.mileage}
                    onChange={(e) => onInputChange(e)}
                    step="1"
                    required
                  />
                  <input
                    type="range"
                    className="block w-1/2"
                    name="productSpecification.mileage"
                    min="0"
                    max="10000"
                    step="0"
                    value={productDetails.productSpecification.mileage}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="productSpecification.color"
                placeholder="Color * "
                value={productDetails.productSpecification.color}
                onChange={(e) => onInputChange(e)}
                required
              />

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="productSpecification.vinNr"
                placeholder="VIN number * "
                value={productDetails.productSpecification.vinNr}
                onChange={(e) => onInputChange(e)}
                required
              />
              <div className="mb-4">
                <label htmlFor="originalPrice" className="block mb-2">
                  Original Price $
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="block border-2 border-[#575757] w-1/2 p-1 rounded-lg mr-2"
                    name="originalPrice"
                    placeholder="Original Price $"
                    value={productDetails.originalPrice}
                    onChange={(e) => onInputChange(e)}
                  />
                  <input
                    type="range"
                    className="block w-1/2"
                    name="originalPrice"
                    max="100000"
                    step="1000"
                    value={productDetails.originalPrice}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="productDescription"
                placeholder="Description *"
                value={productDetails.productDescription}
                onChange={(e) => onInputChange(e)}
                required
                rows="3"
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
                style={buttonStyle}
                onMouseOver={() => setIsButtonHovered(true)}
                onMouseOut={() => setIsButtonHovered(false)}
              >
                Register
              </button>
              {productSuccessMessage && (
                <div className="text-green-700 text-lg">
                  {productSuccessMessage}
                </div>
              )}
              {productErrorMessage && (
                <div className="text-red-500 text-lg">
                  {productErrorMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AUCTION FORM */}
      </form>
      {showAuctionForm && (
        <form onSubmit={(e) => auctionSubmit(e)}>
          <div className="w-[75%] h-full bg-[#BFC3CC]  rounded-xl shadow-md  pt-14 xl:ml-[20%] lg:mx-auto lg:h-screen">
            <div className=" max-w-lg mx-4 lg:px-8 lg:mx-0">
              <img
                src={successfull}
                alt=""
                className="w-96 mb-5 mx-auto rounded-xl"
              ></img>
              <input
                type="number"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                placeholder="start price"
                name="startPrice"
                value={productAuction.startPrice}
                onChange={(e) => auctionInputChange(e)}
                required
              />

              <input
                type="number"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                placeholder="Reserve Price"
                name="reservePrice"
                value={productAuction.reservePrice}
                onChange={(e) => auctionInputChange(e)}
                required
              />

              <p>End time</p>
              <input
                type="date"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                placeholder="End Time"
                name="endTime"
                value={productAuction.endTime}
                onChange={(e) => auctionInputChange(e)}
                required
              />

              <div className="text-center">
                {showCreateAuctionButton && (
                  <button
                    type="submit"
                    className="mx-auto  text-center py-3 rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
                    style={buttonStyle}
                    onMouseOver={() => setIsButtonHovered(true)}
                    onMouseOut={() => setIsButtonHovered(false)}
                  >
                    Create auction
                  </button>
                )}

                {/* <h1 className=""></h1> */}

                {auctionSuccessMessage && (
                  <>
                    <Link to={`/auctions`}>
                      <button className="text-center py-3 border-2 border-[#575757] rounded-lg bg-[green] text-black hover:bg-green-dark focus:outline-none my-1">
                        Go to auctions
                      </button>
                    </Link>
                    <div className="text-green-700 text-lg">
                      {auctionSuccessMessage}
                    </div>
                  </>
                )}
                {auctionErrorMessage && (
                  <div className="text-red-500 text-lg">
                    {auctionErrorMessage}
                  </div>
                )}
                {priceErrorMessage && (
                  <div className="text-red-500 text-lg">
                    {priceErrorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

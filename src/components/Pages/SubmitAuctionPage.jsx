import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuctionsPage from "./AuctionsPage";

const apiUrl = import.meta.env.VITE_API_URL;

export default function SubmitAuctionPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser.id);
      console.log(user); // This will log the updated value of user
    };

    fetchData();
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
      mileAge: "",
      color: "",
      vinNr: "",
    },

    productName: "",
    productDescription: "",
    orginalPrice: "",
    isAvailable: true,
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

  const onSubmit = (e) => {
    e.preventDefault();
    productDetails.user = { id: user };
    axios.post(`${apiUrl}/api/product`, productDetails, user);
    navigate("/");
  };

  return (
    <div className="grid grid-cols-2 pt-10 h-[calc(100vh-theme(spacing.24))] bg-[#EFECEC] lg:pt-5 lg:grid-cols-1">
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <div className="container max-w-lg mx-24 lg:px-8 lg:mx-0">
            <div className="bg-[#BFC3CC] px-6 py-8 rounded-xl shadow-md text-black">
              <h1 className="mb-8 text-3xl text-center">Product details</h1>

              <input
                type="url"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="productSpecification.productPhoto"
                placeholder="Url *"
                value={productDetails.productSpecification.productPhoto}
                onChange={(e) => onInputChange(e)}
                required
              />

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="category"
                placeholder="Category *"
                value={productDetails.category}
                onChange={(e) => onInputChange(e)}
                required
              />
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

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="productSpecification.gear"
                placeholder="Gear *"
                value={productDetails.productSpecification.gear}
                onChange={(e) => onInputChange(e)}
                required
              />

              <input
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                type="text"
                name="productSpecification.enginePower"
                value={productDetails.productSpecification.enginePower}
                onChange={(e) => onInputChange(e)}
                placeholder="Engine power *"
                required
              />
              {errorMessage && (
                <div className="text-red-500">{errorMessage}</div>
              )}

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="productSpecification.mileAge"
                placeholder="Mileage * "
                value={productDetails.productSpecification.mileAge}
                onChange={(e) => onInputChange(e)}
                required
              />

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

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="orginalPrice"
                placeholder="Original price *"
                value={productDetails.orginalPrice}
                onChange={(e) => onInputChange(e)}
                required
              />
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
                className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="xl:pl-40 w-96 h-96 border border-black mx-auto pt-14 ">
        asdadsa
      </div>
    </div>
  );
}

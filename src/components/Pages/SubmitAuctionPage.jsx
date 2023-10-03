import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function SubmitAuctionPage() {
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  const [productDetails, setProductDetails] = useState({
    url: "",
    productName: "",
    category: "",
    modelYear: "",
    gearBox: "",
    enginePower: "",
    mileAge: "",
    color: "",
    vinNumber: "",
    orginalPrice: "",
    description: "",
  });

  const {
    url,
    productName,
    category,
    modelYear,
    gearBox,
    enginePower,
    mileAge,
    color,
    vinNumber,
    orginalPrice,
    description,
  } = productDetails;

  const onInputChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${apiUrl}/api/test/product`, productDetails);
    navigate("/");
  };

  return (
    <div className="grid grid-cols-2 pt-10 h-[calc(100vh-theme(spacing.24))] bg-[#EFECEC] lg:pt-5 lg:grid-cols-1 ">
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <div className="container max-w-lg mx-24 flex-1 flex flex-col items-center justify-center lg:px-8 lg:mx-0">
            <div className="bg-[#BFC3CC] px-6 py-8 rounded-xl shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Product details</h1>

              <input
                type="url"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="url"
                placeholder="Url *"
                value={url}
                onChange={(e) => onInputChange(e)}
                required
              />

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="category"
                placeholder="Category *"
                value={category}
                onChange={(e) => onInputChange(e)}
                required
              />
              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="productName"
                placeholder="Product name *"
                value={productName}
                onChange={(e) => onInputChange(e)}
                required
              />

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="modelYear"
                placeholder="Model year *"
                value={modelYear}
                onChange={(e) => onInputChange(e)}
                required
              />

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="gearBox"
                placeholder="Gear box *"
                value={gearBox}
                onChange={(e) => onInputChange(e)}
                required
              />

              <input
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                type="text"
                name="enginePower"
                value={enginePower}
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
                name="mileAge"
                placeholder="Mileage * "
                value={mileAge}
                onChange={(e) => onInputChange(e)}
                required
              />

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="color"
                placeholder="Color * "
                value={color}
                onChange={(e) => onInputChange(e)}
                required
              />

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="vinNumber"
                placeholder="VIN number * "
                value={vinNumber}
                onChange={(e) => onInputChange(e)}
                required
              />

              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="orginalPrice"
                placeholder="Original price *"
                value={orginalPrice}
                onChange={(e) => onInputChange(e)}
                required
              />
              <input
                type="text"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="description"
                placeholder="Description *"
                value={description}
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
      <div className="xl:pl-40">product card</div>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  let navigate = useNavigate();
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    companyName: "",
    orgNumber: "",
    customerType: "Private",
  });

  const {
    firstName,
    lastName,
    email,
    username,
    password,
    companyName,
    orgNumber,
    customerType,
  } = register;

  const onInputChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/test/adduser", register);
    navigate("/");
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="pt-28 h-[calc(100vh-theme(spacing.24))] bg-[#EFECEC] lg:pt-5">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8">
          <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>

            <input
              type="text"
              className="inline-block border-2 border-[#575757] w-48 p-1 rounded-lg mb-4 mr-10 lg:w-full"
              name="firstName"
              placeholder="First Name *"
              value={firstName}
              onChange={(e) => onInputChange(e)}
              required
            />

            <input
              type="text"
              className="inline-block ml-10 border-2 border-[#575757] w-48 p-1 rounded-lg mb-4 lg:w-full lg:ml-0"
              name="lastName"
              placeholder="Last Name *"
              value={lastName}
              onChange={(e) => onInputChange(e)}
              required
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => onInputChange(e)}
              required
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="username"
              placeholder="Username *"
              value={username}
              onChange={(e) => onInputChange(e)}
              required
            />

            <input
              type="password"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => onInputChange(e)}
              required
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="companyName"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => onInputChange(e)}
              required
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="orgNumber"
              placeholder="Org-nr"
              value={orgNumber}
              onChange={(e) => onInputChange(e)}
              required
            />

            <select
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="customerType"
              value={customerType}
              onChange={(e) => onInputChange(e)}
              required
            >
              <option value="Private">Private</option>
              <option value="Company">Company</option>
            </select>

            <div className="text-[#434343] inset-x-16">
              Already have an account?
              <a
                className="no-underline border-b border-blue text-blue"
                href="../login/"
              >
                Sign in
              </a>
              .
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function RegisterPage() {
  let navigate = useNavigate();
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    companyName: "",
    organizationNumber: "",
    roles: ["Private"],
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const {
    firstName,
    lastName,
    email,
    username,
    password,
    companyName,
    organizationNumber,
    roles,
  } = register;

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

  const onInputChange = (e) => {
    const {name, value} = e.target;

    if(name==="roles") {
      setRegister ({...register, roles, roles: [value]});
    }else {
      setRegister({...register, [name]: value});
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccessMessage("");
    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !password
    ) {
      setError("Please fill in all required fields.");
      return;
    }

     try{
      await axios.post(`${apiUrl}/api/auth/signup`, register);
      setSuccessMessage("Registration successful!");
      setTimeout(() => {
        navigate("/loginpage");
      }, 3000);
     }catch(error) {
      console.error("Error from react:", error.message);
      setError("Registration failed. Please try again.");
     }
    
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="pt-28 h-full lg:pt-25">
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
              
            />

            <input
              type="text"
              className="inline-block ml-10 border-2 border-[#575757] w-48 p-1 rounded-lg mb-4 lg:w-full lg:ml-0"
              name="lastName"
              placeholder="Last Name *"
              value={lastName}
              onChange={(e) => onInputChange(e)}
              
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => onInputChange(e)}
              
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="username"
              placeholder="Username *"
              value={username}
              onChange={(e) => onInputChange(e)}
              
            />

            <input
              type="password"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => onInputChange(e)}
              
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="companyName"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => onInputChange(e)}
              
            />

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="organizationNumber"
              placeholder="Org-nr"
              value={organizationNumber}
              onChange={(e) => onInputChange(e)}
              
            />

            <select
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="roles"
              value={roles}
              onChange={(e) => onInputChange(e)}
              
            >
              <option value="private">Private</option>
              <option value="company">Company</option>
            </select>

            <div className="text-[#434343] inset-x-16">
              Already have an account?
              <a
                className="no-underline border-b border-blue text-blue"
                href="loginpage"
              >
                Sign in
              </a>
              .
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-1"
              style={buttonStyle}
              onMouseOver={() => setIsButtonHovered(true)}
              onMouseOut={() => setIsButtonHovered(false)}
            >
              Sign up
            </button>
            {error && <p className="text-red-500 text-lg">{error}</p>}
            {successMessage && <p className="text-green-700 text-lg">{successMessage}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}

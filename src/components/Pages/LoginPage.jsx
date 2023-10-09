import React from "react";
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!username || !password) {
      setError("Fill in your username and password!");
      return;
    }
    try {
      const { data } = await axios.post(`${apiUrl}/api/auth/signin`, {
        username,
        password,
      });

      dispatch({
        type: "LOGIN",
        payload: data,
      });

      window.localStorage.setItem("user", JSON.stringify(data));
      const userId = data.id;
      console.log("User logged in with ID:", userId);
      setSuccessMessage("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log("Error from react:", error.message);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="pt-28 h-[calc(100vh-theme(spacing.24))] bg-[#EFECEC] lg:pt-25">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center lg:px-8">
          <div className="bg-[#BFC3CC] px-6 py-10 rounded-xl shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Login</h1>

            <input
              type="text"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="username"
              placeholder="Username *"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-2 mt-9"
            >
              Login
            </button>
            {error && <p className="text-red-500 text-lg">{error}</p>}
            {successMessage && <p className="text-green-700 text-lg">{successMessage}</p>}

            <div className="text-grey-dark">
              Dont't have any account?
              <a
                className="ml-1 no-underline border-b border-blue text-blue"
                href="register"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;

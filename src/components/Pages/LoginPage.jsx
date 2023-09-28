import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const apiUrl = import.meta.env.VITE_API_URL;

function LoginPage() {

  let navigate = useNavigate();
 
  
  const { login } = useAuth();
  const [loginData, setLoginData] = useState({username: "", password: ""});
  const {username, password} = login;

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const axiosInstance = axios.create({withCredentials:true});
      const response = await axiosInstance.post(`${apiUrl}/api/auth/signin`, loginData);
      console.log('Response Data:', response.data); //for test

      if (response.status === 200) {
        login();
        navigate("/");
        console.log(response.data.email , " = You are now logged in.")
      }
      else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

    return (
      <form>
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
                onChange={handleChange}
              />
  
              <input
                type="password"
                className="block border-2 border-[#575757] w-full p-1 rounded-lg mb-4"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
  
              
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full text-center py-3 border-2 border-[#575757] rounded-lg bg-[#C89090] text-black hover:bg-green-dark focus:outline-none my-2 mt-9">
                Login
              </button>

              <div className="text-grey-dark">
                Dont't have any account?
                <a
                  className="ml-1 no-underline border-b border-blue text-blue" href="../Signup/">
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
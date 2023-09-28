import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
const apiUrl = import.meta.env.VITE_API_URL;


const HomePage = () => {

  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    
    const checkLoginStatus = async () => {
      try {
        const axiosInstance = axios.create({withCredentials:true});
        const response = await axiosInstance.get(`${apiUrl}/api/auth/check-login`);
        console.log(response);

        if (response.status !== 200) {
          logout();
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    checkLoginStatus();
    console.log('isLoggedIn:', isLoggedIn);
  }, [logout]);

  return (
    <div>
    {isLoggedIn ? (
      //authenticated users
      <p>Welcome, you are logged in!</p>
    ) : (
      //non-authenticated users
      <p>You need to log in.</p>
    )}
  </div>
  );
}

export default HomePage;

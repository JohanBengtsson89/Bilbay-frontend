import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { state: { user }, logout } = useContext(AuthContext);
  const navigate = useNavigate();

//retrieve user data from localstorage and use the id
function getUserInfo() {
  try {
    const userInfoJSON = window.localStorage.getItem("user");
    const userInfo = JSON.parse(userInfoJSON);
    return userInfo;
  } catch (error) {
    console.error("Error retrieving user information:", error);
    return null;
  }
};
  
  //Logout function from AuthContext
  const handleLogout = () => {
    logout();
    console.log("You are logged out")
      return navigate("/loginpage");
  };

  return (
    <div>
      Home page
      <br />
      {user ? (
        // Authenticated user
        <div>
          <p>Welcome, You are logged in with ID:  {getUserInfo().id}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="ml-2 no-underline border-b border-blue text-blue"
          >
            Logout
          </button>
        </div>
      ) : (
        // Non-authenticated user
        <p>You need to log in.</p>
      )}
    </div>
  );
};

export default HomePage;

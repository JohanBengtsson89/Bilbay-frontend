import * as React from 'react';
import NavBar from './components/Navbar';
import User from './components/Product'
import UserPage from './components/Pages/UserPage';
import "./index.css";


function App() {

  return (
    <>
    
    <NavBar className="navbar" />
      <UserPage></UserPage>
    {/* <User></User> */}
    </>
  );
} 
export default App;
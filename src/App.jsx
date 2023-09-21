import * as React from 'react';
import NavBar from './components/Navbar';
import HomePage from './components/Pages/HomePage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
  <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>

      </Routes>
  </BrowserRouter>
  );
} 
export default App;
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/Pages/HomePage";
import LoginPage from "./components/Pages/LoginPage";
import Auctions from "./components/Pages/Auctions";
import Favorite from "./components/Favourites";
import AuctionDetailsPage from "./components/Pages/AuctionDetailsPage";
import RegisterPage from "./components/Pages/RegisterPage";
import BidComponent from "./components/BidComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" exact element={<HomePage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/favourite" element={<Favorite/>}/>
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/auction/:auctionId" element={<AuctionDetailsPage />} />
        <Route path="/bid" element={<BidComponent />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;

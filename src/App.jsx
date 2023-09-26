import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/Pages/HomePage";
import Auctions from "./components/Pages/Auctions";
import AuctionDetailsPage from "./components/Pages/AuctionDetailsPage";
import RegisterPage from "./components/Pages/RegisterPage";
import AboutUsPage from "./components/Pages/AboutUsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" exact element={<HomePage />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/auction/:auctionId" element={<AuctionDetailsPage />} />
        <Route path="/about" element={<AboutUsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;

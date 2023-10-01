import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/Pages/HomePage";
import Auctions from "./components/Pages/Auctions";
import AuctionDetailsPage from "./components/Pages/AuctionDetailsPage";
import RegisterPage from "./components/Pages/RegisterPage";
import AuctionsPage from "./components/Pages/AuctionsPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" exact element={<HomePage />} />
        <Route path="/auctions" element={<AuctionsPage/>}/>
        <Route path="/auction/:auctionId" element={<AuctionDetailsPage/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;

import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/Pages/HomePage";
import Auctions from "./components/Pages/Auctions";
import AuctionDetailsPage from "./components/Pages/AuctionDetailsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/auctions" element={<Auctions/>}/>
        <Route path="/auction/:auctionId" element={<AuctionDetailsPage/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;

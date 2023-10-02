import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/Pages/HomePage";
import LoginPage from "./components/Pages/LoginPage";
import Favorite from "./components/Favourites";
import AuctionDetailsPage from "./components/Pages/AuctionDetailsPage";
import RegisterPage from "./components/Pages/RegisterPage";
import AuctionsPage from "./components/Pages/AuctionsPage"
import { AuthProvider } from "./context/AuthContext";
import AboutUsPage from "./components/Pages/AboutUsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" exact element={<HomePage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/favourite" element={<Favorite />} />
          <Route path="/auctions" element={<AuctionsPage />} />
          <Route path="/auction/:auctionId" element={<AuctionDetailsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;

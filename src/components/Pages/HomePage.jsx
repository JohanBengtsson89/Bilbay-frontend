
import { useAuctions } from "../../context/Context";
import { Auctions } from "../Auctions";

const HomePage = () => {
  const { auctions, loading, error } = useAuctions();

  return (
    <Auctions filteredAuctions={auctions}/> 
  )
};

export default HomePage;

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AuctionsPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const [filters, setFilters] = useState({
    modelYear: [],
    gear: [],
    enginePower: [],
    mileage: [],
    color: [],
  });

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/auctions`)
      .then((response) => {
        setAuctions(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [apiUrl]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleFilterChange = (filterType, value) => {
    let parsedCheckedOption = value;
    if (filterType === "modelYear") {
      parsedCheckedOption = parseInt(parsedCheckedOption, 10);
    }
    console.log(parsedCheckedOption);
    setFilters((prevFilters) => {
      // Clone the previous filters object
      const updatedFilters = { ...prevFilters };

      // Check if the option is already in the filter array
      const optionIndex =
        updatedFilters[filterType].indexOf(parsedCheckedOption);

      if (optionIndex === -1) {
        // If not found, add it to the filter array
        updatedFilters[filterType] = [
          ...updatedFilters[filterType],
          parsedCheckedOption,
        ];
      } else {
        // If found, remove it from the filter array
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (selectedOption) => selectedOption !== parsedCheckedOption
        );
      }

      return updatedFilters;
    });
  };

  const filterAuctions = () => {
    return auctions.filter((auction) => {
      if (
        filters.modelYear?.length === 0 &&
        filters.gear?.length === 0 &&
        filters.enginePower?.length === 0 &&
        filters.mileage?.length === 0 &&
        filters.color?.length === 0
      ) {
        return auctions; // Return all auctions
      }
      // Check if the auction matches all selected filter criteria
      return (
        filters.modelYear.includes(
          auction.product.productSpecification.modelYear
        ) ||
        (filters.gear.includes(auction.product.productSpecification.gear) &&
          filters.enginePower.includes(
            auction.product.productSpecification.enginePower
          )) ||
        filters.mileage.includes(
          auction.product.productSpecification.mileage
        ) ||
        filters.color.includes(auction.product.productSpecification.color)
      );
    });
  };

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const filteredAuctions = filterAuctions();

  return (
    <>
      <div className="auctionsContainer">
        <div>
          <div className="dropdown">
            <button
              className="dropdown-trigger"
              id="filterButton"
              onClick={toggleDropdown}
            >
              Model Year
            </button>
            <div className={`dropdown-content ${isOpen ? "open" : "closed"}`}>
              <ul>
                {Array.from(
                  new Set(
                    auctions.map(
                      (auction) =>
                        auction.product.productSpecification.modelYear
                    )
                  )
                ).map((year, i) => (
                  <li key={year}>
                    <input
                      type="checkbox"
                      id={`${i}`}
                      value={year}
                      checked={filters.modelYear.includes(year)}
                      onChange={(e) =>
                        handleFilterChange("modelYear", e.target.value)
                      }
                    />
                    <label htmlFor={`modelYear-${year}`}>{year}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {console.log(filteredAuctions)}
        <Auctions filter={filteredAuctions} />
        {/* <div className="auctionsMain m-0">
          {filteredAuctions.map((auction) => (
            <div
              key={auction.id}
              className="h-96 w-72 content-center"
              style={{
                margin: "15px",
                backgroundColor: "#BFC3CC",
              }}
            >
              <Link to={`/auction/${auction.id}`}>
                <div
                  style={{
                    backgroundImage: `url(${auction.product.productSpecification.productPhoto})`,
                    borderRadius: "10px",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    minHeight: "50%",
                    width: "100%",
                  }}
                ></div>
              </Link>
              <p>User: {auction.user}</p>
              <p>Product: {auction.product.productName}</p>
              <p>
                Model Year: {auction.product.productSpecification.modelYear}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export function Auctions ({filter}) {

  return (
    <div className="auctionsMain m-0">
      {filter.map((auction) => (
        <div
          key={auction.id}
          className="h-96 w-72 content-center"
          style={{
            margin: "15px",
            backgroundColor: "#BFC3CC",
          }}
        >
          <Link to={`/auction/${auction.id}`}>
            <div
              style={{
                backgroundImage: `url(${auction.product.productSpecification.productPhoto})`,
                borderRadius: "10px",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                minHeight: "50%",
                width: "100%",
              }}
            ></div>
          </Link>
          <p>User: {auction.user}</p>
          <p>Product: {auction.product.productName}</p>
          <p>Model Year: {auction.product.productSpecification.modelYear}</p>
        </div>
      ))}
    </div>
  );
};

export default AuctionsPage;

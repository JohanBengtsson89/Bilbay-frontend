import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuctions } from "../../context/Context";
import Auctions from "./Auctions";

const AuctionsPage = () => {
  const { auctions, loading, error } = useAuctions();

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    modelYear: [],
    gear: [],
    enginePower: [],
    mileage: [],
    color: [],
  });
  const handleFilterChange = (filterType, value) => {
    let parsedCheckedOption = value;
    if (filterType === "modelYear") {
      parsedCheckedOption = parseInt(parsedCheckedOption, 10);
    }
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
        <Auctions filteredAuctions={filteredAuctions} />
      </div>
    </>
  );
};

export default AuctionsPage;

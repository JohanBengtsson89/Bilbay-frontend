import { useState, useEffect } from "react";
import { useAuctions } from "../../context/Context";
import Auctions from "../Auctions";

const AuctionsPage = () => {
  const { auctions } = useAuctions();
  const [dropdownStates, setDropdownStates] = useState({
    modelYear: false,
    gear: false,
    enginePower: false,
    mileage: false,
    color: false,
  });

  const toggleDropdown = (dropdownName) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  const [filters, setFilters] = useState({
    modelYear: [],
    gear: [],
    enginePower: [],
    mileage: [],
    color: [],
  });

  const handleFilterChange = (filterType, value) => {
    let parsedCheckedOption = `${value}`;
    if (filterType === "modelYear" || filterType === "mileage") {
      parsedCheckedOption = parseInt(parsedCheckedOption, 10);
    }

    setFilters((prevFilters) => {
      // Clone the previous filters object
      const updatedFilters = { ...prevFilters };

      if (filterType === "modelYear") {
        // If it's modelYear, set it as a new array with the clicked value
        updatedFilters[filterType] = [parsedCheckedOption];
      } else {
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
      }
      // setFilters(updatedFilters)
      return updatedFilters;
    });
  };

  const filterAuctions = () => {
    return auctions.filter((auction) => {
      const modelYearMatch =
        filters.modelYear.length === 0 ||
        filters.modelYear.includes(
          auction.product.productSpecification.modelYear
        );
      const gearMatch =
        filters.gear.length === 0 ||
        filters.gear.includes(auction.product.productSpecification.gear);
      const mileageMatch =
        filters.mileage.length === 0 ||
        filters.mileage.includes(auction.product.productSpecification.mileage);
      const colorMatch =
        filters.color.length === 0 ||
        filters.color.includes(auction.product.productSpecification.color);
      const enginePowerMatch =
        filters.enginePower.length === 0 ||
        filters.enginePower.includes(
          auction.product.productSpecification.enginePower
        );

      // Check if all filter criteria match
      return (
        modelYearMatch &&
        gearMatch &&
        mileageMatch &&
        colorMatch &&
        enginePowerMatch
      );
    });
  };

  const clearFilter = () => {
    return setFilters({
      modelYear: [],
      gear: [],
      enginePower: [],
      mileage: [],
      color: [],
    });
  };

  function FilterDropdown({
    attribute,
    auctions,
    filters,
    handleFilterChange,
    toggleDropdown,
    isOpen,
    singleOption,
  }) {
    // Extract unique values for the specified attribute from auctions
    const attributeValues = Array.from(
      new Set(
        auctions.map(
          (auction) => auction.product.productSpecification[attribute]
        )
      )
    );

    const handleSelectChange = (e) => {
      handleFilterChange(attribute, e.target.value);
      toggleDropdown(); // Close the dropdown after selection
    };

    return (
      <div className="dropdown">
        {attribute !== "modelYear" && (
          <button
            className="dropdown-trigger"
            id="filterButton"
            onClick={toggleDropdown}
          >
            {attribute}
            {/* Customize button label */}
          </button>
        )}
        {singleOption ? (
          <div>
            <select id="model" value="Model Year" onChange={handleSelectChange}>
              <option value="Model Year">Select Model Year</option>
              {attributeValues.map((value, i) => (
                <option key={i} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className={`dropdown-content ${isOpen ? "open" : "closed"}`}>
            <ul>
              {attributeValues.map((value, i) => (
                <div key={value}>
                  <li>
                    <input
                      name={`${value}`}
                      type="checkbox"
                      id={`${value}`}
                      value={value}
                      checked={filters[attribute].includes(value)}
                      onChange={(e) =>
                        handleFilterChange(attribute, e.target.value)
                      }
                    />
                    <label htmlFor={`${value}`}>{value}</label>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  const filteredAuctions = filterAuctions();

  return (
    <>
      <div className="auctionsContainer">
        <div>
          <FilterDropdown
            attribute="modelYear"
            auctions={auctions}
            filters={filters}
            handleFilterChange={handleFilterChange}
            isOpen={dropdownStates.modelYear}
            toggleDropdown={() => toggleDropdown("modelYear")}
            singleOption={true}
          />
          <FilterDropdown
            attribute="gear"
            auctions={auctions}
            filters={filters}
            handleFilterChange={handleFilterChange}
            isOpen={dropdownStates.gear}
            toggleDropdown={() => toggleDropdown("gear")}
            singleOption={false}
          />
          <FilterDropdown
            attribute="enginePower"
            auctions={auctions}
            filters={filters}
            handleFilterChange={handleFilterChange}
            isOpen={dropdownStates.enginePower}
            toggleDropdown={() => toggleDropdown("enginePower")}
            singleOption={false}
          />
          <FilterDropdown
            attribute="mileage"
            auctions={auctions}
            filters={filters}
            handleFilterChange={handleFilterChange}
            isOpen={dropdownStates.mileage}
            toggleDropdown={() => toggleDropdown("mileage")}
            singleOption={false}
          />
          <FilterDropdown
            attribute="color"
            auctions={auctions}
            filters={filters}
            handleFilterChange={handleFilterChange}
            isOpen={dropdownStates.color}
            toggleDropdown={() => toggleDropdown("color")}
            singleOption={false}
          />
          <div>
            <button
              className="dropdown-trigger"
              id="filterButton"
              onClick={clearFilter}
            >
              Clear Filter
            </button>
          </div>
        </div>
        <Auctions filteredAuctions={filteredAuctions} />
      </div>
    </>
  );
};

export default AuctionsPage;

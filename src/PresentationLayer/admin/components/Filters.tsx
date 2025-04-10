import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Filters.css";

type FiltersProps = {
  onFilterChange: (filters: {
    weekdays: string;
    categories: string[];
    priceRange: [number, number];
  }) => void;
};

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [showWeekdays, setShowWeekdays] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [weekdays, setWeekdays] = useState("Any");
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  // Trigger initial filter change with default values
  useEffect(() => {
    onFilterChange({ weekdays, categories, priceRange });
  }, []); // Empty dependency array means this runs once on mount

  const handleCategoryChange = (category: string) => {
    const updatedCategories = categories.includes(category)
      ? categories.filter((c) => c !== category)
      : [...categories, category];
    setCategories(updatedCategories);
    onFilterChange({ weekdays, categories: updatedCategories, priceRange });
  };

  const handlePriceChange = (value: number | number[]) => {
    const range = value as [number, number];
    setPriceRange(range);
    onFilterChange({ weekdays, categories, priceRange: range });
  };

  const handleWeekdayChange = (selectedWeekday: string) => {
    setWeekdays(selectedWeekday);
    onFilterChange({ weekdays: selectedWeekday, categories, priceRange });
  };

  return (
    <div className="filters">
      {/* Weekdays */}
      <div className="filter-section">
        <div
          className="filter-header"
          onClick={() => setShowWeekdays(!showWeekdays)}
        >
          <h3>Weekdays</h3>
          <span className={`arrow ${showWeekdays ? "open" : ""}`}>&#9662;</span>
        </div>
        {showWeekdays && (
          <select
            className="filters-dropdown"
            value={weekdays}
            onChange={(e) => handleWeekdayChange(e.target.value)}
          >
            <option>Any</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>
        )}
      </div>

      {/* Categories */}
      <div className="filter-section">
        <div
          className="filter-header"
          onClick={() => setShowCategory(!showCategory)}
        >
          <h3>Category</h3>
          <span className={`arrow ${showCategory ? "open" : ""}`}>&#9662;</span>
        </div>
        {showCategory && (
          <div className="filters-checkboxes">
            {[
              "Educational & Training Events",
              "Conferences & Seminars",
              "Cultural & Entertainment Events",
              "Sports & Wellness Events",
              "Sports &Wellness Events",
              "Charity Galas",
              "Community Festivals",
            ].map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  checked={categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => setShowPrice(!showPrice)}>
          <h3>Price</h3>
          <span className={`arrow ${showPrice ? "open" : ""}`}>&#9662;</span>
        </div>
        {showPrice && (
          <div className="filters-price-range">
            <Slider
              range
              min={0}
              max={500}
              defaultValue={[0, 500]}
              value={priceRange}
              onChange={handlePriceChange}
              trackStyle={[{ backgroundColor: "#007bff" }]}
              handleStyle={[
                { borderColor: "#007bff" },
                { borderColor: "#007bff" },
              ]}
            />
            <div className="price-values">
              <span>{priceRange[0]} DT</span> - <span>{priceRange[1]} DT</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;

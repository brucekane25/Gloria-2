import React, { useState, useEffect } from "react";

const CategoryDropdown = ({ onCategoryChange, clr }) => {
  const categories = [
    { value: "", label: "All" }, // Representing "All" categories
    { value: "selected", label: "Selected" },
    { value: "births", label: "Births" },
    { value: "deaths", label: "Deaths" },
    { value: "events", label: "Events" },
    { value: "political", label: "Political" },
    { value: "historical", label: "Historical" },
    { value: "scientific", label: "Scientific" },
    { value: "war", label: "War" },
    { value: "economic", label: "Economic" },
    { value: "social", label: "Social" },
    { value: "disasters", label: "Disasters" },
    { value: "religious", label: "Religion" },
    { value: "cultural", label: "Cultural" },
    { value: "environmental", label: "Environmental" },
    { value: "discoveries", label: "Discoveries" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory);
    clr(null)
  };

  return (
    <div>
      <label htmlFor="category-dropdown">Category: </label>
      <select
        id="category-dropdown"
        value={selectedCategory}
        onChange={handleChange}
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = React.memo(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      handleSearch();
    }
  };

  return (
    <div className="mb-5 flex justify-end">
      <div className="relative">
        <input
          type="text"
          name="search"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          className="px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-400 placeholder-gray-500 text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600 w-64"
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        />
        <button
          onClick={handleSearch}
          disabled={!searchTerm.trim()}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:bg-blue-600 text-white rounded-r-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-blue-400"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          Search
        </button>
      </div>
    </div>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;

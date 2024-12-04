import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import SearchUserItem from "./SearchUserItem";

const Search = () => {
  const [search, setSearch] = useState("");
  const { users } = useSelector((state) => state.users);

  const filteredUsers = users.filter((user) => {
    const searchLowerCase = search.toLowerCase();
    const displayNameLowerCase = user.displayName.toLowerCase();
    const emailLowerCase = user.email.toLowerCase();

    if (search.length < 3) return false;

    return (
      displayNameLowerCase.includes(searchLowerCase) ||
      emailLowerCase.includes(searchLowerCase)
    );
  });

  return (
    <div className="relative">
      {/* Search Form */}
      <label htmlFor="search" className="relative block">
        <input
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="px-10 py-3 w-full bg-white/80 text-gray-700 outline-none placeholder:text-gray-500 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
          placeholder="Find a user"
        />
        <FaSearch className="absolute top-3 left-2 text-indigo-500 hover:text-purple-600 text-xl transition-transform transform hover:scale-110" />
      </label>
      {/* Search Results */}
      <div className="absolute w-full bg-white/90 rounded-b-md border-t border-gray-300 shadow-lg z-10">
        {filteredUsers.map((user) => (
          <SearchUserItem key={user.uid} user={user} setSearch={setSearch} />
        ))}
      </div>
    </div>
  );
};

export default Search;

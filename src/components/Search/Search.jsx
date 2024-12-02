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
          className="px-10 py-4 max-sm:py-3 w-full bg-transparent border-none text-white outline-none placeholder:text-slate-100/40 max-sm:focus:w-screen max-sm:focus:bg-amber-900 duration-1000 rounded-t-lg max-sm:focus:ring-2 max-sm:focus:ring-amber-900 max-sm:focus:border-amber-900"
          placeholder="Find a user"
        />
        <FaSearch className="absolute top-4 left-2 text-slate-100/40 text-2xl transition-transform transform-gpu hover:scale-105" />
      </label>
      {/* Search Results */}
      <div className="absolute max-sm:w-96 z-10 bg-amber-900 w-full border-b max-sm:border-none border-slate-400  shadow-md">
        {filteredUsers.map((user) => (
          <SearchUserItem key={user.uid} user={user} setSearch={setSearch} />
        ))}
      </div>
    </div>
  );
};

export default Search;

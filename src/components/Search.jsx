import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [searchedUsers, setSearchedUsers] = useState([]);

  const searchUsers = async () => {
    try {
      const response = await axios.get(
        `/api/searchuser/${searchTerm}`
      );

      console.log(response);

      if (response.data.users.length > 0) {
        setSearchedUsers(response.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchUsers();
  }, [searchTerm]);

  return (
    <div className="flex flex-col items-center">
      {/* Search Input Container */}
      <div className="mt-8">
        <input
          type="text"
          className="border-2 border-[#4CADDA] h-12 w-[600px] rounded-lg outline-none p-4 placeholder:text-[#4CADDA]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a username"
        />
      </div>

      {/*  */}
      {searchedUsers.length === 0 ? (
        // No Search Yet Section
        <div className="h-[500px] w-[500px] flex flex-col justify-center items-center">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="96"
            viewBox="0 96 960 960"
            width="96"
            fill="#4CADDA"
            className="opacity-30 text-[#4CADDA] "
          >
            <path d="M796 935 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l264 262-44 44ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z" />
          </svg>
        </div>
      ) : (
        <div className="flex flex-col">
          {searchedUsers.map((user) => (
            <Link
              to={`/${user.username}`}
              key={user._id}
              className="border-2 border-blue-400 w-[600px] text-center mt-4 gap-2 py-2 rounded-md bg-blue-300  "
            >
              <p className="text-white">{user.username}</p>
              <div className="flex flex-row gap-2 justify-center mt-2">
                <p>Followers: {user.followers.length}</p>
                <p>Following: {user.following.length}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;

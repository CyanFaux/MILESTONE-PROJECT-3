import { useState } from "react";

function SearchBar(props) {
  let [searchTerm, setSearchTerm] = useState("");

  return (
    <form className="p-2" onSubmit={(e) => props.handleSearch(e, searchTerm)}>
      <input
        className="mx-1"
        type="text"
        placeholder="Find a movie!"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input type="submit" value="Search" />
    </form>
  );
}

export default SearchBar;

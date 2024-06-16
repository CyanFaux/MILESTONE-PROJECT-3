import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/CurrentUser";
import SearchBar from "./searchBar";
import { createResource } from "../Request";

function Navigation() {
  let [ searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearchTerm(term);
    const resource = createResource(term);
    try {
      const data = resource.result.read();
      if (data && data.imdbId) {
        navigate(`/movies/${data.imdbId}`);
      } else {
        return `Movie not found :(`;
      }
    } catch (err) {
      return `Failed to fetch movie ${err}`;
    }
  };

  const { currentUser, setCurrentUser } = useContext(UserContext);

  let loginActions = (
    <>
      <li className="nav-item p-2">
        <a href="/sign-up">Sign Up</a>
      </li>
      <li className="nav-item p-2">
        <a href="/login">Login</a>
      </li>
    </>
  );

  if (currentUser) {
    loginActions = (
      <li className="nav-item p-2">
        Logged in as {currentUser.firstName} {currentUser.lastName}
      </li>
    );
  }

  let reviewButton = null;

  if (currentUser) {
    reviewButton = (
      <li className="nav-item p-2">
        <button onClick={() => navigate("/leave-review")}>Leave Review</button>
      </li>
    );
  }

  return (
    <nav className="d-flex justify-content-between">
      <h2 className="p-2">
        <a href="/" className="text-dark link-underline link-underline-opacity-0">MovieMind</a>
      </h2>
      <SearchBar handleSearch={handleSearch} />
      <ul className="nav">
        <li className="nav-item p-2">
          <a href="/movies/review">Add a Review</a>
        </li>
        {reviewButton}
        {loginActions}
      </ul>
    </nav>
  );
}

export default Navigation;

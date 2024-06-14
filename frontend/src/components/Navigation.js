import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router";
import { CurrentUserContext, CurrentUserProvider } from '../contexts/CurrentUser'
import SearchBar from './searchBar';
import { createResource } from '../Request';

function Navigation() {
    let [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e, term) => {
        e.preventDefault()
        setSearchTerm(term)
        const resource = createResource(term)
        try{
            const data = resource.result.read()
            if(data && data.imdbId){
                navigate(`/movies/${data.imdbId}`)
            }else{
                return `Movie not found :(`
            }
        } catch (err) {
            return `Failed to fetch movie`, err
        }
    }

    const { currentUser } = useContext(CurrentUserContext)

    let loginActions = (
        <>
            <li style={{ float: 'right' }}>
                <a onClick={() => navigate("/sign-up")}>
                    Sign Up
                </a>
            </li>
            <li style={{ float: 'right' }}>
                <a onClick={() => navigate("/login")}>
                    Login
                </a>
            </li>
        </>
    )

  

    if (currentUser) {
        loginActions = (
            <li style={{ float: 'right' }}>
                Logged in as {currentUser.firstName} {currentUser.lastName}
            </li>
        )
    }
    
    let reviewButton = null;

    if (currentUser) {
        reviewButton = (
            <li>
                <button onClick={() => navigate("/leave-review")}>
                    Leave Review
                </button>
            </li>
        );
    }
    
    return (
        <nav>
            <SearchBar handleSearch={handleSearch} />
            <ul>
                <li>
                    <a onClick={() => navigate("/movies")}>
                        Movies
                    </a>
                </li>
                <li>
                    <a onClick={() => navigate("/movies/review")}>
                        Add a Review
                    </a>
                </li>
                {reviewButton}
                {loginActions}
            </ul>
        </nav>
    )
}

export default Navigation;
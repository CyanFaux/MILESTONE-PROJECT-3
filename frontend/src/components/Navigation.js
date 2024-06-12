import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router";
import { CurrentUser } from './contexts/CurrentUser';
import SearchBar from './searchBar';
import { createResource } from '../Request';

function Navigation() {
    let [searchTerm, setSearchTerm] = useState('')
    const history = useHistory()

    const handleSearch = (e, term) => {
        e.preventDefault()
        setSearchTerm(term)
        const resource = createResource(term)
        try{
            const data = resource.result.read()
            if(data && data.imdbId){
                history.push(`/movies/${data.imdbId}`)
            }else{
                return `Movie not found :(`
            }
        } catch (err) {
            return `Failed to fetch movie`, err
        }
    }

    const { currentUser } = useContext(CurrentUser)

    let loginActions = (
        <>
            <li style={{ float: 'right' }}>
                <a href="#" onClick={() => history.push("/sign-up")}>
                    Sign Up
                </a>
            </li>
            <li style={{ float: 'right' }}>
                <a href="#" onClick={() => history.push("/login")}>
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

    if (currentUser?.authenticated) {
        reviewButton = (
            <li>
                <button onClick={() => history.push("/leave-review")}>
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
                    <a href="#" onClick={() => history.push("/")}>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => history.push("/movies")}>
                        Movies
                    </a>
                </li>
                <li>
                    <a href="#" onClick={() => history.push("/movies/review")}>
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
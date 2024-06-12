import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router";
import { CurrentUser } from './contexts/CurrentUser';
import SearchBar from './components/searchBar';

function Navigation() {

    const history = useHistory()

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
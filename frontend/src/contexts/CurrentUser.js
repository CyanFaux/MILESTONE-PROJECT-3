import React, { createContext, useState, useEffect } from "react";


export const CurrentUserContext = createContext();


__
function CurrentUserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {

        const getLoggedInUser = async () => { 
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/authentication/profile)`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            let user = await response.json()
            setCurrentUser(user)
        }
        getLoggedInUser()
    }, [])



    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUserContext.Provider>
    );


}

export default CurrentUserProvider;

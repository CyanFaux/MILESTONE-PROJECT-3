import React, { createContext, useState, useEffect } from "react";

export const CurrentUserContext = createContext();

/* __; */
export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/authentication/profile`,
        );
        let user = await response.json();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error parsing JSON data:", error);
      }
    };
    getLoggedInUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
export default CurrentUserContext;
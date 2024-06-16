import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/authentication/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
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
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default CurrentUserProvider;

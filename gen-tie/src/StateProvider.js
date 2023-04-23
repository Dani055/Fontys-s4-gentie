import React, { createContext, useCallback, useState } from 'react';
import requestsData from "./state/requests.json"
import recipesData from "./state/recipes.json"
export const AppContext = createContext();

export function StateProvider({ children }) {
    const [isElder, setIsElder] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);
    const [requests, setRequests] = useState(requestsData)
    const [recipes, setRecipes] = useState(recipesData)

    return (
        <AppContext.Provider value={{
            isElder, setIsElder,
            requests, setRequests,
            recipes, setRecipes,
            loggedUser, setLoggedUser
        }}>
            {children}
        </AppContext.Provider>
    )
}

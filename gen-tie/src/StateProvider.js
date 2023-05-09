import React, { createContext, useCallback, useState } from 'react';
import requestsData from "./state/requests.json"
import recipesData from "./state/recipes.json"
import usersData from "./state/users.json"
import eventsData from "./state/events.json"
export const AppContext = createContext();

export function StateProvider({ children }) {
    const [isElder, setIsElder] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);
    const [requests, setRequests] = useState(requestsData)
    const [users, setUsers] = useState(usersData)
    const [recipes, setRecipes] = useState(recipesData)
    const [events, setEvents] = useState(eventsData)

    return (
        <AppContext.Provider value={{
            isElder, setIsElder,
            requests, setRequests,
            recipes, setRecipes,
            loggedUser, setLoggedUser,
            users, setUsers,
            events
        }}>
            {children}
        </AppContext.Provider>
    )
}

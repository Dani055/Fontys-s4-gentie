import React, { createContext, useCallback, useState } from 'react';
import requestsData from "./state/requests.json"
export const AppContext = createContext();

export function StateProvider({ children }) {
    const [isElder, setIsElder] = useState(null);
    const [requests, setRequests] = useState(requestsData)


    return (
        <AppContext.Provider value={{ isElder, setIsElder, requests, setRequests }}>
            {children}
        </AppContext.Provider>
    )
}

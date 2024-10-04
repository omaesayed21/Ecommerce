import { createContext, useEffect, useState } from "react"
 export  let authContext =   createContext()

export function UserContextProvider({ children }) {

    let [Token , setToken] = useState(null)

    useEffect(function(){
            const value = localStorage.getItem('tkn')
            if(value != null){
                setToken(value)
            }
    } ,[])
    return (
        <authContext.Provider value={{ myToken: Token , setToken}} >
            {children}
     
     
        </authContext.Provider>
    );
}

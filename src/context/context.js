import { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { data } from "../data";





const initialValue = {
   data: data,
   filteredData: data,    
}





export const DataContext = createContext(initialValue);

export const DataProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialValue);

   
 

      

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )   
}

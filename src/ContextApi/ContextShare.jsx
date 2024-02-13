import React, { createContext, useState } from 'react'
export const addProjectResponseContext = createContext()
export const editProjectResponseContext=createContext()

function ContextShare({ children }) {
    const [addProjectRes, setAddProjectRes] = useState("")
    const [editProjectRes, setEditProjectRes] = useState("")
    return (
        <>
            <addProjectResponseContext.Provider value={{addProjectRes,setAddProjectRes}}>
            <editProjectResponseContext.Provider value={{editProjectRes,setEditProjectRes}}>
                {children}
             </editProjectResponseContext.Provider>
            </addProjectResponseContext.Provider>
        </>
    )
}

export default ContextShare
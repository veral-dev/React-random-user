import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const UsersContext = createContext()

const UserProvider = (props) => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            const url = 'https://randomuser.me/api/?results=50'

            const usersApi = await axios.get(url)

            setUsers(usersApi.data.results)
            setLoading(false)
        }
        getUser()
        
    }, [])


    return (
        <UsersContext.Provider
            value={{
                users,
                loading,
                setUsers
            }}>
            {props.children}
        </UsersContext.Provider>
    )
}

export default UserProvider
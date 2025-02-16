import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Appcontent = createContext()

export const AppcontentProvider = (props) => {
    const backendurl = import.meta.env.VITE_BACK_END_URL
    const [isloggedin, setIsloggedin] = useState(false)
    const [userdata, setUserdata] = useState(false)
    const getuserdata = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/user/data', { withCredentials: true })
            if (data.success && data.userData) {
                setUserdata(data.userData)
            } else {
                console.error("Failed to fetch user data:", data.message)
                setUserdata(null);
            }
        } catch (error) {
            console.error("Error fetching user data:", error.message)
        }
    }
    const getAuthstatus = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/auth/is-authed', { withCredentials: true });
            if (data.success) {
                setIsloggedin(true)
                getuserdata()
            }
        } catch (error) {
            console.error("could not find authstatus:", error.message);
        }
    }
    useEffect(() => {
        getAuthstatus()
    }, [])
    const value = {
        backendurl,
        isloggedin,
        setIsloggedin,
        userdata,
        setUserdata,
        getuserdata,
        getAuthstatus
    }
    return (
        <Appcontent.Provider value={value}>
            {props.children}
        </Appcontent.Provider>
    )
}
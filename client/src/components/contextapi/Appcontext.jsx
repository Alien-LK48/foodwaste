import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Appcontent = createContext()

export const AppcontentProvider = (props) => {
    const backendurl = import.meta.env.VITE_BACK_END_URL
    const [isloggedin, setIsloggedin] = useState(false)
    const [userdata, setUserdata] = useState(false)
    const [foodData, setFoodData] = useState([]);
    const [count, setCount] = useState({
        admin: 0,
        ngo: 0,
        user: 0,
        donor: 0,
        verifiedNgo: 0,
        totalfoods: 0,
        ban: 0
    })
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
    const getfoods = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/api/admin/foodData", {
                withCredentials: true,
            });
            setFoodData(data.foods);
        } catch (error) {
            console.error("Error fetching donated foods:", error.message);
        }
    };
    const totalcount = async (req, res) => {
        const { data } = await axios.get("http://localhost:3000/api/admin/countData", { withCredentials: true })
        setCount({
            admin: data.admins,
            ngo: data.ngos,
            user: data.users,
            donor: data.donors,
            verifiedNgo: data.ngoaccountnotverified,
            totalfoods: data.totalfoods,
            ban: data.ban
        })
    }
    useEffect(() => {
        getAuthstatus()
        getfoods();
        totalcount()
    }, [])


    const value = {
        backendurl,
        isloggedin,
        setIsloggedin,
        userdata,
        setUserdata,
        getuserdata,
        getAuthstatus,
        foodData,
        count
    }
    return (
        <Appcontent.Provider value={value}>
            {props.children}
        </Appcontent.Provider>
    )
}
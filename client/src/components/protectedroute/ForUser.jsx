import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Appcontent } from '../contextapi/Appcontext';
export default function ForUser({ children }) {
    const { userdata, getAuthstatus } = useContext(Appcontent);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkAuth = async () => {
            await getAuthstatus();
            setLoading(false);
        };
        checkAuth();
    }, []);
    if (loading) {
        return <h1 className="text-center text-2xl">Loading...</h1>;
    }
    if (!userdata || !userdata.user || !userdata.user.isUser) {
        return <Navigate to="/" replace />;
    }
    return children;
}

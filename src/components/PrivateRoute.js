import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }) {
    const { currentUser } = useAuth()
    const [curr, setCurr] = useState(currentUser)

    useEffect(() => {
    }, [window.location.pathname])


    if (!curr) {
        return <Navigate to="/login" />;
    }
    return children;

}

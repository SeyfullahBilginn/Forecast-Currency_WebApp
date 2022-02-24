import React, { useContext, useState, useEffect } from "react"
import { db } from "../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useDispatch } from 'react-redux';
import { fetchAllBets, fetchStoredBets } from "../stores/actions/userAction";


const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const auth = getAuth();

    const dispatch = useDispatch();

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password).then(userCredential => {

            // create user object in db
            set(ref(db, 'users/' + userCredential.user.uid), {
                email: email
            });
        })
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        signOut(auth).then(() => {
            // console.log("sign out successful")
        }).catch((error) => {
            console.log("An error occured")
            console.log(error);
        })
    }

    useEffect(() => {
        // refresh user if user token changes
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)

            if (user) {
                dispatch(fetchStoredBets(user))
                dispatch(fetchAllBets())
            }
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
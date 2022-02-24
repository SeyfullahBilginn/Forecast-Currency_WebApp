import React, { useLayoutEffect, useState } from 'react';
import { useAuth } from './components/AuthContext';
import { auth } from './firebaseConfig';
import Routing from './navigation/Routing';




export default function App(props) {

  const { currentUser } = useAuth()
  const [isAdmin, setIsAdmin] = useState();


  useLayoutEffect(() => {
    controlAdmin()

  }, [currentUser])

  function controlAdmin() {

    if (auth.currentUser) {
      auth.currentUser.getIdTokenResult()
        .then((idTokenResult) => {
          setIsAdmin(idTokenResult.claims.admin)
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }

  return (
    <Routing isAdmin={isAdmin} />
  )
}
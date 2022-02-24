import React, { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../components/AuthContext';

export default function User() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useNavigate()
    async function handleLogout() {
        setError("")
        try {
            await logout()
            history("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <div>
            {/* <div className="w-100 text-center mt-2">
                <Button href='/login' variant="contained">Login</Button>
            </div> */}
            {/* <Button href='/signup' variant="contained">Sİgnup</Button> */}
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email}
                    <Button style={{ margin: 0 }} variant="secondary" onClick={handleLogout}>
                        Log Out
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}
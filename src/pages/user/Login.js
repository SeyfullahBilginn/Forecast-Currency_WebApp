import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './../../components/AuthContext';


export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    // const history = useHistory()
    // const dispatch = useDispatch();
    // const userData = useSelector(state => state.userData);

    // const { currentUser } = useAuth()


    let navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)

            await login(emailRef.current.value, passwordRef.current.value)
            // dispatch(setEmail(emailRef.current.value))
            console.log("sign in successfully")
            
            // navigate to home screen after successful login
            navigate("/")
        } catch (error) {
            setError("Failed to log in")
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        {
                            loading ? (

                                <Button disabled={loading} className="w-100" type="submit">
                                    loading
                                </Button>                            ) : (

                                <Button disabled={loading} className="w-100" type="submit">
                                    Log In
                                </Button>
                            )
                        }
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}
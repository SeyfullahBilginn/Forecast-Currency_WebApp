import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { addBet } from "../../HelperFunctions/HelperFunctions";


export default function AdminPage() {

    const currencyCodeRef = useRef()
    const betIdRef = useRef()
    const betRef = useRef()
    const dueDateRef = useRef()
    const betDateRef = useRef()


    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            addBet(betIdRef.current.value,
                {
                    bet: betRef.current.value,
                    date: betDateRef.current.value,
                    due: dueDateRef.current.value,
                    id: betIdRef.current.value,
                    numOfDown: 0,
                    numOfUp: 0
                }
            )
        } catch (error) {
            console.log(error)
            setError("Failed to add new bet to database")
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Add New Bet</h2>

                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Currency Code</Form.Label>
                            <Form.Control type="code" ref={currencyCodeRef} required />
                        </Form.Group>

                        <Form.Group id="email">
                            <Form.Label>Bet id</Form.Label>
                            <Form.Control type="code" ref={betIdRef} required />
                        </Form.Group>

                        <Form.Group id="email">
                            <Form.Label>Bet $</Form.Label>
                            <Form.Control type="code" ref={betRef} required />
                        </Form.Group>

                        <Form.Group id="email">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="code" ref={dueDateRef} required />
                        </Form.Group>

                        <Form.Group id="email">
                            <Form.Label>Bet Date</Form.Label>
                            <Form.Control type="code" ref={betDateRef} required />
                        </Form.Group>


                        {
                            loading ? (
                                <Button disabled={loading} className="w-100" type="submit">
                                    loading
                                </Button>) : (
                                <Button disabled={loading} className="w-100" type="submit">
                                    Add Bet
                                </Button>
                            )
                        }
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}
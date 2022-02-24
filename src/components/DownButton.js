import { Button } from "@mui/material";
import { BsPeopleFill } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { fetchVoters } from "../HelperFunctions/HelperFunctions";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';

export default function DownButton({ item, upOrDown, numOfDown, downClick }) {
    const [voters, setVoters] = useState([]);
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);

    async function handleShow() {
        const data = await fetchVoters(item.id, false)

        setVoters(data)
        setShow(true)
    };

    return (
        <>
            <Button variant="text"
                style={{
                    opacity: (upOrDown === "down" ? 0.9 : 0.3),
                    justifyContent: "center",
                    background: "transparent"
                }}
                onClick={handleShow}
            >
                <BsPeopleFill size={"1.2rem"} color="red" />
                <div
                    style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "red",
                        marginLeft: 2
                    }}
                >
                    {numOfDown}
                </div>
            </Button>
            <Button variant="contained" onClick={downClick}
                style={{
                    opacity: (upOrDown === "down" ? 0.9 : 0.3),
                    backgroundColor: "red",
                }}>
                <FaCaretDown size={"3rem"} />
                <p style={{
                    margin: 0,
                    fontSize: "1.2rem"
                }}>
                    {item.bet}$
                </p>
            </Button>

            <Modal
                style={{
                    display: "flex",
                    marginTop: "12vh",
                    marginLeft: "14vw",
                    alignSelf: "center",
                    width: "70%"
                }}
                show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>People who voted up for</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {
                            voters.map(item => {
                                return (
                                    <li key={item}>{item}</li>
                                )
                            })
                        }
                    </ul>
                </Modal.Body>
            </Modal>

        </>
    )
}
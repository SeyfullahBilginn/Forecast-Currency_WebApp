import { Button } from "@mui/material";
import { BsPeopleFill } from "react-icons/bs";
import { FaCaretUp } from "react-icons/fa";
import { Modal } from 'react-bootstrap';
import { fetchVoters } from "../HelperFunctions/HelperFunctions";
import { useEffect, useState } from "react";
import { width } from "@mui/system";

export default function UpButton({ item, upOrDown, numOfUp, onClick }) {
    const [voters, setVoters] = useState([]);
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);

    async function handleShow() {
        const data = await fetchVoters(item.id, true)

        setVoters(data)
        setShow(true)

    };

    return (
        <div>
            <Button variant="text"
                style={{
                    opacity: (upOrDown === "up" ? 0.9 : 0.3),
                    justifyContent: "center",
                    backgroundColor: "transparent"
                }}
                onClick={handleShow}
            >
                <BsPeopleFill size={"1.2rem"} color="green" />
                <div
                    style={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "green",
                        marginLeft: 2
                    }}
                >
                    {numOfUp}
                </div>
            </Button>
            <Button variant="contained" onClick={onClick}
                style={{
                    opacity: (upOrDown === "up" ? 0.9 : 0.3),
                    backgroundColor: "green",

                }}>
                <FaCaretUp size={"3rem"} />
                <p style={{
                    margin: 0,
                    fontSize: "1.2rem"
                }}>
                    {item.bet}$
                </p>
            </Button>

            <Modal style={{
                display: "flex",
                marginTop: "12vh",
                marginLeft: "14vw",
                alignSelf: "center",
                width: "70%"
            }} show={showModal} onHide={handleClose}>
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
        </div>
    )
}
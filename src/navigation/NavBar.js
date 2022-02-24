import Button from '@mui/material/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLayoutEffect, useState } from 'react';
import {
    Link
} from "react-router-dom";
import btcIcon from "../assets/bitcoin.png";
import ethIcon from "../assets/etherium.png";
import auIcon from "../assets/gold.png";
import allIcon from "../assets/money.png";
import "./NavBar.css"
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'; import 'jquery/dist/jquery.min.js';
export default function NavBar(props) {

    const [activePageIndex, setactivePageIndex] = useState(0)

    const [pages, setPages] = useState(
        [
            { name: "ALL", pathname: "", icon: allIcon, current: null },
            { name: "AU", pathname: "au", icon: auIcon, current: null },
            { name: "BTC", pathname: "btc", icon: btcIcon, current: null },
            { name: "ETH", pathname: "eth", icon: ethIcon, current: null }
        ]

    );

    useLayoutEffect(() => {

        var au = null
        var eth = null
        var btc = null

        // refresh fetching values for every 4 minutes
        setInterval(() => {

            // fetch current value of au based on Usd
            axios.get("https://api.binance.us/api/v3/avgPrice?symbol=PAXGUSD").then(
                response => {
                    au = response.data.price
                    au = au.substring(0, au.indexOf(".")) + "$"

                }
            )

            // fetch current value of eth based on Usd
            axios.get("https://api.coinbase.com/v2/prices/ETH-USD/spot").then(
                response => {
                    eth = response.data.data.amount
                    eth = eth.substring(0, eth.indexOf(".")) + "$"

                }
            )

            axios.get("https://api.coinbase.com/v2/prices/spot?currency=USD").then(
                response => {
                    btc = response.data.data.amount
                    btc = btc.substring(0, btc.indexOf(".")) + "$"

                }
            )
            setPages([pages[0], { ...pages[1], current: au }, { ...pages[2], current: btc }, { ...pages[3], current: eth }])
        }, 4000)
    }, [])

    return (
        <div className="scroll__container">
            <div className="skin__option">
                {
                    pages.map((item, index) => (
                        // <div>{index}</div>
                        <Link key={index} to={`/${item.pathname}`} style={{ textDecoration: 'none' }}>
                            <Button variant="contained"
                                className='intro'
                                style={{
                                    margin: 10,
                                    height: "10vh",
                                    width: "20vw",
                                    padding: 0,
                                    backgroundColor: (index === activePageIndex ? "#705107" : "#886308"),
                                }}
                                onClick={() => {
                                    setactivePageIndex(index)
                                }}
                            >
                                <img
                                    style={{ display: "flex" }}
                                    className='img'
                                    alt={item.name}
                                    src={item.icon}
                                    width={(index === activePageIndex) ? "26%" : "24%"}
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginLeft: 10,
                                        padding: 0
                                    }}>
                                    <div style={{
                                        fontWeight: "bolder",
                                        float: "right",
                                        fontSize: (index === activePageIndex) ? "1em" : "0.9em"
                                    }} >
                                        {item.name}
                                    </div>
                                    <div style={{
                                        fontWeight: "normal",
                                        fontSize: (index === activePageIndex) ? "0.9em" : "0.8em"
                                    }}>
                                        {item.current}
                                    </div>
                                </div>
                            </Button>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

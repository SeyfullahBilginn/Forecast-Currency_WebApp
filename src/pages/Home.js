import React, {useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BetCard from './../components/BetCard';
import './Home.css';

function Home(props) {
    const [allBets, setAllBets] = useState([])
    // bets comes from db
    // it s all stored bets of current user
    let { cCode } = useParams();
    let code = cCode ? cCode.toString() : null
    const state = useSelector(state => state.user);


    async function getInfo() {
        if (code) {
            var qwe = []
            qwe = await state.allBets["bets"][code]
            setAllBets([])
            qwe.map(item => {
                setAllBets(bets => [...bets, item])
            })
        } else {
            var arr = []
            Object.keys(state.allBets["bets"]).map(key => {
                state.allBets["bets"][key].map(item => {
                    arr.push(item)
                })
            })
            setAllBets(arr)
        }
    }

    useEffect(() => {

        if (state.allBets["bets"]) {
            getInfo()
        } else {
            /* wait 1 sec for the initial rendering
                state.allBets["bets"] is undefined for the initial rendering
                data comes from firebase realtime database as asynchorous.
                redux thunk can solve but 
                there is no promise (then) of onValue(()...). for now
                will be fixed later 
            */
            setTimeout(async () => {
                getInfo()
            }, 1000)
        }
    }, [cCode, code])


    return (
        <div className="main" >
            <ul className="cards">
                {
                    allBets.map((item, index) => {
                        return (
                            <BetCard item={item} code={code} key={index} />
                        )
                    })
                }
            </ul>
        </div>
    );

}
export default Home;



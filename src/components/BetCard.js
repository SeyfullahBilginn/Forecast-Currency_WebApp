import UpDownButtons from "./UpDownButtons";
import '../pages/Home';
import { getLocalDate } from "../HelperFunctions/DateFunctions";
import { useEffect } from "react";

export default function BetCard({ item, code }) {

    // calculate local date of bet's date
    // bet dates are based on GMT-5 00.00
    // convert it to local correspondences
    const date = getLocalDate(item.date)


    return (
        <li className="cards_item" >
            <div className="card" >
                <div className="card_content" >
                    <div style={{
                        display: "flex",
                        marginBottom: 10,
                        flexDirection: "row",
                        justifyContent: "center"
                    }}>
                        <h2 className="card_title"
                            style={{
                                fontSize: "1.4rem"
                            }}
                        >
                            Bet: {item.bet}$
                        </h2>
                        <h2 className="card_date"
                            style={{
                                fontSize: "1rem"
                            }}
                        >
                            {date}
                        </h2>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                margin: 10
                            }}
                        >
                            <UpDownButtons item={item} code={code} />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
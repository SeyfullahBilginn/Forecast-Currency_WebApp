
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUpOrDownData, removeUpOrDownData } from '../stores/actions/userAction';
import { useAuth } from './AuthContext';
import { fetchVoters } from '../HelperFunctions/HelperFunctions';
import DownButton from './DownButton';
import UpButton from './UpButton';
import { useLayoutEffect } from 'react';


export default function UpDownButtons({ item, code }) {
    const state = useSelector(state => state.user);
    const dispatch = useDispatch()

    const { currentUser } = useAuth()
    const [numOfUp, setNumOfUp] = useState(0)
    const [numOfDown, setNumOfDown] = useState(0)

    const [upOrDown, setUpOrDown] = useState("")

    useLayoutEffect(() => {

        if (item.up) {
            setNumOfUp(Object.keys(item["up"]).length)
        }

        if (item.down) {
            setNumOfDown(Object.keys(item["down"]).length)
        }

        if (!state.storedBets) return;

        // x is used for items that is not matched any
        var x = false
        Object.keys(state.storedBets).map(key => {
            return (
                Object.keys(state.storedBets[key]).map(key2 => {

                    if (item.id !== state.storedBets[key][key2].id) return;

                    // if they matches, set state
                    if (state.storedBets[key][key2].upOrDown === "down") {
                        setUpOrDown("down")
                        x = true
                    }
                    else {
                        setUpOrDown("up")
                        x = true
                    }
                })
            )
        }
        )
        // if x doesnt match any, it s null, empty
        if (!x) {
            setUpOrDown("")
        }


    }, [item])

    const downClick = () => {
        /*
            if it s "down", remove from only downs,
            if it s "up", remove from ups and add to ups
            if it s ""(null), add to downs
        */
        if (upOrDown === "down") {
            // remove
            dispatch(removeUpOrDownData(item, currentUser, "down")) //remove last previously added
            setUpOrDown("")
            setNumOfDown(numOfDown - 1)
        } else if (upOrDown === "up") {
            dispatch(removeUpOrDownData(item, currentUser, "up")) //remove last previously added
            dispatch(addUpOrDownData(item, currentUser, "down"))
            setUpOrDown("down")
            setNumOfDown(numOfDown + 1)
            setNumOfUp(numOfUp - 1)
        } else { // case of null "" upOrDown === ""
            dispatch(addUpOrDownData(item, currentUser, "down"))
            setUpOrDown("down")
            setNumOfDown(numOfDown + 1)
        }
    }

    const upClick = () => {
        /*
            if it s "up", remove from only ups,
            if it s "down", remove from downs and add to ups,
            if it s ""(null), add to ups
        */
        if (upOrDown === "up") {
            // remove
            dispatch(removeUpOrDownData(item, currentUser, "up"))
            setUpOrDown("")
            setNumOfUp(numOfUp - 1)
        } else if (upOrDown === "down") {
            dispatch(removeUpOrDownData(item, currentUser, "down"))
            dispatch(addUpOrDownData(item, currentUser, "up"))
            setUpOrDown("up")
            setNumOfUp(numOfUp + 1)
            setNumOfDown(numOfDown - 1)

        } else { // case of null "" upOrDown === ""
            dispatch(addUpOrDownData(item, currentUser, "up"))
            setUpOrDown("up")
            setNumOfUp(numOfUp + 1)
        }

    }

    return (

        <div>
            <UpButton
                item={item}
                upOrDown={upOrDown}
                numOfUp={numOfUp}
                onClick={() => upClick()}
            />
            <DownButton
                item={item}
                upOrDown={upOrDown}
                numOfDown={numOfDown}
                downClick={() => downClick()}
            />
        </div>
    )
}

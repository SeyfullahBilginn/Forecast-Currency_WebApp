import { onValue, ref, remove, set } from "firebase/database";
import { db } from "../../firebaseConfig";
// import { addAdminRole } from "../../functions";

const INITIAL_STATE = {
    userData: {
        name: "",
        email: "",
    },
    allBets: {
    },
    storedBets: {
    },
    isAdmin: null,
    currentDate: Date().toLocaleString()

};

function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case "SET_EMAIL": {

            return {
                ...state,
                userData: {
                    name: "",
                    email: action.email,
                }
            };
        }
        case "FETCH_ALL_BETS": {
            const allBetsRef = ref(db, `currencies/`);

            onValue(allBetsRef, (snapshot) => {
                // need to change
                state.allBets = snapshot.val()

            })
            return state
        }
        case "FETCH_STORED_BETS": {
            const betsRef = ref(db, `users/${action.currentUser.uid}/bets`);

            onValue(betsRef, (snapshot) => {
                // we need to revise here
                state.storedBets = snapshot.val()
            })

            return state
        }
        case "ADD_UP_OR_DOWN_DATA": {
            const uid = action.currentUser.uid
            const id = action.item.id

            const regexChar = /[`~!@#$%^&*()-_+{}[\]\\|,.//?;':"]/g
            const matchIdChar = id.replace(regexChar, '')

            const regexNum = /[^\d]/g;
            const matchIdNum = id.replace(regexNum, "")

            // add new bet to relevant users' bets
            set(ref(db, `users/${uid}/bets/${matchIdChar}/${matchIdNum}`), {
                ...action.item,
                upOrDown: action.upOrDown
            }).then(() => {
                // state.bets[matchIdChar][matchIdNum] = (action.item)
                // if list of this char is not initialized befor
                // initialize it to empty array, then add item
                // else just add item
                if (!state.storedBets[matchIdChar]) {
                    state.storedBets[matchIdChar] = []
                    state.storedBets[matchIdChar][matchIdNum] = {
                        ...action.item,
                        upOrDown: action.upOrDown
                    }
                } else {
                    state.storedBets[matchIdChar][matchIdNum] = {
                        ...action.item,
                        upOrDown: action.upOrDown
                    }
                }
            }).catch((error) => {
                console.log("An error occured \n error:" + error)
            })
            // add this user to relevant bet of currencies
            // to Up Voters or Down Voters

            set(ref(db, `currencies/bets/${matchIdChar}/${matchIdNum}/${action.upOrDown}/${uid}`),
                {
                    uid: uid,
                    email: action.currentUser.email
                }
            )

            return state
        }
        case "REMOVE_UP_OR_DOWN_DATA": {
            const uid = action.currentUser.uid
            const id = action.item.id

            const regexChar = /[`~!@#$%^&*()-_+{}[\]\\|,.//?;':"]/g
            const matchIdChar = id.replace(regexChar, '')

            const regexNum = /[^\d]/g;
            const matchIdNum = id.replace(regexNum, "")

            // remove Data from db
            remove(ref(db, `users/${uid}/bets/${matchIdChar}/${matchIdNum}`)).then(() => {
                console.log(`${matchIdChar}${matchIdNum}Successfully Removed from user`);

            }
            )

            // remove this user to relevant bet of currencies
            // from Up Voters or Down Voters

            // const upOrDown = action.upOrDown

            remove(ref(db, `currencies/bets/${matchIdChar}/${matchIdNum}/${action.upOrDown}/${uid}`)).then(() => {
                console.log(`${matchIdChar}${matchIdNum}Successfully Removed from bets`);
            }
            )

            // console.log("REMOVE_UP_OR_DOWN_DAtA");
            return state
        }
        case "SET_IS_ADMIN": {
            return {
                ...state,
                isAdmin: action.isAdmin
            }
        }
        default:
            return state;
    }
}

export default userReducer
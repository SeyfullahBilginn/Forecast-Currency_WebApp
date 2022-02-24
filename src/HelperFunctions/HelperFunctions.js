import { child, get, ref, set } from "firebase/database";
import { db } from "../firebaseConfig";

// isUp should be boolean
// comparing bool is more efficient than comparing strings or others.
// that's the there s ternary operator at 10th line
async function fetchVoters(id, isUp) {

    var direction
    (isUp ? direction = "up" : direction = "down")

    const dbRef = ref(db);

    const regexChar = /[`~!@#$%^&*()-_+{}[\]\\|,.//?;':"]/g
    const matchIdChar = id.replace(regexChar, '')

    const regexNum = /[^\d]/g;
    const matchIdNum = id.replace(regexNum, "")

    var arr = []
    await get(child(dbRef, `currencies/bets/${matchIdChar}/${matchIdNum}/${direction}`)).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach(item => {
                arr.push(item.val().email)
            })
            // return snapshot.val()
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    return arr
}

// for the admin
function addBet(id, item) {

    const regexChar = /[`~!@#$%^&*()-_+{}[\]\\|,.//?;':"]/g
    const matchIdChar = id.toString().replace(regexChar, '')

    const regexNum = /[^\d]/g;
    const matchIdNum = id.toString().replace(regexNum, "")

    set(ref(db, `currencies/bets/${matchIdChar}/${matchIdNum}`),
        item
    )
}

export {
    fetchVoters,
    addBet
}
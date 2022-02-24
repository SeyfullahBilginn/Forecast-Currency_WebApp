
function setEmail(email) {
    return {
        type: "SET_EMAIL",
        email,
    }
}
function fetchStoredBets(currentUser) {
    return {
        type: "FETCH_STORED_BETS",
        currentUser: currentUser
    }
}

function fetchAllBets(currentUser) {
    return {
        type: "FETCH_ALL_BETS"
    }
}


function addUpOrDownData(item, currentUser, upOrDown) {
    return {
        type: "ADD_UP_OR_DOWN_DATA",
        item: item,
        currentUser: currentUser,
        upOrDown: upOrDown
    }
}
function removeUpOrDownData(item, currentUser, upOrDown) {
    return {
        type: "REMOVE_UP_OR_DOWN_DATA",
        item: item,
        currentUser: currentUser,
        upOrDown: upOrDown
    }
}

function setIsAdmin(isAdmin) {
    return {
        type: "SET_IS_ADMIN",
        isAdmin: isAdmin
    }
}

export {
    setEmail,
    fetchStoredBets,
    addUpOrDownData,
    removeUpOrDownData,
    fetchAllBets,
    setIsAdmin
}

const INITIAL_STATE = {
    defaultTimeZone: { timeZone: "America/New_York" },
    defaultZone: "en-US",
    clientTimeZone: {}
};


function dateReducer(state = INITIAL_STATE, action) {
    switch (action.type) {

        case "SET_CLIENT_TIME_ZONE": {
            return {
                ...state,
                clientTimeZone: new Date()
            };
        }
        default:
            return state
    }
}

export default dateReducer;
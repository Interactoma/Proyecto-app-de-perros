let initialState = {
    dogos: [],
    temperaments: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_DOGS":
            return {
               ...state,
               dogos: action.payload 
            }
        case "GET_TEMPERAMENTS":
            return{
                ...state,
                temperaments: action.payload
            }
        case "FILTER_TEMPERAMENTS":
            return{
                ...state,
                dogos: action.payload
            }
        case "ORDER_A-Z":
            return{
                ...state,
                dogos: action.payload
            }
        case "ORDER_Z-A":
            return{
                ...state,
                dogos: action.payload
            }
        case "ORDER_MAY-MEN":
            return{
                ...state,
                dogos: action.payload
            }
        case "ORDER_MEN-MAY":
            return{
                ...state,
                dogos: action.payload
            }
        default:
            return state
    }
}

export default rootReducer;
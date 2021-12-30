let initialState = {
    dogos: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_DOGS":
            return {
               ...state,
               dogos: action.payload 
            }
                
        default:
            return state
    }
}

export default rootReducer;
const Reduser=(state,action)=>{
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetchting: true,
                error: false
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetchting: false,
                error: false
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetchting: false,
                error: true
            }
        case "LOGOUT":
            return {
                user: null,
                isFetchting: false,
                error: false
            }
    
        default:
            return state
    }
}
export default Reduser;
const INITIAL_SATE = {
    default:"huzaifa123",
    hasUser:false,
    currentUsername:null,
    currentUseremail:null,
    photoURL:null,
    uid:null
    
}

export default (state = INITIAL_SATE,action)=>{
    switch(action.type){
        case "SetUser":
            return({
                ...state,
                currentUsername:action.currentUsername,
                currentUseremail:action.currentUseremail,
                uid:action.uid,
                hasUser:action.hasUser
            })
        case "SignOut":
            return({
                    ...state,
                    currentUsername:action.currentUsername,
                    currentUseremail:action.currentUseremail,
                    photoURL:action.photoURL,
                    uid:action.uid,
                    hasUser:action.hasUser
            })
        
        default:
            return state;
    }
}

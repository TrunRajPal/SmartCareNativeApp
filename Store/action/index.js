const set_user = (name,email,uid)=>{
    return (dispatch) =>{
        dispatch({
            type:"SetUser",
            currentUsername:name,
            currentUseremail:email,
            uid:uid,
            hasUser:true
        })
    }
}

const signout = ()=>{
    return (dispatch) =>{
        dispatch({
            type:"SignOut",
            currentUsername:null,
            currentUseremail:null,
            uid:null,
            hasUser:false
        })
    }
}



export {
    set_user,
    signout
}
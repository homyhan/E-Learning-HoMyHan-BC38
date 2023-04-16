import {produce} from 'immer';
const initialState ={
    user: null,
    isLogin: false
}

export const authReducer = (state= initialState, {type, payload})=>{
    return produce(state, (darft)=>{
        if(type === "LOGIN"){
            darft.user = payload;
            darft.isLogin = true
        }
        if(type==="LOGIN_FETCH"){
            darft.user = payload
        }
        if(type === "LOGOUT"){
            darft.user = null;
            localStorage.removeItem("TOKEN");
            localStorage.removeItem("USER_LOGIN");
        }
        
    })
}
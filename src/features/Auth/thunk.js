import { AuthService } from "./services/AuthService";

export const fetchProfile = async (dispatch)=>{
    try {
        const res = await AuthService.fetchProfile();
        dispatch({
            type: "LOGIN",
            payload: res.data
        })        
    } catch (error) {
        // console.log(error);
    }
}

export const signup = (data) => {
    return async (dispatch) => {
        try {
            const res = await AuthService.signup(data);

            dispatch({
                type: "SIGNUP",
                payload: res.data.content,
            });
        }catch (error) {
            console.log(error);                        
        }
    }
}

import { AuthService } from "./services/AuthService";

export const login =(data)=>{
    return async (dispatch)=>{
        try {
            const res = await AuthService.login(data);
            dispatch({
                type: "LOGIN",
                payload: res.data
            })
            localStorage.setItem("TOKEN", res.data.accessToken);
            localStorage.setItem("USER_LOGIN", JSON.stringify(res.data))
            console.log(res);
            
        } catch (error) {
            console.log(error);
        }
    }
}
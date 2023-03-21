import { https } from "../../../services/config"

export const AuthService ={
    login(data){
        const url ="/QuanLyNguoiDung/DangNhap";
        return https.post(url, data)
    }
}
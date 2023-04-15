import { https } from "../../../services/config"

export const AuthService ={
    login(data){
        const url ="/QuanLyNguoiDung/DangNhap";
        return https.post(url, data)
    },
    fetchProfile(){
        const url = "/QuanLyNguoiDung/ThongTinTaiKhoan";
        return https.post(url);
    },
    signup(data){
        const url ="/QuanLyNguoiDung/DangKy";
        return https.post(url, data)
    }
}
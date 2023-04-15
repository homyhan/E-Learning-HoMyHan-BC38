import { https } from "../../../services/config";
export const adminServ={
    getUserList: (page, MaNhom)=>{
        return https.get("/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?pageSize=10",
                {params:{
                    page,
                    MaNhom
                }}
        );
    },
    getKhoaHocChuaGhiDanh: (TaiKhoan)=>{
        return https.post("/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan="+TaiKhoan)
    },
    getKhoaHocChoXetDuyet: (taiKhoan)=>{
        return https.post("/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", taiKhoan);
    },
    getKhoaHocDaXetDuyet: (TaiKhoan)=>{
        return https.post("/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", TaiKhoan)
    },
    postGhiDanhKhoaHoc: (data)=>{
        return https.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", data)
    },
    huyGhiDanh: (data)=>{
        return https.post("/QuanLyKhoaHoc/HuyGhiDanh", data);
    },
    getLoaiNguoiDung: ()=>{
        return https.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
    },
    postThemNguoiDung: (data)=>{
        return https.post("/QuanLyNguoiDung/ThemNguoiDung", data)
    },
    putUpdateNguoiDung: (data)=>{
        return https.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data)
    },
    deleteNguoiDung: (TaiKhoan)=>{
        return https.delete("/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan="+TaiKhoan)
    },
    getSearchNguoiDung: (tuKhoa)=>{
        return https.get("/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa="+tuKhoa);
    },

    // QUAN LI KHOA HOC 
    getDanhSachKhoaHoc: (page)=>{
        return https.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang",
        {params:{
            MaNhom:"GP01",
            page,
            pageSize:10
        }})
    },
    getNguoiDungChuaGhiDanh: (MaKhoaHoc)=>{
        return https.post("/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh", MaKhoaHoc)
    },
    getHocVienChoXetDuyet: (MaKhoaHoc)=>{
        return https.post("/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet", MaKhoaHoc);
    },
    getHocVienDaThamGiaKhoaHoc: (MaKhoaHoc)=>{
        return https.post("/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc", MaKhoaHoc)
    },
    deleteKhoaHoc: (MaKhoaHoc)=>{
        return https.delete("/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc="+MaKhoaHoc);
    },
    addCourse: (data)=>{
        return https.post("/QuanLyKhoaHoc/ThemKhoaHocUploadHinh", data);
    },
    updateCourse: (data)=>{
        return https.post("/QuanLyKhoaHoc/CapNhatKhoaHocUpload", data)
    }
}

import { adminServ } from "./services/adminServices";

export const fetchUserList =(page, MaNhom)=> async (dispatch) => {
    try {
      
      const res = await adminServ.getUserList(page, MaNhom);
      dispatch({
          type: "SET_USER_LIST",
          payload: res.data,
        });      
    } catch (error) {
      console.log(error);
    }
}; 

export const fetchKhoaHocChuaGhiDanh = (TaiKhoan) => async (dispatch)=>{
    try {
        const res = await adminServ.getKhoaHocChuaGhiDanh(TaiKhoan);
        dispatch({
            type:"SET_KHOA_HOC_CHUA_GHI_DANH",
            payload: res.data
        });        
    } catch (error) {
        console.log(error);
    }
}

export const fetchKhoaHocChoXetDuyet = (taiKhoan)=>async (dispatch)=>{
    try {
        const res = await adminServ.getKhoaHocChoXetDuyet(taiKhoan);
        dispatch({
            type:"SET_KHOA_HOC_CHO_XET_DUYET",
            payload: res.data
        })        
    } catch (error) {
        console.log(error);
    }
}

export const fetchKhoaHocDaXetDuyet = (TaiKhoan) => async (dispatch)=>{
    try {
        const res = await adminServ.getKhoaHocDaXetDuyet(TaiKhoan);
        dispatch({
            type: "SET_KHOA_HOC_DA_XET_DUYET",
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}

export const fetchGhiDanhKhoaHoc = (data)=>async (dispatch)=>{
    try {
        const res = await adminServ.postGhiDanhKhoaHoc(data);        
    } catch (error) {
        console.log(error);
    }
}

export const fetchHuyGhiDanh = (data)=>async(dispatch)=>{
    try {
        const res = await adminServ.huyGhiDanh(data);
    } catch (error) {
        console.log(error);
    }
}

export const addUser = (data)=>async (dispatch)=>{
    try {
        const res = await adminServ.postThemNguoiDung(data);
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = (data)=>async (dispatch)=>{
    try {
        const res = await adminServ.putUpdateNguoiDung(data)
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = (TaiKhoan) =>async (dispatch)=>{
    try {
        const res = await adminServ.deleteNguoiDung(TaiKhoan)
    } catch (error) {
        console.log(error);
    }
}

export const searchUser = (tuKhoa)=>async (dispatch)=>{
    try {
        const res = await adminServ.getSearchNguoiDung(tuKhoa);
        dispatch({
            type:"SET_SELECTED_USER_2",
            payload: res
        })        
    } catch (error) {
        console.log(error);
    }
}

// QUAN LI KHOA HOC 

export const fetchCourseList =(page)=> async (dispatch) => {
    try {
     
      const res = await adminServ.getDanhSachKhoaHoc(page);
      dispatch({
          type: "SET_COURSE_LIST_ADMIN",
          payload: res.data,
        });        
    } catch (error) {
      console.log(error);
    }
};

export const fetchNguoiDungChuaGhiDanh = (MaKhoaHoc)=>async (dispatch)=>{
    try {
        const res = await adminServ.getNguoiDungChuaGhiDanh(MaKhoaHoc);
        dispatch({
            type: "SET_NGUOI_DUNG_CHUA_GHI_DANH",
            payload: res.data
        })        
    } catch (error) {
        console.log(error);
    }
}

export const fetchHocVienChoXetDuyet = (MaKhoaHoc)=>async (dispatch)=>{
    try {
        const res = await adminServ.getHocVienChoXetDuyet(MaKhoaHoc);
        dispatch({
            type:"SET_HOC_VIEN_CHO_XET_DUYET",
            payload: res.data
        })        
    } catch (error) {
        console.log(error);
    }
}

export const fetchHocVienDaThamGia=(MaKhoaHoc)=>async (dispatch)=>{
    try {
        const res = await adminServ.getHocVienDaThamGiaKhoaHoc(MaKhoaHoc);
        dispatch({
            type: "SET_HOC_VIEN_DA_THAM_GIA",
            payload: res.data
        })        
    } catch (error) {
        console.log(error);
    }
}

export const deleteKhoaHoc = (MaKhoaHoc)=>async (dispatch)=>{
    try {
        const res = await adminServ.deleteKhoaHoc(MaKhoaHoc);
    } catch (error) {        
        dispatch({
            type: "ERROR_DELETE_COURSE",
            payload: error.response.data
        })
    }
}

export const addCourse = (data)=>async (dispatch)=>{
    try {
        const res = await adminServ.addCourse(data);
    } catch (error) {
        console.log(error);
    }
}

export const updateCourse = (data)=>async (dispatch)=>{
    try {
        const res = await adminServ.updateCourse(data);
    } catch (error) {
        console.log(error);
    }
}
import { produce } from "immer";
const initialState = {
  userList: {},
  seletedUser: null,
  seletedUser2: null,
  selectedCourse: null,
  dsKhoaHocChuaGhiDanh: [],
  dsChoXetDuyet: [],
  dsDaXetDuyet: [],
  courseList: {},
  nguoiDungChuaGhiDanh:[],
  hocVienChoXetDuyet: [],
  hocVienDaThamGiaKhoaHoc:[],
  errorDeleteCourse: ""
};
export const adminReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === "SET_USER_LIST") {
      draft.userList = payload;
    }
    if (type === "SET_SELECTED_USER") {
      draft.seletedUser = payload;
    }
    if (type === "SET_KHOA_HOC_CHUA_GHI_DANH") {
      draft.dsKhoaHocChuaGhiDanh = payload;
    }
    if (type === "SET_KHOA_HOC_CHO_XET_DUYET") {
      draft.dsChoXetDuyet = payload;
    }
    if (type === "SET_KHOA_HOC_DA_XET_DUYET") {
      draft.dsDaXetDuyet = payload;
    }
    if (type === "SET_COURSE_LIST_ADMIN") {
      draft.courseList = payload;
    }
    if(type==="SET_NGUOI_DUNG_CHUA_GHI_DANH"){
      draft.nguoiDungChuaGhiDanh = payload
    }
    if(type==="SET_HOC_VIEN_CHO_XET_DUYET"){
      draft.hocVienChoXetDuyet = payload
    }
    if(type==="SET_HOC_VIEN_DA_THAM_GIA"){
      draft.hocVienDaThamGiaKhoaHoc = payload
    }
    if(type==="ERROR_DELETE_COURSE"){
      draft.errorDeleteCourse = payload;
    }
    if(type==="SELECTED_COURSE"){
      draft.selectedCourse = payload
    }
  });
};

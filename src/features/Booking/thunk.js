import { eLearningServ } from "../../services/eServices";

export const fetchCourseList =(page)=> async (dispatch) => {
    try {
     
      const res = await eLearningServ.getCourseList(page);
      dispatch({
          type: "SET_COURSE_LIST",
          payload: res.data,
        });        
    } catch (error) {
      console.log(error);
    }
};
export const fetchCourseListFollowCategory =(maDanhMuc)=> async (dispatch) => {
  try {
   
    const res = await eLearningServ.getCourseListFollowCategory(maDanhMuc);
    dispatch({
        type: "COURSE_LIST_FOLLOW_CATEGORY",
        payload: res.data,
      });      
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetailCourse = (maKhoaHoc)=> async (dispatch)=>{
  try {
    const res = await eLearningServ.getInfoCourse(maKhoaHoc);
    dispatch({
        type: "SET_DETAIL",
        payload: res.data,
      });
      
  } catch (error) {
    console.log(error);
  }
}

export const register = (data)=>async (dispatch)=>{
  try {
    const res = await eLearningServ.registerCourse(data);    
  } catch (error) {
    console.log(error);
  }
}

export const deleteCourse = (data) =>async (dispatch)=>{
  try {
    const res = await eLearningServ.deleteCourse(data);    
  } catch (error) {
    console.log(error);
  }
}
import { produce } from "immer";
const initialState = {
  courseList: {},
  courseListCategory:[],  
  courseListMySelf:[],
  selectedCourse: null
};
export const bookingReducer = (state = initialState, { type, payload }) => {
    return produce(state, (draft) => {
      if(type==="SET_COURSE_LIST"){
        draft.courseList = payload
        draft.courseListCategory=[];
      };
      
      if(type==="COURSE_LIST_FOLLOW_CATEGORY"){
        draft.courseListCategory=payload
      };
      if(type==="SET_DETAIL"){
        // draft.courseDetail=payload;
        draft.selectedCourse = payload;
      }
      if(type==="COURSE_LIST_MS"){
        draft.courseList={}
        draft.courseListCategory=[]
      }
    });
  };
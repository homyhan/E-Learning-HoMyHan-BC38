import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import Header from '../../../components/Header'
import { fetchCourseListFollowCategory } from '../thunk';
import CourseList from './CourseList'

const Category = () => {  
  const dispatch = useDispatch() ;
  const params = useParams();
  const categote = params.id;
  const {courseListCategory} = useSelector(state=>state.booking)
  useEffect(()=>{
    dispatch(fetchCourseListFollowCategory(categote))    
  },[categote])
  return (
    <div>
        <Header></Header>
        <h1 className='pl-8'>{courseListCategory[0]?.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h1>
        <CourseList></CourseList>
    </div>
  )
}

export default Category
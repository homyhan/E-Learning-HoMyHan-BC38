import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header'
import CourseList from './components/CourseList'
import { fetchCourseList } from './thunk';
import Banner from './Banner';
import Footer from '../../components/Footer';
import { eLearningServ } from '../../services/eServices';
import { AuthService } from '../Auth/services/AuthService';

const HomeBooking = () => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();
  useEffect(() => {    
    dispatch(fetchCourseList(searchParam.get("page")));
  }, [dispatch, searchParam.get("page")]);
  const fetchData = ()=>{
    AuthService.fetchProfile().then(async(res)=>{
      console.log("ok");
      await dispatch({
        type: "LOGIN",
        payload: res.data
    }) 
    }).catch((error)=>{
      console.log("error");
    })
  }
  useEffect(()=>fetchData(),[])
  return (
    <div>
      <Header></Header>
      {/* <h1>Banner</h1> */}
      <Banner></Banner>
      <CourseList></CourseList>
      <Footer></Footer>
    </div>
  )
}

export default HomeBooking
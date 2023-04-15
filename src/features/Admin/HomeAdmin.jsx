import React, { useEffect } from "react";
import Header from "../../components/Header";
import "./HomeAdmin.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCourseList } from "./thunk";
import {MenuOutlined} from "@ant-design/icons";

const HomeAdmin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const [searchParam, setSearchParam] = useSearchParams();
    useEffect(() => {
        dispatch(fetchCourseList(searchParam.get("page")));
      }, [searchParam.get("page")]);
    const url = window.location.href;    
  return (
    <div>
      <Header></Header>
      <div className="content_homeadmin">
        
          <input type="checkbox" name="MenuToggle" id="MenuToggle" />
          <aside className="sidebar">
            <nav>
              <a href="#" className="logo">
                Logo
              </a>
              <div className="nav_items">
                <a className="cursor-pointer" style={url.includes("admin/course")===false? {backgroundColor:'#ffd60a'}:null} onClick={()=>navigate("/admin/user")}>Quản lí người dùng</a>
                <a className="cursor-pointer" style={url.includes("admin/course")===true? {backgroundColor:'#ffd60a'}:null} onClick={()=>navigate("/admin/course")}>Quản lí khóa học</a>
                
              </div>
            </nav>
          </aside>
          <main className="right">
            <label htmlFor="MenuToggle" className="toggle__icon">
              
              <MenuOutlined />
            </label>
            <div className="content">              
              {props.children}
            </div>
          </main>
        </div>
      
    </div>
  );
};

export default HomeAdmin;

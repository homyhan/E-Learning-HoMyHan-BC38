import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Button, Modal, Select } from "antd";
import "./Header.css";
import { eLearningServ } from "../services/eServices";
import { fetchProfile } from "../features/Auth/thunk";
import { AuthService } from "../features/Auth/services/AuthService";

const Header = () => {
  const userLogin = useSelector((state) => state.auth.user);
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    danhMuc: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fetchData = () => {
    eLearningServ
      .getCategory()
      .then((res) => {
        setState({
          ...state,
          danhMuc: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => fetchData(), []);
  const url = window.location.href;
  return (
    <>
      <div className="header">
        <div className="container mx-auto content">
          <div className="left flex">
            <p className="mr-5" onClick={() => navigate("/")}>
              <img
                className="imgLogo cursor-pointer"
                src="https://demo2.cybersoft.edu.vn/logo.png"
                alt=""
              ></img>
            </p>
          </div>
          <div className="right">
            {userLogin ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                {userLogin?.maLoaiNguoiDung === "HV" ? (
                  <p
                    onClick={async () => {
                      await dispatch({
                        type: "COURSE_LIST_MS",
                      });

                      navigate("/course-list");
                    }}
                    className="mr-2 cursor-pointer"
                  >
                    Danh sách khóa học
                  </p>
                ) : null}
                {userLogin?.maLoaiNguoiDung === "GV" ? (
                  <p
                    style={
                      url.includes("admin") === true
                        ? { fontWeight: "bold", color: "#ffd60a" }
                        : null
                    }
                    className="cursor-pointer"
                    onClick={() => navigate("/admin")}
                  >
                    Admin
                  </p>
                ) : null}

                <p className="text-black mr-2 nameuser">
                  Hello {userLogin.hoTen}
                </p>
                <UserOutlined
                  onClick={async() => {
                     await dispatch(fetchProfile)
                    setIsModalOpen(true)
                  }}
                  style={{
                    height: "30px",
                    width: "30px",
                    textAlign: "center",
                    borderRadius: "50%",
                  }}
                  className="text-xl text-black border-solid border-2 border-black mx-2"
                />
                <Modal
                  title="Thông tin cá nhân"
                  open={isModalOpen}
                  footer={null}
                  onCancel={() => setIsModalOpen(false)}
                >
                  <p><b>Tài khoản: </b>{userLogin?.taiKhoan}</p>
                  <p><b>Họ tên: </b>{userLogin?.hoTen}</p>
                  <p><b>Số điện thoại: </b>{userLogin?.soDT}</p>
                  <p><b>Email: </b>{userLogin?.email}</p>
                  <p><b>Khóa học đã đăng kí: </b> {userLogin?.chiTietKhoaHocGhiDanh?.map((item,index)=>{
                    return <span>{item.tenKhoaHoc}, </span>
                  })} </p>
                  
                </Modal>
                <Button
                  onClick={async () => {
                    await dispatch({
                      type: "LOGOUT",
                    });
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Select
                  style={{ width: "200px" }}
                  options={state.danhMuc?.map((item, index) => ({
                    label: (
                      <span
                        onClick={() => {
                          navigate("/danhmuckhoahoc/" + item.maDanhMuc);
                        }}
                      >
                        {item.tenDanhMuc}
                      </span>
                    ),
                    value: item.maDanhMuc,
                  }))}
                  placeholder="DANH MỤC"
                />
                <NavLink className="text-black ml-4" to="/signin">
                  Signin
                </NavLink>
                <NavLink className="text-black ml-4" to="/signup">
                  Signup
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

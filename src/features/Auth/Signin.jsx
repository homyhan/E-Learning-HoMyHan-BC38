import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AuthService } from "./services/AuthService";
import Swal from "sweetalert2";
import { fetchProfile } from "./thunk";

const Signin = () => {
  const [loginInfo, setLoginInfo] = useState({ taiKhoan: "", matKhau: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();    

    await AuthService.login(loginInfo)
      .then(async(res) => {
        await dispatch({
          type: "LOGIN",
          payload: res.data,
        });
        // await dispatch(fetchProfile);
        localStorage.setItem("TOKEN", res.data.accessToken);
        localStorage.setItem("USER_LOGIN", JSON.stringify(res.data));        
        if(res.data.maLoaiNguoiDung==="GV"){
         return navigate ("/admin");
        }else{          
         return navigate("/");
        }
                       
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data,
        });
      });
  };

  return (
    <div className="signin">      
      <div className="login-box">
        <span className="arrow" onClick={() => navigate("/")}>
          <ArrowLeftOutlined />
        </span>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="taiKhoan"
              onChange={handleChange}
              required
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="matKhau"
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>         
          <button type="submit">
            {" "}
            <span />
            <span />
            <span />
            <span />
            Submit
          </button>
        </form>
        <p
          style={{ color: "white", cursor: "pointer", textAlign: "center" }}
          onClick={() => navigate("/signup")}
        >
          Signup?
        </p>
      </div>
    </div>
  );
};

export default Signin;

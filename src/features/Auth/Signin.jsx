import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Signin.css";
import { login } from "./thunk";

const Signin = () => {
  const [loginInfo, setLoginInfo] = useState({ taiKhoan: "", matKhau: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(loginInfo);
    if (
      loginInfo.taiKhoan === "" ||
      loginInfo.matKhau === "" ||
      loginInfo.taiKhoan.trim() == "" ||
      loginInfo.matKhau.trim() == ""
    ) {
      return alert("Vui long nhap day du thong tin");
    } else {
      await dispatch(login(loginInfo));
      // checkAdmin();
      if (user?.maLoaiNguoiDung === "QuanTri") {
        return navigate("/admin");
      } else {
        return navigate("/");
      }
    }
  };

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tai khoan</label> <br />
          <input name="taiKhoan" onChange={handleChange} placeholder="tai khoan"></input>
        </div>
        <div>
          <label>Password</label> <br />
          <input name="matKhau" onChange={handleChange} placeholder="mat khau"></input>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Signin;

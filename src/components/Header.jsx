import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UserOutlined } from "@ant-design/icons";
import { clsx } from "clsx";
import { Button } from "antd";
import './Header.css';

const Header = () => {
  const userLogin = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <div className='header'>
      <div className='container mx-auto content'>
        <div className='left'>
          <p>Cyberlearning</p>
        </div>
        <div className='right'>
        {userLogin ? (
            <div style={{ display: "flex", alignItems:'center' }}>
              <p className="text-white mr-2 nameuser">Hello {userLogin.hoTen}</p>
              <UserOutlined
                style={{
                  height: "30px",
                  width: "30px",
                  textAlign: "center",
                  borderRadius: "50%",
                }}
                className="text-xl text-white border-solid border-2 border-white mx-2"
              />
              <Button
                onClick={()=>dispatch({
                  type: "LOGOUT"
                })}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <NavLink
                className={(params) => {
                  const classes = " mr-5 font-semibold auth";
                  if (params.isActive) {
                    return clsx("text-yellow-300 ", classes);
                  }
                  return clsx("text-white", classes);
                }}
                to="/signin"
              >
                Signin
              </NavLink>
              <NavLink
                className={(params) => {
                  const classes = " mr-5 font-semibold auth";
                  if (params.isActive) {
                    return clsx("text-yellow-300", classes);
                  }
                  return clsx("text-white", classes);
                }}
                to="/signup"
              >
                Signup
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
  Router,
} from "react-router-dom";

import HomeBooking from "./features/Booking/HomeBooking";
import RouteComponent from "./HOCs/RouteComponent";
import Signin from "./features/Auth/Signin";
import Category from "./features/Booking/components/Category";
import Detail from "./features/Booking/Detail";
import Signup from "./features/Auth/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "./features/Auth/thunk";
import CourseListMySefl from "./features/Booking/CourseListMySefl";
import User from "./features/Admin/User";

import Course from "./features/Admin/Course";

function App() {
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.auth);
    
  useEffect(() => {
    dispatch(fetchProfile);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<RouteComponent Component={HomeBooking} />}
        ></Route>
        <Route
          path="/signin"
          element={
            <RouteComponent Component={Signin} isAuth={true} redirectPath="/" />
          }
        ></Route>
        <Route
          path="/signup"
          element={<RouteComponent Component={Signup} />}
        ></Route>
        <Route
          path="/course-list"
          element={<RouteComponent Component={CourseListMySefl} />}
        ></Route>
        <Route
          path="/danhmuckhoahoc/:id"
          element={<RouteComponent Component={Category} />}
        ></Route>
        <Route
          path="/detail/:id"
          element={<RouteComponent Component={Detail} />}
        ></Route>
        <Route
          path="/admin"
          element={
            <RouteComponent
              Component={User}
              isAdmin={true}
              redirectPath="/signin"
            />
          }
        ></Route>

        <Route
          path="/admin/user"
          element={
            <RouteComponent
              Component={User}
              isAdmin={true}
              redirectPath="/signin"
            />
          }
        ></Route>
        <Route
          path="/admin/user:page"
          element={
            <RouteComponent
              Component={User}
              isAdmin={true}
              redirectPath="/signin"
            />
          }
        ></Route>
        <Route
          path="/admin/course"
          element={
            <RouteComponent
              Component={Course}
              isAdmin={true}
              redirectPath="/signin"
            />
          }
        ></Route>
        <Route
          path="/admin/course:page"
          element={
            <RouteComponent
              Component={Course}
              isAdmin={true}
              redirectPath="/signin"
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

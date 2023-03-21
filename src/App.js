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
import { createBrowserHistory } from "history";
import HomeBooking from './features/Booking/HomeBooking';
import RouteComponent from "./HOCs/RouteComponent";
import Signin from "./features/Auth/Signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouteComponent Component={HomeBooking} />}></Route>
        <Route path="/signin" element={<RouteComponent Component={Signin} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

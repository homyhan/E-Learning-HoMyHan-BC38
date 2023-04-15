import React, { useEffect, useState } from "react";
import "./Footer.css";
import { eLearningServ } from "../services/eServices";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    danhMuc: [],
  });
  const fetchData = () => {
    eLearningServ
      .getCategory()
      .then((res) => {
        // console.log(res.data);
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
  return (
    <footer>
      <div className="itemFooter">
        <h3>About</h3>
        <p>
          Trở thành hệ thống đào tạo lập trình chuyên sâu theo nghề hàng đầu khu
          vực, cung cấp nhân lực có tay nghề cao, chuyên môn sâu cho sự phát
          triển công nghiệp phần mềm trong thời đại công nghệ số hiện nay. Đóng
          góp cho sự phát triển của xã hội, đưa Việt Nam thành cường quốc về
          phát triển phần mềm và nhân sự lành nghề chất lượng cao cho thế giới
        </p>
      </div>
      <div className="itemFooter">
        <h3>Category</h3>
        {state?.danhMuc?.map((item,index)=>{
          return <p key={item.maDanhMuc} onClick={()=>{
            navigate("/danhmuckhoahoc/" + item.maDanhMuc);
          }}>{item.tenDanhMuc}</p>
        })}
      </div>
    </footer>
  );
};

export default Footer;

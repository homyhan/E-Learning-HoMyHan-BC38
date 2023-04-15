import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "antd";
import {
  CheckCircleOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Header from "../../components/Header";
import "./Detail.css";
import Swal from "sweetalert2";
import { fetchDetailCourse, register } from "./thunk";
import { eLearningServ } from "../../services/eServices";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCourse } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const courseId = params.id;
  useEffect(() => {
    // console.log(courseId);
    dispatch(fetchDetailCourse(courseId));
  }, []);
  const registerCourse = (thamSo) => {
    eLearningServ
      .registerCourse(thamSo)
      .then(async (res) => {
        // await dispatch(fetchCourseList(searchParam.get("page")));
        // await dispatch()
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register success",
          showConfirmButton: false,
          timer: 1500,
        });
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
    <div>
      <Header></Header>
      <div className="intro_info">
        <h1 className="text-3xl font-bold mb-1">Course Infomation</h1>
        <i>
          Great programmers don’t write bug-free software, they write software
          works correctly despite bugs!!!
        </i>
      </div>
      <div className="detail_main container mx-auto mt-16">
        <div className="left">
          <h1 className="text-3xl font-bold mb-7">
            {selectedCourse?.tenKhoaHoc}
          </h1>
          <div className="member_join">
            <div className="flex items-center">
              <img src="https://nofiredrills.com/wp-content/uploads/2016/10/myavatar.png"></img>
              <p className="ml-2">
                Giảng viên: <br /> {selectedCourse?.nguoiTao?.hoTen}
              </p>
            </div>
            <div className="flex items-center">
              <i className="fa fa-graduation-cap"></i>
              <p className="ml-2">
                Lĩnh vực: <br />{" "}
                {selectedCourse?.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
              </p>
            </div>
            <div className="flex items-center">
              <i className="fa fa-eye"></i>
              <p className="ml-2">{selectedCourse?.luotXem} Lượt xem</p>
            </div>
          </div>

          <p className="intro_khoahoc">
            {/* React.js là thư viện JavaScript phổ biến nhất mà bạn có thể sử dụng
            và tìm hiểu ngày nay để xây dựng giao diện người dùng hiện đại, phản
            ứng cho web.Khóa học này dạy bạn về React chuyên sâu, từ cơ bản,
            từng bước đi sâu vào tất cả các kiến ​​thức cơ bản cốt lõi, khám phá
            rất nhiều ví dụ và cũng giới thiệu cho bạn các khái niệm nâng
            cao.Bạn sẽ nhận được tất cả lý thuyết, hàng tấn ví dụ và bản trình
            diễn, bài tập và bài tập cũng như vô số kiến ​​thức quan trọng bị
            hầu hết các nguồn khác bỏ qua - sau cùng, có một lý do tại sao khóa
            học này lại rất lớn! Và trong trường hợp bạn thậm chí không biết tại
            sao bạn lại muốn học React và bạn chỉ ở đây vì một số quảng cáo hoặc
            "thuật toán" - đừng lo lắng: ReactJS là một công nghệ quan trọng với
            tư cách là một nhà phát triển web và trong khóa học này, tôi sẽ cũng
            giải thích TẠI SAO điều đó lại quan trọng! */}
            {selectedCourse?.moTa}
          </p>
          <div className="will_study">
            <h2>Những gì bạn sẽ học</h2>
            <div className="content">
              <div className="left">
                <div className="item">
                  <CheckCircleOutlined className="iconCheck" />
                  <span>
                    Xây dựng các ứng dụng web mạnh mẽ, nhanh chóng, thân thiện
                    với người dùng và phản ứng nhanh
                  </span>
                </div>
                <div className="item">
                  <CheckCircleOutlined className="iconCheck" />
                  <span>
                    Xây dựng các ứng dụng web mạnh mẽ, nhanh chóng, thân thiện
                    với người dùng và phản ứng nhanh
                  </span>
                </div>
                <div className="item">
                  <CheckCircleOutlined className="iconCheck" />
                  <span>
                    Xây dựng các ứng dụng web mạnh mẽ, nhanh chóng, thân thiện
                    với người dùng và phản ứng nhanh
                  </span>
                </div>
                <div className="item">
                  <CheckCircleOutlined className="iconCheck" />
                  <span>
                    Xây dựng các ứng dụng web mạnh mẽ, nhanh chóng, thân thiện
                    với người dùng và phản ứng nhanh
                  </span>
                </div>
              </div>
              <div className="right_content">
                <div className="item">
                  <CheckCircleOutlined className="iconCheck" />
                  <span>
                    Xây dựng các ứng dụng web mạnh mẽ, nhanh chóng, thân thiện
                    với người dùng và phản ứng nhanh
                  </span>
                </div>
                <div className="item">
                  <CheckCircleOutlined className="iconCheck" />
                  <span>
                    Xây dựng các ứng dụng web mạnh mẽ, nhanh chóng, thân thiện
                    với người dùng và phản ứng nhanh
                  </span>
                </div>
                <div className="item">
                  <CheckCircleOutlined className="iconCheck" />
                  <span>
                    Xây dựng các ứng dụng web mạnh mẽ, nhanh chóng, thân thiện
                    với người dùng và phản ứng nhanh
                  </span>
                </div>
                <div className="item">
                  <CheckCircleOutlined className="iconCheck" />
                  <span>
                    Xây dựng các ứng dụng web mạnh mẽ, nhanh chóng, thân thiện
                    với người dùng và phản ứng nhanh
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="content_course">
            <h2>Nội dung khóa học</h2>
            <div>
              <Card type="inner" title="MỤC 1: GIỚI THIỆU">
                <div className="item">
                  <p>
                    <PlayCircleOutlined /> Các khái niệm về React Component
                  </p>
                  <p>
                    <ClockCircleOutlined /> 20:20
                  </p>
                </div>
                <div className="item">
                  <p>
                    <PlayCircleOutlined /> Thiết lập môi trường cho Windows
                  </p>
                  <p>
                    <ClockCircleOutlined /> 20:20
                  </p>
                </div>
                <div className="item">
                  <p>
                    <PlayCircleOutlined /> Tạo ứng dụng React - React-Scripts
                  </p>
                  <p>
                    <ClockCircleOutlined /> 20:20
                  </p>
                </div>
                <div className="item">
                  <p>
                    <PlayCircleOutlined /> Ghi chú nhanh về dấu ngoặc kép cho
                    string interpolation
                  </p>
                  <p>
                    <ClockCircleOutlined /> 20:20
                  </p>
                </div>
              </Card>
              <Card
                type="inner"
                title="MỤC 2: KIẾN THỨC CƠ BẢN"
                style={{
                  marginTop: 16,
                }}
              >
                <div className="item">
                  <p>
                    <PlayCircleOutlined /> Trang chủ và thành phần thư mục
                  </p>
                  <p>
                    <ClockCircleOutlined /> 20:20
                  </p>
                </div>
                <div className="item">
                  <p>
                    <PlayCircleOutlined /> Hướng dẫn khóa học + Liên kết Github
                  </p>
                  <p>
                    <ClockCircleOutlined /> 20:20
                  </p>
                </div>
                <div className="item">
                  <p>
                    <PlayCircleOutlined /> Trang chủ thương mại điện tử + thiết
                    lập SASS
                  </p>
                  <p>
                    <ClockCircleOutlined /> 20:20
                  </p>
                </div>
                <div className="item">
                  <p>
                    <PlayCircleOutlined /> Tệp CSS và SCSS
                  </p>
                  <p>
                    <ClockCircleOutlined /> 20:20
                  </p>
                </div>
                <div className="item">
                  <p>
                    <PlayCircleOutlined /> React 17: Cập nhật các gói + Phiên
                    bản React mới nhất
                  </p>
                  <p>
                    <ClockCircleOutlined /> 20:20
                  </p>
                </div>
              </Card>

              <Card
                type="inner"
                title="MỤC 3: KIẾN THỨC CHUYÊN SÂU"
                style={{
                  marginTop: 16,
                }}
              >
                <div className="item">
                  <p>
                    <PlayCircleOutlined /> connect() and mapStateToProps
                  </p>
                  <p>
                    <ClockCircleOutlined /> 20:20
                  </p>
                </div>
                <div className="item">
                  <p>
                    <PlayCircleOutlined /> Trạng thái thư mục vào Redux
                  </p>
                  <p>
                    <ClockCircleOutlined /> 20:20
                  </p>
                </div>
                <div className="item">
                  <p>
                    <PlayCircleOutlined /> Thành phần Tổng quan về Bộ sưu tập
                  </p>
                  <p>
                    <ClockCircleOutlined /> 20:20
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="right right_price">
          <img src={selectedCourse?.hinhAnh}></img>
          <p className="price">
            <i className="fa fa-bolt"></i> 500.000 VND
          </p>
          <Button
            className="btn_register"
            onClick={() => {
              if (user) {
                // alert("Da dang nhap")
                const maKhoaHocItem = user?.chiTietKhoaHocGhiDanh?.filter(
                  (item) => {
                    return item.maKhoaHoc === courseId;
                  }
                );

                const infoRegister = {};
                infoRegister.maKhoaHoc = selectedCourse?.maKhoaHoc;
                infoRegister.taiKhoan = user?.taiKhoan;
                // dispatch(register(infoRegister))
                registerCourse(infoRegister);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Please login before booking",
                }).then(function () {
                  navigate("/signin");
                });
              }
            }}
          >
            Đăng kí
          </Button>
          <div className="info_item">
            <p>
              Ghi danh:{" "}
              <span className="font-bold">
                {selectedCourse?.soLuongHocVien} học viên
              </span>
            </p>
            <i className="fa fa-user-graduate"></i>
          </div>
          <div className="info_item">
            <p>
              Thời gian: <span className="font-bold">18 giờ</span>
            </p>
            <i className="fa fa-clock"></i>
          </div>
          <div className="info_item">
            <p>
              Bài học: <span className="font-bold">10</span>{" "}
            </p>
            <i className="fa fa-book"></i>
          </div>
          <div className="info_item">
            <p>
              Video: <span className="font-bold">14</span>{" "}
            </p>
            <i className="fa fa-book"></i>
          </div>
          <div className="info_item">
            <p>
              Trình độ: <span className="font-bold">Người mới bắt đầu</span>{" "}
            </p>
            <i className="fab fa-buffer"></i>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Detail;

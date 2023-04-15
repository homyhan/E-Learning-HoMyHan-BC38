import React, { useState } from "react";
import { Button, Card, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourse, fetchDetailCourse } from "../thunk";
import "./CourseItem.css";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CourseItem = (props) => {
  const dispatch = useDispatch();
  const { selectedCourse } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.id;
  const url = window.location.href;
  return (
    <Card
      className="cardItemCourse"
      hoverable
      cover={
        <div className="cardItem">
          <img
            style={{ width: "100%", height: "150px", objectFit: "cover" }}
            alt="example"
            src={props.item.hinhAnh}
          />
          {url.includes("course-list") ? null : (
            <p>{props.item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
          )}
          <div className="ribbon ribbon-top-left">
            <span>HOT</span>
          </div>
        </div>
      }
    >
      <div>
        <h1 className="text-xl font-bold mb-3">{props.item.tenKhoaHoc}</h1>
      </div>
      {url.includes("course-list") ? (
        <Button
          onClick={() => {
            const infoItem = {};
            infoItem.maKhoaHoc = props.item.maKhoaHoc;
            infoItem.taiKhoan = user?.taiKhoan;
            console.log(infoItem);
            Swal.fire({
              title: "Are you sure?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then(async(result) => {
              if (result.isConfirmed) {
               await dispatch(deleteCourse(infoItem));
               await dispatch(fetchDetailCourse(courseId));
                await dispatch(fetchDetailCourse(props.item.maKhoaHoc));
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
              }
            });
          }}
        >
          Hủy
        </Button>
      ) : (
        <div>
          <Button
            className="mr-3"
            onClick={() => {
              setOpen(true);
              dispatch(fetchDetailCourse(props.item.maKhoaHoc));
            }}
          >
            Detail
          </Button>
          <Modal
            title="Detail"
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={null}
            className="modalDetail"
          >
            <div className="grid grid-cols-5 px-3 gap-4">
              <div className="col-span-2">
                <img
                  style={{ width: "100%" }}
                  src={selectedCourse?.hinhAnh}
                  alt=""
                ></img>
              </div>
              <div className="col-span-3">
                <h1 className="font-bold text-2xl mb-4">
                  {selectedCourse?.tenKhoaHoc}
                </h1>
                <p className="mb-8">{selectedCourse?.moTa}</p>
                <div className="flex">
                  <p className="mr-8 text-xl">
                    <i className="fa fa-eye"></i> {selectedCourse?.luotXem}
                  </p>
                  <p className="text-xl">
                    <i className="fa fa-user-tie"></i>{" "}
                    {selectedCourse?.nguoiTao?.hoTen}
                  </p>
                </div>
              </div>
            </div>
          </Modal>
          <Button
            onClick={() => {
              navigate("/detail/" + props.item.maKhoaHoc);
            }}
          >
            Booking
          </Button>
        </div>
      )}
    </Card>
  );
};

export default CourseItem;

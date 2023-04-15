import React, { useEffect } from "react";
import { useState } from "react";
import HomeAdmin from "./HomeAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseList,
  fetchGhiDanhKhoaHoc,
  fetchHocVienChoXetDuyet,
  fetchHocVienDaThamGia,
  fetchHuyGhiDanh,
  fetchNguoiDungChuaGhiDanh,
} from "./thunk";
import { useSearchParams } from "react-router-dom";
import { Button, Pagination, Modal, Select, DatePicker } from "antd";
import Swal from "sweetalert2";
import { adminServ } from "./services/adminServices";
import "./Course.css";
import { eLearningServ } from "../../services/eServices";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

const Course = () => {
  const dispatch = useDispatch();
  const {
    courseList,
    nguoiDungChuaGhiDanh,
    hocVienChoXetDuyet,
    hocVienDaThamGiaKhoaHoc,
    selectedCourse,
  } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth);
  const [searchParam, setSearchParam] = useSearchParams();
  const [open, setOpen] = useState(false);

  const [state, setState] = useState({
    taiKhoan: "",
    maKhoaHocChuaGhiDanh: "",
    errorDeleteCourse2: "",
    danhMuc: [],
  });
  const accountUser = user?.taiKhoan;
  const [imgSrc, setImgSrc] = useState("");

  const formik = useFormik({
    initialValues: {
      maKhoaHoc: "",
      biDanh: "okok",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0,
      danhGia: 0,
      taiKhoanNguoiTao: user?.taiKhoan,
      hinhAnh: {},
      maNhom: "GP01",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
    },
    validationSchema: Yup.object().shape({
      maKhoaHoc: Yup.string()
        .trim()
        .required("Required")
        .matches(/([A-z]\S)+/g, "Id mustn't whitespace"),
      biDanh: Yup.string().trim().required("Required"),
      tenKhoaHoc: Yup.string()
        .required("Required")
        .matches(
          /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g,
          "Error Course Name"
        ),
      moTa: Yup.string().required("Required"),
      luotXem: Yup.number()
        .required("Required")
        .min(0, "Lượt xem phải lớn hơn hoặc bằng 0"),
      danhGia: Yup.number()
        .required("Required")
        .min(0, "Đánh giá phải lớn hơn hoặc bằng 0"),
      hinhAnh: Yup.mixed()
        .required("Required")
        .test(
          "FILE_TYPE",
          "Invalid",
          (value) =>
            value &&
            ["image/png", "image/jpeg", "image/png"].includes(value.type)
        ),
      ngayTao: Yup.string().required("Required"),
      maDanhMucKhoaHoc: Yup.string().required("Required"),
    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, helpers) => {
      values.taiKhoanNguoiTao = user?.taiKhoan;
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      await adminServ
        .addCourse(formData)
        .then(async (res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added",
            showConfirmButton: false,
            timer: 1500,
          });
          setModal1Open(false);
          helpers.resetForm({
            values,
          });
          await dispatch(fetchCourseList(searchParam.get("page")));
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data,
          });
        });      
    },
  });

  const [imgSrcEdit, setImgSrcEdit] = useState("");

  const formikEdit = useFormik({
    enableReinitialize: true,
    initialValues: {
      maKhoaHoc: selectedCourse?.maKhoaHoc,
      biDanh: "okok",
      tenKhoaHoc: selectedCourse?.tenKhoaHoc,
      moTa: selectedCourse?.moTa,
      luotXem: selectedCourse?.luotXem,
      taiKhoanNguoiTao: user?.taiKhoan,
      hinhAnh: null,
      maNhom: "GP01",
      ngayTao: selectedCourse?.ngayTao,
      maDanhMucKhoaHoc: selectedCourse?.danhMucKhoaHoc?.maDanhMucKhoahoc,
      danhGia: 0,
    },
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      await adminServ
        .updateCourse(formData)
        .then(async (res) => {
          await dispatch(fetchCourseList(searchParam.get("page")));
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Updated",
            showConfirmButton: false,
            timer: 1500,
          });
          setModalEdit(false);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data,
          });
        });      
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayTao = dayjs(value).format("DD/MM/YYYY");    
    return formik.setFieldValue("ngayTao", ngayTao);
  };

  const handleChangeDatePickerEdit = (value) => {
    let ngayTao = dayjs(value).format("DD/MM/YYYY");    
    return formikEdit.setFieldValue("ngayTao", ngayTao);
  };

  const handleChangeDanhMuc = (values) => {
    formikEdit.setFieldValue("maDanhMucKhoaHoc", values);
  };

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

  const handleChangeUser = (values) => {
    setState({
      ...state,
      taiKhoan: values,
    });
    console.log(state.taiKhoan);
  };

  const deleteKhoaHoc2 = (thamSo) => {
    adminServ
      .deleteKhoaHoc(thamSo)
      .then(async (res) => {
        await dispatch(fetchCourseList(searchParam.get("page")));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
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
  const handleChangeFile = (evt) => {
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      setImgSrc(evt.target.result);      
    };
    return formik.setFieldValue("hinhAnh", file);
  };

  const handleChangeFileEdit = async (evt) => {
    let file = evt.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formikEdit.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (evt) => {
        setImgSrcEdit(evt.target.result);
        console.log(evt.target.result);
      };
      return formikEdit.setFieldValue("hinhAnh", file);
    }
  };
  const [modal1Open, setModal1Open] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  return (
    <HomeAdmin>
      <div className="text-right">
        <Button onClick={() => setModal1Open(true)}>Thêm khóa học</Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã khóa học</th>
            <th>Tên khóa học</th>
            <th>Hình ảnh</th>
            <th>Lượt xem</th>
            <th>Người tạo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courseList?.items?.map((item, index) => {
            return (
              <tr key={item.maKhoaHoc}>
                <td>{index + 1}</td>
                <td>{item.maKhoaHoc}</td>
                <td>{item.tenKhoaHoc}</td>
                <td>
                  <img
                    style={{
                      width: "150px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    src={item.hinhAnh}
                  ></img>
                </td>
                <td>{item.luotXem}</td>
                <td>{item.nguoiTao.hoTen}</td>
                <td>
                  <Button
                    onClick={async () => {
                      setOpen(true);
                      setState({
                        ...state,
                        maKhoaHocChuaGhiDanh: item.maKhoaHoc,
                      });
                      const objMaKhoaHoc = {};
                      objMaKhoaHoc.MaKhoaHoc = item.maKhoaHoc;
                      await dispatch(fetchNguoiDungChuaGhiDanh(objMaKhoaHoc));
                      await dispatch(fetchHocVienChoXetDuyet(objMaKhoaHoc));
                      await dispatch(fetchHocVienDaThamGia(objMaKhoaHoc));
                    }}
                  >
                    Ghi danh
                  </Button>
                  <Button
                    onClick={() => {
                      setModalEdit(true);
                      dispatch({
                        type: "SELECTED_COURSE",
                        payload: item,
                      });                      
                    }}
                  >
                    Sửa
                  </Button>
                  <Button
                    onClick={async () => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          await deleteKhoaHoc2(item.maKhoaHoc);
                        }
                      });
                    }}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        current={
          searchParam.get("page") === null ? 1 : Number(searchParam.get("page"))
        }
        className="p-6 text-center text-white "
        pageSize={10}
        total={courseList.totalCount}
        onChange={(page, pageSize) => {
          console.log(page, searchParam);
          setSearchParam({ page });
        }}
      />
      <Modal
        title="Ghi danh"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        width={1000}
      >
        <div className="itemGhiDanh">
          <p>Chọn người dùng</p>
          <Select
            style={{
              width: 500,
            }}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            onChange={handleChangeUser}
            options={nguoiDungChuaGhiDanh?.map((item, index) => ({
              label: item.hoTen,
              value: item.taiKhoan,
            }))}
          />
          <Button
            onClick={async () => {
              const objToGhiDanh = {};
              objToGhiDanh.maKhoaHoc = state.maKhoaHocChuaGhiDanh;
              objToGhiDanh.taiKhoan = state.taiKhoan;
              const objMaKhoaHoc = {};
              objMaKhoaHoc.MaKhoaHoc = state.maKhoaHocChuaGhiDanh;
              await dispatch(fetchGhiDanhKhoaHoc(objToGhiDanh));
              await dispatch(fetchHocVienDaThamGia(objMaKhoaHoc));
              await dispatch(fetchNguoiDungChuaGhiDanh(objMaKhoaHoc));
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Đã ghi danh",
                showConfirmButton: false,
                timer: 1500,
              });
            }}
          >
            Ghi danh
          </Button>
        </div>
        <div>
          <h3>Học viên chờ xác thực</h3>
          <table className="tableModal">
            <thead>
              <tr>
                <td>STT</td>
                <td>Tài khoản</td>
                <td>Tên học viên</td>
                <td>Chờ xác thực</td>
              </tr>
            </thead>
            <tbody>
              {hocVienChoXetDuyet?.map((item, index) => {
                return (
                  <tr key={item.taiKhoan}>
                    <td>{index + 1}</td>
                    <td>{item.taiKhoan}</td>
                    <td>{item.hoTen}</td>
                    <td>
                      <Button
                        onClick={async () => {
                          const objToGhiDanh = {};
                          objToGhiDanh.maKhoaHoc = state.maKhoaHocChuaGhiDanh;
                          objToGhiDanh.taiKhoan = item.taiKhoan;
                          const objMaKhoaHoc = {};
                          objMaKhoaHoc.MaKhoaHoc = state.maKhoaHocChuaGhiDanh;
                          await dispatch(fetchGhiDanhKhoaHoc(objToGhiDanh));
                          await dispatch(fetchHocVienChoXetDuyet(objMaKhoaHoc));
                          await dispatch(fetchHocVienDaThamGia(objMaKhoaHoc));
                          Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Xác thực thành công",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                        }}
                      >
                        Xác thực
                      </Button>
                      <Button
                        onClick={async () => {
                          const objToGhiDanh = {};
                          objToGhiDanh.maKhoaHoc = state.maKhoaHocChuaGhiDanh;
                          objToGhiDanh.taiKhoan = item.taiKhoan;
                          const objMaKhoaHoc = {};
                          objMaKhoaHoc.MaKhoaHoc = state.maKhoaHocChuaGhiDanh;
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              await dispatch(fetchHuyGhiDanh(objToGhiDanh));
                              await dispatch(
                                fetchNguoiDungChuaGhiDanh(objMaKhoaHoc)
                              );
                              await dispatch(
                                fetchHocVienChoXetDuyet(objMaKhoaHoc)
                              );
                              Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Your work has been saved",
                                showConfirmButton: false,
                                timer: 1500,
                              });
                            }
                          });
                        }}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <h3>Khóa học ghi danh</h3>
          <table className="tableModal">
            <thead>
              <tr>
                <td>STT</td>
                <td>Tài khoản</td>
                <td>Tên học viên</td>
                <td>Chờ xác thực</td>
              </tr>
            </thead>
            <tbody>
              {hocVienDaThamGiaKhoaHoc?.map((item, index) => {
                return (
                  <tr key={item.maKhoaHoc}>
                    <td>{index + 1}</td>
                    <td>{item.taiKhoan}</td>
                    <td>{item.hoTen}</td>
                    <td>
                      <Button
                        onClick={async () => {
                          const objToGhiDanh = {};
                          objToGhiDanh.maKhoaHoc = state.maKhoaHocChuaGhiDanh;
                          objToGhiDanh.taiKhoan = item.taiKhoan;
                          const objMaKhoaHoc = {};
                          objMaKhoaHoc.MaKhoaHoc = state.maKhoaHocChuaGhiDanh;
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              await dispatch(fetchHuyGhiDanh(objToGhiDanh));
                              await dispatch(
                                fetchNguoiDungChuaGhiDanh(objMaKhoaHoc)
                              );
                              await dispatch(
                                fetchHocVienDaThamGia(objMaKhoaHoc)
                              );
                              Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Your work has been saved",
                                showConfirmButton: false,
                                timer: 1500,
                              });
                            }
                          });
                        }}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal>

      {/* MODAL ADD COURSE  */}
      <Modal
        title="Thêm khóa học"
        style={{
          top: 20,
        }}
        width={1000}
        open={modal1Open}
        footer={null}
        onCancel={() => {
          setModal1Open(false);
          formik.resetForm();
        }}
      >
        <div className="container addCourse">
          <div className="title">
            <h2>Product Order Form</h2>
          </div>
          <div className="d-flex">
            <form onSubmit={formik.handleSubmit} action method>
              <label>
                <span className="fname">
                  Mã khóa học <span className="required">*</span>
                </span>
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                name="maKhoaHoc"
              />
              {formik.touched.maKhoaHoc && formik.errors.maKhoaHoc ? (
                <p className="text-red-600 font-bold errNotify">
                  {formik.errors.maKhoaHoc}
                </p>
              ) : null}

              <label>
                <span className="lname">
                  Tên khóa học <span className="required">*</span>
                </span>
                <input
                  type="text"
                  name="tenKhoaHoc"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.tenKhoaHoc && formik.errors.tenKhoaHoc ? (
                  <p className="text-red-600 font-bold errNotify">
                    {formik.errors.tenKhoaHoc}
                  </p>
                ) : null}
              </label>
              <label>
                <span>
                  Danh mục khóa học <span className="required">*</span>
                </span>
                <select
                  placeholder="Danh mục khóa học"
                  name="maDanhMucKhoaHoc"
                  onChange={formik.handleChange}
                  onBlur={() => formik.setFieldTouched("select", true)}
                >
                  {state?.danhMuc?.map((item, index) => {
                    return (
                      <option value={item.maDanhMuc} key={item.maDanhMuc}>
                        {item.tenDanhMuc}
                      </option>
                    );
                  })}
                </select>
                {formik.touched.maDanhMucKhoaHoc &&
                formik.errors.maDanhMucKhoaHoc ? (
                  <p className="text-red-600 font-bold errNotify">
                    {formik.errors.maDanhMucKhoaHoc}
                  </p>
                ) : null}
              </label>
              <label className="labelNgayTao">
                <span>Ngày tạo</span>
                <DatePicker
                  format={dateFormatList}
                  onChange={handleChangeDatePicker}
                  onBlur={() => formik.setFieldTouched("date", true)}
                />
                {formik.touched.ngayTao && formik.errors.ngayTao ? (
                  <p className="text-red-600 font-bold errNotify">
                    {formik.errors.ngayTao}
                  </p>
                ) : null}
              </label>

              <label>
                <span>
                  Đánh giá <span className="required">*</span>
                </span>
                <input
                  type="text"
                  name="danhGia"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.danhGia && formik.errors.danhGia ? (
                  <p className="text-red-600 font-bold errNotify">
                    {formik.errors.danhGia}
                  </p>
                ) : null}
              </label>

              <label>
                <span>
                  Lượt xem <span className="required">*</span>
                </span>
                <input
                  onChange={formik.handleChange}
                  type="text"
                  name="luotXem"
                  onBlur={formik.handleBlur}
                />
                {formik.touched.luotXem && formik.errors.luotXem ? (
                  <p className="text-red-600 font-bold errNotify">
                    {formik.errors.luotXem}
                  </p>
                ) : null}
              </label>

              <label>
                <span>
                  Mô tả <span className="required">*</span>
                </span>
                <textarea
                  style={{ width: "70%", padding: "10px 20px" }}
                  rows="6"
                  type="text"
                  name="moTa"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.moTa && formik.errors.moTa ? (
                  <p className="text-red-600 font-bold errNotify">
                    {formik.errors.moTa}
                  </p>
                ) : null}
              </label>
              <label>
                <span>Hình ảnh</span>
                <input
                  onChange={handleChangeFile}
                  className="bg-white"
                  type="file"
                ></input>
                {formik.touched.hinhAnh && formik.errors.hinhAnh ? (
                  <p className="text-red-600 font-bold errNotify">
                    {formik.errors.hinhAnh}
                  </p>
                ) : null}
              </label>
              <button
                style={{
                  color: "black",
                  background:
                    "linear-gradient(to bottom right, #5195A8 0%, #70EAFF 100%)",
                }}
                type="submit"
              >
                Submit
              </button>
            </form>
            <div className="Yorder">
              <img
                style={{ width: "100%", objectFit: "cover" }}
                src={imgSrc}
                alt="Image"
              ></img>
            </div>
          </div>
        </div>
      </Modal>

      {/* MODAL EDIT COURSE  */}
      <Modal
        title="Edit Course"
        style={{
          top: 20,
        }}
        width={1000}
        open={modalEdit}
        footer={null}
        onCancel={() => setModalEdit(false)}
      >
        <div className="container addCourse">
          <div className="title">
            <h2>Edit Course</h2>
          </div>
          <div className="d-flex">
            <form onSubmit={formikEdit.handleSubmit} action method>
              <label>
                <span className="fname">
                  Mã khóa học <span className="required">*</span>
                </span>
                <input
                  onChange={formikEdit.handleChange}
                  type="text"
                  name="maKhoaHoc"
                  value={formikEdit.values.maKhoaHoc}
                  disabled={true}
                  style={{ color: "red", cursor:'not-allowed', backgroundColor:'#8080803b' }}
                />
              </label>
              <label>
                <span className="lname">
                  Tên khóa học <span className="required">*</span>
                </span>
                <input
                  type="text"
                  name="tenKhoaHoc"
                  onChange={formikEdit.handleChange}
                  value={formikEdit.values.tenKhoaHoc}
                />
              </label>
              <label>
                <span>
                  Danh mục khóa học <span className="required">*</span>
                </span>
                <Select
                  style={{ width: "100%" }}
                  options={state?.danhMuc?.map((item, index) => {
                    return {
                      label: item.tenDanhMuc,
                      value: item.maDanhMuc,
                    };
                  })}
                  onChange={handleChangeDanhMuc}
                  value={formikEdit.values.maDanhMucKhoaHoc}
                />
              </label>
              <label>
                <span>Ngày tạo</span>
                <DatePicker
                  format="DD/MM/YYYY"
                  onBlur={() => formikEdit.setFieldTouched("date", true)}
                  onChange={handleChangeDatePickerEdit}
                  value={dayjs(formikEdit.values.ngayTao, "DD/MM/YYYY")}
                />
              </label>
              <label className="luotXemEdit">
                <span>
                  Lượt xem <span className="required">*</span>
                </span>
                <input
                  onChange={formikEdit.handleChange}
                  type="text"
                  name="luotXem"
                  value={formikEdit.values.luotXem}
                />
              </label>

              <label>
                <span>
                  Mô tả <span className="required">*</span>
                </span>
                <textarea
                  style={{ width: "70%", padding: "10px 20px" }}
                  rows="6"
                  type="text"
                  name="moTa"
                  required
                  onChange={formikEdit.handleChange}
                  value={formikEdit.values.moTa}
                />
              </label>
              <label>
                <span>Hình ảnh</span>
                <input
                  onChange={handleChangeFileEdit}
                  className="bg-white"
                  type="file"
                ></input>
              </label>
              <button
                style={{
                  color: "black",
                  background:
                    "linear-gradient(to bottom right, #5195A8 0%, #70EAFF 100%)",
                }}
                type="submit"
              >
                Submit
              </button>
            </form>
            <div className="Yorder">
              <img
                style={{ width: "100%", objectFit: "cover" }}
                src={imgSrcEdit === "" ? selectedCourse?.hinhAnh : imgSrcEdit}
                alt="Image"
              ></img>
            </div>
          </div>
        </div>
      </Modal>
    </HomeAdmin>
  );
};

export default Course;

import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { AuthService } from "./services/AuthService";
import Swal from "sweetalert2";

const Signup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: "GP01",
      email: "",
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().trim().required("Required"),
      matKhau: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-z]*)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#\$%\^&\*]+).{6,10}$/g,
          "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
        ),
      email: Yup.string()
        .required("Required")
        .matches(
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g,
          "Error email"
        ),
      soDT: Yup.string()
        .required("Required")
        .matches(/(^[0-9]{10}$)+/g, "Error Phone"),
      hoTen: Yup.string()
        .trim()
        .required("Required")
        .matches(
          /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g,
          "Error FullName"
        ),
    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      await AuthService.signup(values)
        .then((res) => {
          return navigate("/signin");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data,
          });
        });
      console.log("values", values);
    },
  });
  return (
    <div className="signup">
      <div className="signup-box">
        <span className="arrow" onClick={() => navigate("/")}>
          <ArrowLeftOutlined />
        </span>
        <h2>Signup</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="taiKhoan"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
              <p className="text-red-600 font-bold">{formik.errors.taiKhoan}</p>
            ) : null}
            <label>Account</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name="hoTen"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.hoTen && formik.errors.hoTen ? (
              <p className="text-red-600 font-bold">{formik.errors.hoTen}</p>
            ) : null}
            <label>Fullname</label>
          </div>
          <div className="user-box">
            <input
              name="matKhau"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              required
            />
            {formik.touched.matKhau && formik.errors.matKhau ? (
              <p className="text-red-600 font-bold">{formik.errors.matKhau}</p>
            ) : null}
            <label>Password</label>
          </div>
          <div className="user-box">
            <input
              name="soDT"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.soDT && formik.errors.soDT ? (
              <p className="text-red-600 font-bold">{formik.errors.soDT}</p>
            ) : null}
            <label>Phone</label>
          </div>
          <div className="user-box">
            <input
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-600 font-bold">{formik.errors.email}</p>
            ) : null}
            <label>Email</label>
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
          onClick={() => navigate("/signin")}
        >
          Signin?
        </p>
      </div>
    </div>
  );
};

export default Signup;

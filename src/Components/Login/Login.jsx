import React from "react";
import style from "./Login.module.css";
import { formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  let validationYup = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,10}$/)
      .required("Required"),
  });

  async function loginForm(values) {
    console.log(values);
    let { data } = await axios.post(
      `https://sticky-note-fe.vercel.app/signin`,
      values
    );
    console.log(data);
    if (data.message == "success") {
      console.log(data);
      localStorage.setItem("userToken", data.token)
      navigate("/home")
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationYup,
    onSubmit: (values) => loginForm(values),
  });
  return (
    <>
      <div className="container">
        <div className="w-50 mx-auto my-5">
          <h2 className="text-info">Login Form</h2>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email" className="d-block">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              className="form-control mb-2"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label htmlFor="password" className="d-block">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="form-control mb-2"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <button className="btn btn-info text-white w-100 mt-2">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

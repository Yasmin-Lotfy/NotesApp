import React, { useState } from "react";
import style from "./Register.module.css";
import { formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios"
import {useNavigate} from "react-router-dom"

function Register() {
  let navigate = useNavigate()
  const [errorMessage, seterrorMessage] = useState(null)


  let validationYup = Yup.object({
    first_name:Yup.string().max(15, 'Not more thsn 15 chars').required('First name is required').min(3,"not less than 3 chars"),
    last_name:Yup.string().max(15, 'Not more thsn 15 chars').required('First name is required').min(3,"not less than 3 chars"),
    email:Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,10}$/).required('Required'),
    age: Yup.number().required("Age is required").positive().integer(),
  })

  async function registerForm (values){
    seterrorMessage(null)

    console.log(values);
    let {data} = await axios.post(`https://sticky-note-fe.vercel.app/signup`,values)
    
    console.log(data);
    if(data.message == "success"){
      navigate("/login")

    }else{
      seterrorMessage(data.message)


    }

  }


  let formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      age: "",
    },validationSchema: validationYup,
    onSubmit:(values)=> registerForm(values),
  })
  return (
    <>
      <div className="container">
        <div className="w-50 mx-auto my-5">
          <h2 className="text-info">Registration Form</h2>
          {errorMessage? <div className="alert alert-danger">{errorMessage}</div>:""}
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName" className="d-block">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter your First Name"
              className="form-control mb-2"
              name="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              onBlur={formik.handleBlur}
            />
            {formik.errors.first_name && formik.touched.first_name? <div className="alert alert-danger">{formik.errors.first_name}</div>:""}

            <label htmlFor="lastName" className="d-block">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter your Last Name"
              className="form-control mb-2"
              name="last_name"
              onChange={formik.handleChange}
              value={formik.values.last_name}
              onBlur={formik.handleBlur}
            />
            {formik.errors.last_name && formik.touched.last_name? <div className="alert alert-danger">{formik.errors.last_name}</div>:""}


            <label htmlFor="email" className="d-block">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              className="form-control mb-2"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />

          {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div>:""}

            <label htmlFor="password" className="d-block">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="form-control mb-2"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div>:""}


            <label htmlFor="age" className="d-block">
              Age
            </label>
            <input
              type="number"
              id="age"
              placeholder="Enter your Age"
              className="form-control mb-2"
              name="age"
              onChange={formik.handleChange}
              value={formik.values.age}
              onBlur={formik.handleBlur}
            />

          {formik.errors.age && formik.touched.age? <div className="alert alert-danger">{formik.errors.age}</div>:""}

            <button type="submit" className="btn bg-info text-white w-100 mt-2">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;

import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput.js'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice.js';

let schema = yup.object().shape({
  email: yup.string().email('Email should be valid').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(login(values))
    },
  });

  const { user, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSuccess) {
      navigate('admin');
      window.location.reload()
    } else {
      navigate('/')
    }
  }, [user, isSuccess, navigate]);
  return (
    <>
      <div className='py-5' style={{ background: "#ffd333", minHeight: "100vh" }}>
        <br />
        <br />
        <br />
        <br />
        <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
          <h3 className='text-center'> Login </h3>
          <p className='text-center'> Login to your account for continue </p>
          <div className="error text-center">
            {message.message === 'Rejected' ? "You are not an admin!" : ""}
          </div>
          <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="email"
              name="email"
              label="Email Address"
              i_id="email"
              val={formik.values.email}
              onCh={formik.handleChange('email')}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <CustomInput
              type="password"
              name="password"
              label="Password"
              i_id="pass" val={formik.values.password}
              onCh={formik.handleChange('password')}
            />
            <div className="error">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
            <button
              className='border-0 px-3 py-2 mt-3 text-white fw-bold text-center text-decoration-none fs-5 w-100'
              style={{ background: "#ffd333" }}
              type='submit'>
              Login
            </button>
          </form>
        </div>
      </div>
      <CustomInput />
    </>
  )
}

export default Login
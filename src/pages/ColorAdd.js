import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { toast } from "react-toastify";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createColor, updateAColor, getAColor, resetState } from '../features/color/colorSlice';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    AiOutlineBgColors
} from 'react-icons/ai'

let schema = yup.object().shape({
    title: yup.string().required('Color is required'),
});
const ColorAdd = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getId = location.pathname.split("/")[3];
    const newColor = useSelector((state) => state.color);
    const {
        isSuccess,
        isError,
        createdColor,
        colorName,
        updatedColor
    } = newColor;
    useEffect(() => {
        if (getId !== undefined) {
            dispatch(getAColor(getId));
        } else {
            dispatch(resetState());
        }
    }, [getId, dispatch]);

    useEffect(() => {
        if (isSuccess && createdColor) {
            toast.success("Color Added Successfully!");
        }
        if (isSuccess && updatedColor) {
            toast.success("Color Updated Successfully!");
            navigate("/admin/color-list");
        }

        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, navigate, isError, createdColor, updatedColor]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: colorName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getId !== undefined) {
                const data = { id: getId, colorData: values };
                dispatch(updateAColor(data));
                dispatch(resetState());
            } else {
                dispatch(createColor(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            }
        },
    });

    return (
        <div>
            <div className='d-flex justify-content-between align-items-end mb-4'>
                <h3 className="mb-4 title">
                    {getId !== undefined ? "Edit" : "Add"} Color
                </h3>
                <Link to='/admin/color-list' style={{ textDecoration: 'none' }} ><p className='text-success support'> <AiOutlineBgColors /> <b /> Color List</p> </Link>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
                <div>
                    <CustomInput
                        type="color"
                        label="Enter Color"
                        name="title"
                        i_id="title"
                        val={formik.values.title}
                        onCh={formik.handleChange('title')}

                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title ? (
                            <div>{formik.errors.title}</div>
                        ) : null}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                        {getId !== undefined ? "Edit" : "Add"} Color
                    </button>
                </div>
            </form>
        </div>
    )
}


export default ColorAdd
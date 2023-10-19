import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { toast } from "react-toastify";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, updateAProductCategory, getAProductCategory, resetState } from '../features/pcategory/pcategorySlice';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    BiCategory
} from 'react-icons/bi'

let schema = yup.object().shape({
    title: yup.string().required('Category name is required'),
});
const CatAdd = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getId = location.pathname.split("/")[3];
    const newCategory = useSelector((state) => state.pCategory);
    const {
        isSuccess,
        isError,
        createdCategory,
        categoryName,
        updatedCategory,
    } = newCategory;
    useEffect(() => {
        if (getId !== undefined) {
            dispatch(getAProductCategory(getId));
        } else {
            dispatch(resetState());
        }
    }, [getId, dispatch]);

    useEffect(() => {
        if (isSuccess && createdCategory) {
            toast.success("Category Added Successfully!");
        }
        if (isSuccess && updatedCategory) {
            toast.success("Category Updated Successfully!");
            navigate("/admin/category-list");
        }

        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, navigate, isError, createdCategory, updatedCategory]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: categoryName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getId !== undefined) {
                const data = { id: getId, pCatData: values };
                dispatch(updateAProductCategory(data));
                dispatch(resetState());
            } else {
                dispatch(createCategory(values));
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
                    {getId !== undefined ? "Edit" : "Add"} Category
                </h3>
                <Link to='/admin/category-list' style={{ textDecoration: 'none' }} ><p className='text-success support'> <BiCategory /> <b /> Category List</p> </Link>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
                <div>
                    <CustomInput
                        type="text"
                        label="Enter Category Name"
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
                        {getId !== undefined ? "Edit" : "Add"} Category
                    </button>
                </div>
            </form>
        </div>
    )
}


export default CatAdd
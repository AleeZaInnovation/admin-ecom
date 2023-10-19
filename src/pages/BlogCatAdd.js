import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { toast } from "react-toastify";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createNewblogCat, getABlogCat, updateABlogCat, resetState } from '../features/bcategory/bcategorySlice';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    ImBlog
} from 'react-icons/im'


let schema = yup.object().shape({
    title: yup.string().required('Blog category name is required'),
});
const BlogCatAdd = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getId = location.pathname.split("/")[3];
    const newBCategory = useSelector((state) => state.bCategory);
    const {
        isSuccess,
        isError,
        createBlogCategory,
        blogCatName,
        updatedBlogCategory
    } = newBCategory;
    useEffect(() => {
        if (getId !== undefined) {
            dispatch(getABlogCat(getId));
        } else {
            dispatch(resetState());
        }
    }, [getId, dispatch]);

    useEffect(() => {
        if (isSuccess && createBlogCategory) {
            toast.success("Blog Added Successfully!");
        }
        if (isSuccess && updatedBlogCategory) {
            toast.success("Blog Updated Successfully!");
            navigate("/admin/blog-category-list");
        }

        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, navigate, isError, createBlogCategory, updatedBlogCategory]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogCatName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getId !== undefined) {
                const data = { id: getId, blogCatData: values };
                dispatch(updateABlogCat(data));
                dispatch(resetState());
            } else {
                dispatch(createNewblogCat(values));
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
                    {getId !== undefined ? "Edit" : "Add"} Blog Category
                </h3>
                <Link to='/admin/blog-category-list' style={{ textDecoration: 'none' }} ><p className='text-success support'> <ImBlog /> <b /> Blog Category List</p> </Link>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
                <div>
                    <CustomInput
                        type="text"
                        label="Enter Blog Category Name"
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
                        {getId !== undefined ? "Edit" : "Add"} Blog Category
                    </button>
                </div>
            </form>
        </div>
    )
}


export default BlogCatAdd
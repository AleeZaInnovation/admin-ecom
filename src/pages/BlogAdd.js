import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
    createBlogs,
    resetState,
} from "../features/blogs/blogSlice";
import { getCategories } from "../features/bcategory/bcategorySlice";
import { Link } from "react-router-dom";
import {
    FaBlogger
} from 'react-icons/fa'

let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    category: yup.string().required("Category is Required"),
});

const BlogAdd = () => {
    const dispatch = useDispatch();
    const imgState = useSelector((state) => state.upload.images);
    const bCatState = useSelector((state) => state.bCategory.bCategories);
    const blogState = useSelector((state) => state.blog);
    const {
        isSuccess,
        isError,
        isLoading,
        createdBlog,
    } = blogState;

    useEffect(() => {
        dispatch(resetState());
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess && createdBlog) {
            toast.success("Blog Added Successfully!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, createdBlog, isLoading]);

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    console.log(img)
    useEffect(() => {
        formik.values.images = img;
    }, [img]);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            category: '',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createBlogs(values));
            formik.resetForm();
            window.location.reload()
        },
    });

    return (
        <div>
            <div className='d-flex justify-content-between align-items-end mb-4'>
                <h3 className="mb-4 title">
                    Add Blog
                </h3>
                <Link to='/admin/blog-list' style={{ textDecoration: 'none' }} ><p className='text-success support'> <FaBlogger /> <b /> Blog List</p> </Link>
            </div>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="mt-4">
                        <CustomInput
                            type="text"
                            label="Enter Product Title"
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

                    </div>
                    <select
                        name="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        className="form-control py-3  mt-3"
                        id=""
                    >
                        <option value="">Select Blog Category</option>
                        {bCatState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>
                                    {i.title}
                                </option>
                            );
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.category && formik.errors.category}
                    </div>
                    <ReactQuill
                        theme="snow"
                        className="mt-3"
                        name="description"
                        onChange={formik.handleChange("description")}
                        value={formik.values.description}
                    />
                    <div className="error">
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <div className="bg-white border-1 p-5 text-center mt-3 mb-3">
                        <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3">
                        {imgState?.map((i, j) => {
                            return (
                                <div className=" position-relative" key={j}>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(delImg(i.public_id))}
                                        className="btn-close position-absolute"
                                        style={{ top: "10px", right: "10px" }}
                                    ></button>
                                    <img src={i.url} alt="" width={200} height={200} />
                                </div>
                            );
                        })}
                    </div>


                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit"
                    >
                        Add Blog
                    </button>
                </form>
            </div>
        </div>
    )
}

export default BlogAdd
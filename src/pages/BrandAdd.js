import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
    createBrand,
    getABrand,
    resetState,
    updateABrand,
} from "../features/brand/brandSlice";
import {
    SiBrandfolder
} from 'react-icons/si'

let schema = yup.object().shape({
    title: yup.string().required("Brand Name is Required"),
});
const BrandAdd = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getBrandId = location.pathname.split("/")[3];
    const newBrand = useSelector((state) => state.brand);
    const {
        isSuccess,
        isError,
        createdBrand,
        brandName,
        updatedBrand,
    } = newBrand;
    useEffect(() => {
        if (getBrandId !== undefined) {
            dispatch(getABrand(getBrandId));
        } else {
            dispatch(resetState());
        }
    }, [getBrandId,dispatch]);

    useEffect(() => {
        if (isSuccess && createdBrand) {
            toast.success("Brand Added Successfully!");
        }
        if (isSuccess && updatedBrand) {
            toast.success("Brand Updated Successfully!");
            navigate("/admin/brand-list");
        }

        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess,navigate,isError, createdBrand,updatedBrand]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: brandName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getBrandId !== undefined) {
                const data = { id: getBrandId, brandData: values };
                dispatch(updateABrand(data));
                dispatch(resetState());
            } else {
                dispatch(createBrand(values));
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
                    {getBrandId !== undefined ? "Edit" : "Add"} Brand
                </h3>
                <Link to='/admin/brand-list' style={{ textDecoration: 'none' }} ><p className='text-success support'> <SiBrandfolder /> <b /> Brand List</p></Link>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
                <div>
                    <CustomInput
                        type="text"
                        label="Enter Brand Name"
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
                        {getBrandId !== undefined ? "Edit" : "Add"} Brand
                    </button>
                </div>
            </form>
        </div>
    )
}
export default BrandAdd
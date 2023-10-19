import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { toast } from "react-toastify";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createCoupon, updateACoupon, getACoupon, resetState } from '../features/coupon/couponSlice';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    AiOutlineBgColors
} from 'react-icons/ai'

let schema = yup.object().shape({
    name: yup.string().required('Coupon name is required'),
    expiry: yup.date().required('Coupon expiry date is required'),
    discount: yup.number().required('Coupon discount is required'),
});
const CouponAdd = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getId = location.pathname.split("/")[3];
    const newCoupon = useSelector((state) => state.coupon);
    const {
        isSuccess,
        isError,
        createdCoupon,
        couponName,
        couponDiscount,
        couponExpiry,
        updatedCoupon
    } = newCoupon;
    const changeDateFormet = (date) => {
        const newDate = new Date(date).toLocaleDateString();
        const [month, day, year] = newDate.split("/");
        return [year, month, day].join("-");
    };
    useEffect(() => {
        if (getId !== undefined) {
            dispatch(getACoupon(getId));
        } else {
            dispatch(resetState());
        }
    }, [getId, dispatch]);

    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success("Coupon Added Successfully!");
        }
        if (isSuccess && updatedCoupon) {
            toast.success("Coupon Updated Successfully!");
            navigate("/admin/coupon-list");
        }

        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, navigate, isError, createdCoupon, updatedCoupon]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: couponName || "",
            expiry: changeDateFormet(couponExpiry) || "",
            discount: couponDiscount || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getId !== undefined) {
                const data = { id: getId, couponData: values };
                dispatch(updateACoupon(data));
                dispatch(resetState());
            } else {
                dispatch(createCoupon(values));
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
                    {getId !== undefined ? "Edit" : "Add"} Coupon
                </h3>
                <Link to='/admin/coupon-list' style={{ textDecoration: 'none' }} ><p className='text-success support'> <AiOutlineBgColors /> <b /> Coupon List</p> </Link>
            </div>
            <form action="" onSubmit={formik.handleSubmit}>
                <div>
                    <CustomInput
                        type="text"
                        label="Enter Coupon Name"
                        name="name"
                        i_id="name"
                        val={formik.values.name}
                        onCh={formik.handleChange('name')}

                    />
                    <div className="error">
                        {formik.touched.name && formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type="date"
                        label="Enter Coupon Expiry"
                        name="expiry"
                        i_id="expiry"
                        val={formik.values.expiry}
                        onCh={formik.handleChange('expiry')}

                    />
                    <div className="error">
                        {formik.touched.expiry && formik.errors.expiry ? (
                            <div>{formik.errors.expiry}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Coupon discount"
                        name="discount"
                        i_id="discount"
                        val={formik.values.discount}
                        onCh={formik.handleChange('discount')}

                    />
                    <div className="error">
                        {formik.touched.discount && formik.errors.discount ? (
                            <div>{formik.errors.discount}</div>
                        ) : null}
                    </div>
                    <button className='btn btn-success border-0 rounded-3 my-5' type='submit'>
                        {getId !== undefined ? "Edit" : "Add"} Coupon
                    </button>
                </div>
            </form>
        </div>
    )
}


export default CouponAdd
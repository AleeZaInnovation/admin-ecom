import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteForever, MdOutlineRemoveRedEye } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { deleteAEnquiry, getEnquiries, updateAEnquiry } from '../features/enquiry/enquirySlice';
import CustomModal from '../components/CustomModal';
import { toast } from "react-toastify";

const columns = [
    {
        title: 'S No',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const Enquiries = () => {
    const [open, setOpen] = useState(false);
    const [id, setid] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setid(e);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEnquiries())
    }, [dispatch])
    const enquiryState = useSelector((state) => state.enquiry.enquiries)
    const newUpdate = useSelector((state) => state.enquiry)
    const { updatedEnquiry, isSuccess, isError } = newUpdate;
    const data1 = [];
    for (let i = 0; i < enquiryState.length; i++) {
        data1.push({
            key: i + 1,
            name: enquiryState[i].name,
            email: enquiryState[i].email,
            mobile: enquiryState[i].mobile,
            status:
                (
                    <>
                        <select
                            name=""
                            defaultValue={enquiryState[i].status ? enquiryState[i].status : "Submitted"}
                            className="form-control form-select"
                            id=""
                            onChange={(e) => setEnquiryStatus(e.target.value, enquiryState[i]._id)}
                        >
                            <option value="Submitted">Submitted</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </>),
            action:
                <>
                    <Link to={`/admin/enquiries/${enquiryState[i]._id}`} className='fs-3 text-danger ms-3'>
                        <MdOutlineRemoveRedEye />
                    </Link>

                    <button
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(enquiryState[i]._id)}
                    >
                        <MdDeleteForever />
                    </button>
                </>
        });
    }
    const setEnquiryStatus = (e, i) => {
        console.log(e, i);
        const data = { id: i, enqData: e };
        dispatch(updateAEnquiry(data));
    };
    const deleteData = (e) => {
        setOpen(false);
        dispatch(deleteAEnquiry(e));
        setTimeout(() => {
            dispatch(getEnquiries());
        }, 100);
    };
    useEffect(() => {
        if (isSuccess && updatedEnquiry) {
            toast.success("Enquiry Status Updated Successfully!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, updatedEnquiry]);
    return (
        <div>
            <h3 className="mb-4">Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteData(id);
                }}
                title="Are you sure you want to delete this enquiry?"
            />
        </div>
    )
}

export default Enquiries
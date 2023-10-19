import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABrand, getBrands, resetState } from '../features/brand/brandSlice';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { BiSolidMessageSquareAdd } from 'react-icons/bi'
import CustomModal from '../components/CustomModal';
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
        title: 'Action',
        dataIndex: 'action',
    },
];

const BrandList = () => {
    const [open, setOpen] = useState(false);
    const [brandId, setbrandId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setbrandId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState());
        dispatch(getBrands())
    }, [dispatch])
    const brandState = useSelector((state) => state.brand.brands)
    const data1 = [];
    for (let i = 0; i < brandState.length; i++) {
        data1.push({
            key: i + 1,
            name: brandState[i].title,
            action:
                <>
                    <Link to={`/admin/brand/${brandState[i]._id}`} className='fs-3 text-warning'>
                        <FaEdit />
                    </Link>
                    <button
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(brandState[i]._id)}
                    >
                        <MdDeleteForever />
                    </button>
                </>
        });
    }
    const deleteBrand = (e) => {
        setOpen(false);
        dispatch(deleteABrand(e));
        setTimeout(() => {
            dispatch(getBrands());
        }, 100);
    };
    return (
        <div>
            <div className='d-flex justify-content-between align-items-end mb-4'>
                <h3 className="">Brand List</h3>
                <Link to='/admin/brand' style={{ textDecoration: 'none' }} ><p className='text-success support'><BiSolidMessageSquareAdd /> <b /> Add Brand</p></Link>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteBrand(brandId);
                }}
                title="Are you sure you want to delete this brand?"
            />
        </div>
    )
}


export default BrandList
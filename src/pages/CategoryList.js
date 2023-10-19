import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAProductCategory, getCategories, resetState } from '../features/pcategory/pcategorySlice';
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

const CategoryList = () => {
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
        dispatch(resetState());
        dispatch(getCategories())
    }, [dispatch])
    const pCategoryState = useSelector((state) => state.pCategory.pCategories)
    const data1 = [];
    for (let i = 0; i < pCategoryState.length; i++) {
        data1.push({
            key: i + 1,
            name: pCategoryState[i].title,
            action:
                <>
                    <Link to={`/admin/category/${pCategoryState[i]._id}`} className='fs-3 text-warning'>
                        <FaEdit />
                    </Link>
                    <button
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(pCategoryState[i]._id)}
                    >
                        <MdDeleteForever />
                    </button>
                </>
        });
    }
    const deleteProductCategory = (e) => {
        setOpen(false);
        dispatch(deleteAProductCategory(e));
        setTimeout(() => {
            dispatch(getCategories());
        }, 100);
    };
    return (
        <div>
            <div className='d-flex justify-content-between align-items-end mb-4'>
                <h3 className="">Category List</h3>
                <Link to='/admin/category' style={{ textDecoration: 'none' }} ><p className='text-success support'><BiSolidMessageSquareAdd /> <b /> Add Category</p></Link>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteProductCategory(id);
                }}
                title="Are you sure you want to delete this Category?"
            />
        </div>
    )
}


export default CategoryList
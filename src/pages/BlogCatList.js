import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { getCategories, resetState, deleteABlogCat } from '../features/bcategory/bcategorySlice';
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

const BlogCatList = () => {
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
    const bCategoryState = useSelector((state) => state.bCategory.bCategories)
    const data1 = [];
    for (let i = 0; i < bCategoryState.length; i++) {
        data1.push({
            key: i + 1,
            name: bCategoryState[i].title,
            action:
                <>
                    <Link to={`/admin/blog-category/${bCategoryState[i]._id}`} className='fs-3 text-warning'>
                        <FaEdit />
                    </Link>
                    <button
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(bCategoryState[i]._id)}
                    >
                        <MdDeleteForever />
                    </button>
                </>
        });
    }
    const deleteData = (e) => {
        setOpen(false);
        dispatch(deleteABlogCat(e));
        setTimeout(() => {
            dispatch(getCategories());
        }, 100);
    };
    return (
        <div>
            <div className='d-flex justify-content-between align-items-end mb-4'>
                <h3 className="">Blog Category List</h3>
                <Link to='/admin/blog-category' style={{ textDecoration: 'none' }} ><p className='text-success support'><BiSolidMessageSquareAdd /> <b /> Add Blog Category</p></Link>
            </div>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteData(id);
                }}
                title="Are you sure you want to delete this blog category?"
            />
        </div>
    )
}


export default BlogCatList
import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { getBlogs, resetState, deleteABlog } from '../features/blogs/blogSlice';
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
        title: 'Category',
        dataIndex: 'category',
        sorter: (a, b) => a.category.length - b.category.length,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];

const BlogList = () => {
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
        dispatch(getBlogs())
        
    }, [])
    const blogState = useSelector((state) => state.blog.blogs)
    const data1 = [];
    for (let i = 0; i < blogState.length; i++) {
        data1.push({
            key: i + 1,
            name: blogState[i].title,
            category: blogState[i].category,
            action:
                <>
                    <Link to={`/admin/blog/${blogState[i]._id}`} className='fs-3 text-warning'>
                        <FaEdit />
                    </Link>
                    <button
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(blogState[i]._id)}
                    >
                        <MdDeleteForever />
                    </button>
                </>
        });
    }
    const deleteData = (e) => {
        setOpen(false);
        dispatch(deleteABlog(e));
        setTimeout(() => {
            dispatch(getBlogs());
        }, 100);
    };
    return (
        <div>
            <div className='d-flex justify-content-between align-items-end mb-4'>
                <h3 className="">Blog List</h3>
                <Link to='/admin/blog' style={{ textDecoration: 'none' }} ><p className='text-success support'><BiSolidMessageSquareAdd /> <b /> Add Blog</p></Link>
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
                title="Are you sure you want to delete this blog?"
            />
        </div>
    )
}


export default BlogList
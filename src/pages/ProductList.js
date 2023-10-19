import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd';
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { getProducts } from '../features/product/productSlice';
import { Link } from 'react-router-dom'
const columns = [
    {
        title: 'S.No',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
        sorter: (a, b) => a.title.length - b.title.length,
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        sorter: (a, b) => a.category.length - b.category.length,

    },
    {
        title: 'Color',
        dataIndex: 'color',
        sorter: (a, b) => a.color.length - b.color.length,
    },
    {
        title: 'Price (Tk)',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },
];
const ProductList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    const productState = useSelector((state) => state.product.products)
    const data1 = [];
    for (let i = 0; i < productState.length; i++) {
        data1.push({
            key: i + 1,
            title: productState[i].title,
            brand: productState[i].brand,
            category: productState[i].category,
            color: productState[i].color,
            price: `${productState[i].price}`,
            action:
                <>
                    <Link to='/admin' className='fs-3 text-warning'>
                        <FaEdit />
                    </Link>
                    <Link to='/admin' className='fs-3 text-danger ms-3'>
                        <MdDeleteForever />
                    </Link>
                </>
        });
    }
    return (
        <div>
            <h3 className="mb-4">Product List</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}



export default ProductList
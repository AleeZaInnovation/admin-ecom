import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd';
import { getUsers } from '../features/cutomers/customerSlice';

const columns = [
    
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter:(a,b)=>a.name.length - b.name.length,
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },
];


const Customers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])
    const customersState = useSelector((state) => state.customers.customers)    
    const data1 = [];
    for (let i = 0; i <customersState.length; i++) {
        if (customersState[i].role !== 'admin') {
            data1.push({
                key: i + 1,
                name: customersState[i].firstname +' '+ customersState[i].lastname,
                email: customersState[i].email,
                mobile: customersState[i].mobile,
            });
        }
    }
    return (
        <div>
            <h3 className="mb-4">Customers</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}



export default Customers
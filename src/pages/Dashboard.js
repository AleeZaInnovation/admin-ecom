import React, { useEffect, useState } from 'react'
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { getMonthlyOrder, getOrders, getYearlyOrder } from '../features/auth/authSlice';
const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Total Product',
    dataIndex: 'product',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Total Price',
    dataIndex: 'priceAfterDiscount',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders);
  console.log(orderState);
  useEffect(() => {
    dispatch(getMonthlyOrder());
    dispatch(getYearlyOrder());
    dispatch(getOrders())
  }, [])
  const [dataMonthly, setDataMonthly] = useState([])
  const [dataMonthlySales, setDataMonthlySales] = useState([])
  const [orderData, setOrderData] = useState([])
  useEffect(() => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let data = []
    let salesData = []
    for (let index = 0; index < monthlyState?.length; index++) {
      const element = monthlyState[index];
      data.push({ type: months[element?._id?.month], income: element?.amount })
      salesData.push({ type: months[element?._id?.month], sales: element?.count })
    }
    setDataMonthly(data)
    setDataMonthlySales(salesData);

    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
      data1.push({
        key: i + 1,
        name: orderState[i]?.user?.firstname +" "+ orderState[i]?.user?.lastname,
        product: orderState[i]?.orderItems?.length,
        price: orderState[i]?.totalPrice,
        priceAfterDiscount: (orderState[i]?.totalPriceAfterDiscount.toFixed()),
        status: orderState[i]?.orderStatus,
      });
    }
    setOrderData(data1)
  }, [monthlyState, yearlyState])
  const config = {
    data: dataMonthly,
    xField: 'type',
    yField: 'income',
    color: ({ type }) => {

      return '#ffd333';
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      income: {
        alias: 'Income',
      },
    },
  };
  const config2 = {
    data: dataMonthlySales,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {

      return '#ffd333';
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Sales',
      },
    },
  };

  return (
    <div>
      <h3 className='mb-4'>
        Dashboard
      </h3>
      <div className="justify-content-between d-flex align-items-center gap-3">
        <div className="justify-content-between  p-3 d-flex align-items-end flex-grow-1 bg-white p-3 gap-3 rounded-3">
          <div>
            <p>Total Yearly Income</p>
            <h4 className='mb-0'>${(yearlyState?.[0]?.amount)?.toFixed(2)}</h4>
          </div>
          <div className="align-items-end d-flex flex-column">
            <p className='mb-0'>Income in last year from Today</p>
          </div>
        </div>

        <div className="justify-content-between p-3  d-flex align-items-end flex-grow-1 bg-white p-3 gap-3 rounded-3">
          <div>
            <p>Total Yearly Sales</p>
            <h4 className='mb-0'>{(yearlyState?.[0]?.count)}</h4>
          </div>
          <div className="align-items-end d-flex flex-column">

            <p className='mb-0'>Sales in last year from Today</p>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-between gap-3'>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-4">
            Income Statistics
          </h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className="mb-4">
            Sales Statistics
          </h3>
          <div>
            <Column {...config2} />
          </div>
        </div>

      </div>
      <div className='mt-4'>
        <h3 className="mb-4">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
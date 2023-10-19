import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, orderStatus } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state?.auth?.orders);

  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i]?.user?.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>
          View Orders
        </Link>
      ),
      amount: orderState[i].totalPrice,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <select name="" id="" defaultValue={orderState[i].orderStatus} onChange={(e) => updateOrderStatus(orderState[i]._id, e.target.value)}  className="from-control form-select">
            <option value="Ordered" className=" text-center" disabled>Ordered</option>
            <option className=" text-center" value="Processed">Processed</option>
            <option className=" text-center" value="Shipped">Shipped</option>
            <option className=" text-center" value="Out for Delivery">Out for Delivery</option>
            <option className=" text-center" value="Delivered">Delivered</option>
          </select>
        </>
      ),
    });
  }
  const updateOrderStatus = (a, b) => {
    dispatch(orderStatus({ id: a, status: b }))
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
    </div>
  );
};

export default Orders;

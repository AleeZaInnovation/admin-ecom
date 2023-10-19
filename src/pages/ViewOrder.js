import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser } from "../features/auth/authSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(orderId));
  }, []);
  const orderState = useSelector((state) => state?.auth?.orderbyuser?.orderItems);
  console.log(orderState);
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {

    data1.push({
      key: i + 1,
      name: orderState[i]?.product.title,
      brand: orderState[i]?.product?.brand,
      count: orderState[i]?.quantity,
      amount: orderState[i]?.price,
      color: (
        <>
          <ul className="ps-0">
            <li style={{ backgroundColor: orderState[i]?.color?.title }}>
            </li>
          </ul>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;

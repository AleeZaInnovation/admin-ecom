import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
  AiFillBell
} from 'react-icons/ai'
import {
  FaClipboardList,
  FaBlogger
} from 'react-icons/fa'
import { ImBlog } from 'react-icons/im'
import {
  SiBrandfolder,
  SiGooglebigquery
} from 'react-icons/si'
import { BiCategory, BiAddToQueue } from 'react-icons/bi'
import { RiCouponLine, RiLogoutBoxRLine } from 'react-icons/ri'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout, Menu, Button, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const naivage = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <h2 className="py-3 text-white mb-0 text-center fs-5">
            <span className='sm-logo fw-bold'>A M</span>
            <span className='lg-logo'>AleeZa Mart</span>
          </h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['',]}
          onClick={({ key }) => {
            if (key === 'singout') {
              localStorage.clear()
              window.location.reload()
            } else {
              naivage(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className='fs-4' />,
              label: 'Customers',
            },
            {
              key: 'catelog',
              icon: <AiOutlineShoppingCart className='fs-4' />,
              label: 'Catelog',
              children: [
                {
                  key: 'product',
                  icon: <BiAddToQueue className='fs-4' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <BiAddToQueue className='fs-4' />,
                  label: 'Add Brand',
                },
                {
                  key: 'brand-list',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <BiAddToQueue className='fs-4' />,
                  label: 'Add Category',
                },
                {
                  key: 'category-list',
                  icon: <BiCategory className='fs-4' />,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <BiAddToQueue className='fs-4' />,
                  label: 'Add Color',
                },
                {
                  key: 'color-list',
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Color List',
                },
              ]
            },
            {
              key: 'orders',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Orders',
            },
            {
              key: 'coupons',
              icon: <RiCouponLine className='fs-4' />,
              label: 'Marketing',
              children: [
                {
                  key: 'coupon',
                  icon: <BiAddToQueue className='fs-4' />,
                  label: 'Add Coupon',
                },
                {
                  key: 'coupon-list',
                  icon: <RiCouponLine className='fs-4' />,
                  label: 'Coupon List',
                },
              ]
            },
            {
              key: 'blogs',
              icon: <FaBlogger className='fs-4' />,
              label: 'Blogs',
              children: [
                {
                  key: 'blog',
                  icon: <BiAddToQueue className='fs-4' />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaBlogger className='fs-4' />,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <BiAddToQueue className='fs-4' />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Blog Category List',
                },
              ]
            },
            {
              key: 'enquiries',
              icon: <SiGooglebigquery className='fs-4' />,
              label: 'Enquiries ',
            },
            {
              key: 'singout',
              icon: <RiLogoutBoxRLine className='fs-4 text-white bg-danger' />,
              label: 'Sing Out ',
            },

          ]}
        />
      </Sider>
      <Layout>
        <Header className='justify-content-between d-flex ps-1 pe-5'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className='position-relative'>
              <AiFillBell className='fs-4' />
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <div>
                <img
                  width={45}
                  height={45}
                  src="https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg" alt="" />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className='mb-0'>Alee Baba</h5>
                <p className='mb-0'>alee@gmail.com</p>
              </div>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/">View Profile</Link>
                </li>
                <li>
                  <button
                    className="dropdown-item py-1 mb-1 text-white bg-danger"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={(e) => localStorage.clear(e) || window.location.reload()}
                  > <RiLogoutBoxRLine className='fs-4' />Sing Out</button>
                </li>

              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
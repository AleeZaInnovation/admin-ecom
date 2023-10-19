import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js'
import Dashboard from './pages/Dashboard.js'
import Enquiries from './pages/Enquiries.js'
import ViewEnquiry from './pages/ViewEnquiry.js'
import CouponAdd from './pages/CouponAdd.js'
import CouponList from './pages/CouponList.js'
import BlogList from './pages/BlogList.js'
import BlogCatList from './pages/BlogCatList.js'
import Order from './pages/Order.js'
import Customers from './pages/Customers.js'
import ColorList from './pages/ColorList.js'
import CategoryList from './pages/CategoryList.js'
import BrandList from './pages/BrandList.js'
import ProductList from './pages/ProductList.js'
import MainLayout from './components/MainLayout'
import BlogAdd from './pages/BlogAdd';
import BlogUpdate from './pages/BlogUpdate';
import BlogCatAdd from './pages/BlogCatAdd.js';
import ColorAdd from './pages/ColorAdd.js';
import CatAdd from './pages/CatAdd.js';
import BrandAdd from './pages/BrandAdd.js';
import ProductAdd from './pages/ProductAdd.js';
import ViewOrder from './pages/ViewOrder';
import { OpenRoutes } from './routing/OpenRoutes';
import { PrivateRoutes } from './routing/PrivateRoutes';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path='/admin' element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
          <Route index element={<Dashboard />} />
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='enquiries/:id' element={<ViewEnquiry />} />
          <Route path='coupon' element={<CouponAdd />} />
          <Route path='coupon/:id' element={<CouponAdd />} />
          <Route path='coupon-list' element={<CouponList />} />
          <Route path='blog-list' element={<BlogList />} />
          <Route path='blog-category-list' element={<BlogCatList />} />
          <Route path='orders' element={<Order />} />
          <Route path='order/:id' element={<ViewOrder />} />
          <Route path='customers' element={<Customers />} />
          <Route path='color-list' element={<ColorList />} />
          <Route path='category-list' element={<CategoryList />} />
          <Route path='brand-list' element={<BrandList />} />
          <Route path='product-list' element={<ProductList />} />
          <Route path='blog' element={<BlogAdd />} />
          <Route path='blog/:id' element={<BlogUpdate />} />
          <Route path='blog-category' element={<BlogCatAdd />} />
          <Route path='blog-category/:id' element={<BlogCatAdd />} />
          <Route path='color' element={<ColorAdd />} />
          <Route path='color/:id' element={<ColorAdd />} />
          <Route path='category' element={<CatAdd />} />
          <Route path='category/:id' element={<CatAdd />} />
          <Route path='brand' element={<BrandAdd />} />
          <Route path='brand/:id' element={<BrandAdd />} />
          <Route path='product' element={<ProductAdd />} />
          <Route path='product/:id' element={<ProductAdd />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

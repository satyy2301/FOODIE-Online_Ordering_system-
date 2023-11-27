import React from 'react';
import AdminOrdersPage from './pages/AdminOrderPage';
import Home from '../src/pages/Home'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Protected from './features/auth/components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/Cart/CartSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/orderSucessPage';
import UserOrdersPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminDashboardPage from './pages/AdmindashboardPage';
import ChatBot from './pages/chatbot';
import AdminUserPage from './pages/AdminUserPage'
import LandingPage from './pages/Landingpage'



import './App.css';

import {
  createBrowserRouter,
  RouterProvider,Link

} from "react-router-dom";
import CartPage from '../src/pages/cartPage';
import ProductDetailPage from '../src/pages/ProductDetailsPage';

const router = createBrowserRouter([
  {
    path: '/home',
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: '/',
    element: (
      <LandingPage></LandingPage>
      
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedAdmin>
        <AdminUserPage></AdminUserPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/dash',
    element: (
      <ProtectedAdmin>
        <AdminDashboardPage></AdminDashboardPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  
  {
    path: "login",
    element: (<LoginPage />),
  },
  {
    path: "signup",
    element: (<SignupPage />),
  },
  {
    path: "cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: '/product-detail/:id',
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: '/chatbot',
    element: (
      <Protected>
       <ChatBot></ChatBot>
      </Protected>
    ),
  },
  {
    path: '/order-success/:id',
    element: (
      <Protected>
         <OrderSuccessPage></OrderSuccessPage>
      </Protected>
     
    ),
  },
  {
    path: '/orders',
    element: (
     <Protected> <UserOrdersPage></UserOrdersPage></Protected>
      
    ),
  },
  {
    path: '/profile',
    element: (
      <Protected><UserProfilePage></UserProfilePage></Protected>
    ),
  },
  {
    path: '/logout',
    element: <Logout></Logout>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: '*',
    element: (
      <PageNotFound></PageNotFound>
    ),
  },
]);


function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user])
  return (
    <div className="App">


     
      <RouterProvider router={router} />


    </div>
  );
}

export default App;

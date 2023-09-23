import React from 'react';
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


import './App.css';

import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import CartPage from '../src/pages/cartPage';
import ProductDetailPage from '../src/pages/ProductDetailsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <Home></Home>
      </Protected>
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
  // {
  //   path: '/checkout',
  //   element: (
  //     <Protected>
  //       <Checkout></Checkout>
  //     </Protected>
  //   ),
  // },
  {
    path: '/product-detail/:id',
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: '/order-success/:id',
    element: (
      <OrderSuccessPage></OrderSuccessPage>
    ),
  },
  {
    path: '/orders',
    element: (
      <UserOrdersPage></UserOrdersPage>
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: '/profile',
    element: (
      <UserProfilePage></UserProfilePage>
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

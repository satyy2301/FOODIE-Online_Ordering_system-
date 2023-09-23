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
import UserOrders from './features/user/components/UserOrders';
import UserOrdersPage from './pages/UserOrderPage';


import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
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
    path: '*',
    element: (
      <PageNotFound></PageNotFound>
    ),
  },
]);


function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  },[dispatch, user])
  return (
    <div className="App">
      
        
    {/* <Home /> */}
    {/* <LoginPage></LoginPage> */}
    <RouterProvider router={router} />
       
    
    </div>
  );
}

export default App;

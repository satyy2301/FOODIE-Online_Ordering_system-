import React from 'react';
import Home from '../src/pages/Home'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

//import { Counter } from './features/counter/Counter';
import './App.css';
//import { ProductList } from './features/product_list/ProductList';
//import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from '../src/pages/cartPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home />
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
    element: (<CartPage />),
  },
  {
    path: "home",
    element: (<Home />),
  },
]);



function App() {
  return (
    <div className="App">
      
        
    {/* <Home /> */}
    {/* <LoginPage></LoginPage> */}
    <RouterProvider router={router} />
       
    
    </div>
  );
}

export default App;

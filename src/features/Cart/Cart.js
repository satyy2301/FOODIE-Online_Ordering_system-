import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { createOrderAsync, selectCurrentOrder } from "../order/orderSlice";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "./CartSlice";
import { selectLoggedInUser } from "../auth/authSlice";

import "./Cart.css";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate(); 
  const items = useSelector(selectItems);
  console.log(items);
  const user = useSelector(selectLoggedInUser);
  const currentOrder = useSelector(selectCurrentOrder);
   const totalAmount = items.reduce(
    (amount, item) =>(item.product.price * item.quantity) + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({id:item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id))
  }



    const handleRazorpayPayment = () => {
    const rzp = new window.Razorpay({
      key: "rzp_test_K5QtQTV0PmJilH", // Replace with your actual Razorpay key
      amount: totalAmount * 100, // Convert amount to paise
      currency: "INR",
      name: "JIIT Cafe",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: function (response) {
        console.log("Payment successful:", response);

        const order = {
          items,
          totalAmount,
          totalItems,
          user:user.id,
          status: "pending",
          // razorpayPaymentId: response.razorpay_payment_id,
          // razorpayOrderId: response.razorpay_order_id,
          // razorpaySignature: response.razorpay_signature,
        };

        dispatch(createOrderAsync(order));

        // navigate("/order-success/" + response.razorpay_order_id);
      },
      prefill: {
       // name: user.name,
        email: user.email,
       // contact: user.contact,
      },
      theme: {
        color: "#3399cc",
      },
    });

    rzp.open();
  };



  
  const handleOrder=(e)=>{
    const order={items,totalAmount,totalItems,user:user.id,status: 'pending'}
    
    dispatch(createOrderAsync(order))
       
  }
  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <div
        className="mx-auto mt-12  cart-box px-4 sm:px-6 lg:px-8 rounded-md"
        style={{ backgroundImage: "url(/cartbg.jpg)" }}
      >
        <div className="m-10 border-t bg-white border-gray-300 rounded-md px-4 py-6 sm:px-6">
          <h2 className="text-3xl font-semibold text-green-700 mb-4">
            Your Cart{" "}
          </h2>
          <div className="flow-root mt-4  ">
            <ul role="list" className="-my-4  divide-y divide-gray-300 ">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex py-4 bg-white rounded-lg shadow-md hover:shadow-lg my-4"
                >
                  <div className=" ml-4 mt-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-green-400">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between ">
                    <div className="flex justify-between text-lg font-semibold text-green-900">
                      <h3>
                        <Link
                          to={item.href}
                          className="text-green-700 hover:underline"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <div className="mr-14 p-4text-right">
                        <p className="text-green-700 font-semibold">
                          $ {item.product.price}
                        </p>
                        <p className="text-sm text-gray-500">{item.color}</p>
                      </div>
                    </div>
                    <div className="flex items-end justify-between mt-2">
                      <div className=" mb-6 text-gray-500">
                        <label
                          htmlFor="quantity"
                          className="inline text-sm font-medium text-green-900"
                        >
                          Qty
                        </label>
                        <select
                          onChange={(e) => handleQuantity(e, item)}
                          value={item.quantity}
                          className=" block w-16 rounded border border-green-300 focus:border-green-600 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition-transform hover:scale-105 duration-300 text-lg text-green-700 p-2 transform origin-center"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="m-4 text-center remove-button ">
                        <button
                          onClick={(e) => handleRemove(e, item.id)}
                          type="button"
                          className=""
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t bg-white m-3 border-gray-300 px-4 py-6 sm:px-6 rounded-md transition-transform duration-300 hover:shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between text-lg font-semibold text-green-700 mb-4">
            <div>
              <p>Subtotal</p>
              <p className="text-green-900">$ {totalAmount}</p>
            </div>
            <div>
              <p>Total Items in Cart</p>
              <p>{totalItems} items</p>
            </div>
          </div>
          <div className="mt-6">
          <div
          onClick={handleRazorpayPayment}
          className="flex items-center justify-center rounded-md border border-green-700 bg-green-700 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-green-800 cursor-pointer transition-transform hover:scale-105 duration-300"
        >
              <div style={{ width: "20px" }} className="mr-4">
                <svg
                  viewBox="0 0 24 24"
                  id="cart"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" />
                </svg>
              </div>
              Proceed to Checkout
            </div>
          </div>
          <div className="mt-6 flex justify-center text-center text-base text-green-700">
            <p>
              <Link to="/">
                <button
                  type="button"
                  className="text-green-700 hover:text-green-800 focus:outline-none transition-transform hover:scale-105 duration-300"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

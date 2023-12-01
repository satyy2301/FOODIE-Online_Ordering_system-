import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Signup.css"; // Import your updated styles
import { selectError, selectLoggedInUser, createUserAsync } from "../authSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="signup-background">
      <div className="navbar flex items-center justify-between w-full p-4 bg-yellow-400">
        <Link to="/" className="text-white text-xl font-semibold hover:text-yellow-500">
          <button className="button2">Home</button>
        </Link>
        <Link to="/login" className="py-2 px-4">
          <div className="button-nav">
            <button>
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
                  </svg>
                </div>
              </div>
              <span>Login</span>
            </button>
          </div>
        </Link>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center container-signup">
        {user && <Navigate to="/home" replace={true} />}

        <div className="max-w-md w-full bg-white p-8 rounded-4xl shadow-lg border-6 border-dotted border-black-500 p-5 signup-form">
          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/562/562678.png"
              alt="Your Company"
              className="w-auto mx-auto mb-1"
            />

            <div className="signup-container">
              
                  <text >
                    SignUp
                  </text>
               
               
            </div>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(createUserAsync({ email: data.email, password: data.password,name: data.name,contact: data.contact }));
            })}
            className="mt-0 rounded-lg max-w-md mx-auto form"
          >
            <div className="hover:scale-105 transform transition duration-1000">
              <label htmlFor="name" className="block text-lg font-bold  text-black-400">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  type="text"
                  className="input block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-600 focus:ring-2 hover:bg-white"
                />
                {errors.name && (
                  <p className="text-red-500 mt-2 heading">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div className="hover:scale-105 transform transition duration-1000">
              <label htmlFor="contact" className="block text-lg font-bold  text-black-400">
                Contact Number
              </label>
              <div className="mt-2">
                <input
                  id="contact"
                  {...register("contact", {
                    required: "Contact number is required",
                    pattern: {
                      value: /^[0-9]{10}$/i, 
                      message: "Invalid contact number",
                    },
                  })}
                  type="text"
                  className="input block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-600 focus:ring-2 hover:bg-white"
                />
                {errors.contact && (
                  <p className="text-red-500 mt-2 heading">{errors.contact.message}</p>
                )}
              </div>
            </div>
            <div className="hover:scale-105 transform transition duration-1000">
              <label htmlFor="email" className="block text-lg font-bold text-black-400">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "Invalid email format",
                    },
                  })}
                  type="email"
                  className="input block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-600 focus:ring-2 hover:bg-white"
                />
                {errors.email && (
                  <p className="text-red-500 mt-2 heading">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="hover:scale-105 transform transition duration-1000">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-lg font-bold  text-black-400">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  className="input block w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-600 focus:ring-2 hover:bg-white"
                />
                {errors.password && (
                  <p className="text-red-500 mt-2 heading">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn block w-full bg-yellow-400 text-white py-3 px-4 rounded-md font-semibold hover:bg-red-300 transform hover:scale-105 transition duration-1000 ease-in-out focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-2 signup-btn"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-black-400 ">
            Already a Member?{" "}
            <Link to="/login" className="text-white-600 hover:text-yellow-500 font-semibold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

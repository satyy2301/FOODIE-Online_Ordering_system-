import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "./ForgotPass.css";  // Import the new CSS file for styling

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // TODO: Implement the backend logic for email
  };

  return (
    <div>
      <div
        className="navbar flex items-center justify-between w-full p-4 bg-yellow-400"
        style={{ backgroundImage: "url(/homebg.svg)" }}
      >
        <Link
          to="./LandingPages"
          className="text-white text-xl font-semibold hover:text-yellow-500"
        >
          <button className="button2">Home</button>
        </Link>
      </div>
      <div className="container-forgot-password forgot-password-background">
        <div
          className="max-w-md w-full bg-white p-8 rounded shadow-lg border-6 border-dotted border-black-500 p-5 forgot-password-form"
          style={{ backgroundImage: "url(/loginbg.svg)" }}
        >
          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/562/562678.png"
              alt="Your Company"
              className="w-auto mx-auto mb-1"
            /><div className="container">
            <h2 className="heading">Enter email to reset your password</h2>
          </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form space-y-4 mt-6">
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email address
              </label>
              <input
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: 'Invalid email format',
                  },
                })}
                type="email"
                className="input w-full px-4 py-2 rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transform transition-transform hover:scale-105 duration-1000"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="btn-send-email w-full py-2 rounded-md bg-yellow-500 text-white font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transform transition-transform hover:scale-105 duration-1000"
              >
                Send Email
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-gray-500">
            Go back to{' '}
            <Link to="/login" className="text-red-600 hover:text-yellow-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

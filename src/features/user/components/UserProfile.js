import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import "./userprofile.css";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  return (
    
    <div className="flex items-center justify-center mt-20 w-400">
    <div className="relative flex flex-col w-400 rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      
      <div style={{
        backgroundImage:"url('user.jpg')",
        objectFit:"contains"
      }} className="relative mx-4 -mt-6 w-48 h-48 overflow-hidden rounded-full bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        < img src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg" 
        alt=""/>
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {user.name}
        </h5>
        <p className="block font-sans text-base font-bold leading-relaxed text-inherit antialiased">
         User Id : {user.id}
        </p>
        <p className="block font-sans text-base font-bold leading-relaxed text-inherit antialiased">
          Email : {user.email}
        </p>
        <p className="block font-sans text-base font-bold leading-relaxed text-inherit antialiased">
         contact : { user.contact}
        </p>
        <p className="block font-sans text-base font-bold leading-relaxed text-inherit antialiased">
         Points : {user.points}
        </p>
      </div>
      <div className="p-6 pt-0">
        <Link to='/orders'>
        <button
          data-ripple-light="true"
          type="button"
          className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          My Orders
        </button>
        </Link>
      </div>
    </div>
  </div>
  );
}

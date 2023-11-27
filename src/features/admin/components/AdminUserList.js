import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./AdminUserList.css";
import { fetchAllUsersAsync, selectAllusers } from "../../user/userSlice";

const AdminUserList = () => {
  const users=useSelector(selectAllusers);
  const dispatch = useDispatch();
  
  useEffect(() => {
   
      dispatch(fetchAllUsersAsync())
     
    
  }, [dispatch])

  return (
    <div className="responsive-container-block container">
      <div className="container">
        <svg viewBox="0 0 960 300" className="svg-userdata">
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="80%">
              LEADERBOARD
            </text>
          </symbol>
          <g className="g-ants">
            <use xlinkHref="#s-text" className="text-copy-2" />
            <use xlinkHref="#s-text" className="text-copy-2" />
            <use xlinkHref="#s-text" className="text-copy-2" />
            <use xlinkHref="#s-text" className="text-copy-2" />
            <use xlinkHref="#s-text" className="text-copy-2" />
          </g>
        </svg>
      </div>

      <div className="responsive-container-block ">
        {users && users.map((user)=> (
          <div
            key={user.id}
            className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105 hover:rotate-2"
          >
            <div className="card">
              <div className="team-image-wrapper flex items-center justify-center">
                <img
                  className="mb-10 top-5 h-20 w-20 rounded-full relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-transform transform scale-100 hover:scale-110 hover:bg-gray-700 hover:ring-4 hover:ring-white hover:ring-opacity-50"
                  src={user.imageUrl}
                  alt=""
                />
              </div>
              <div className="profile-details ml-3 bg-white p-4 rounded-md shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
                <h5 className="profile-name text-lg font-semibold mb-2">
                  User ID: {user.id ? user.id : "New User"}
                </h5>
                <p className="profile-mail text-gray-600 mb-4">
                  Email Address: {user.email}
                </p>

                <div className="mt-3">
                  <h3 className="text-xl font-bold text-red-900">
                    User Points: {user.points}
                  </h3>
                </div>
              </div>

              <div className="social-icons mt-5">
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="twitter-icon"
                    src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/Icon.svg"
                    alt="Twitter Icon"
                  />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="facebook-icon"
                    src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/Icon-1.svg"
                    alt="Facebook Icon"
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUserList;

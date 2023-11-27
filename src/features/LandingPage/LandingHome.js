import React from "react";
import BannerBackground from "./Assets/home-banner-background.png";
import BannerImage from "./Assets/home-banner-image.png";
import Navbar from "./LandingNav"
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const LandingHome = () => {
  return (
    <div className="home-container">
      {/* <Navbar /> */}
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your Favourite Food Pre Ordered Hot & Fresh
          </h1>
          <p className="primary-text">
          Experience delicious canteen cuisine prepared with care, hot and fresh dishes packed with a variety of essential nutrients.
          </p>
          <Link to ='/home'>
          <button className="secondary-button">
            Order Now <FiArrowRight />{" "}
          </button>
          </Link>
          
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LandingHome;

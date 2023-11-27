import React from "react";
import AboutBackground from "./Assets/about-background.png";
import AboutBackgroundImage from "./Assets/about-background-image.png";


const About = () => {
  return (
    <div id ="about" className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Food Is An Important Part Of A Balanced Diet
        </h1>
        <p className="primary-text">
        Unlocking the Power of Health in Your Student Journey! In the hustle and bustle of student life, we've crafted the ultimate solution – our online canteen system. 
        </p>
        <p className="primary-text">
        Say goodbye to long lines and hello to more time for you. With a menu designed for your well-being, we serve up nutritious, delicious meals that nourish your body and mind. Fuel your ambitions, save time, and thrive in the fast-paced world of academia. It's not just food; it's your secret to success!
        </p>
        
      </div>
    </div>
  );
};

export default About;

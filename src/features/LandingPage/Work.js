import React from "react";
import PickMeals from "./Assets/pick-meals-image.png";
import ChooseMeals from "./Assets/choose-image.png";
import DeliveryMeals from "./Assets/delivery-image.png";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Pick Meals",
      text: "Pre-pick your meals before your class even ends, ensuring that a delectable, nourishing meal is ready to fuel you right when you need it.",
    },
    {
      image: ChooseMeals,
      title: "Student First Policy",
      text: "Where every moment matters, because students always come first. ",
    },
    {
      image: DeliveryMeals,
      title: "Save Time",
      text: " Time-saving feature of our website: Say goodbye to long queues and crowded spaces, and hello to a more convenient, stress-free dining experience.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        Our website collaborates closely with college departments to streamline the dining experience for students. By integrating with the college's dining services, we've devised a seamless process that eliminates the need to stand in long queues. Students can now conveniently place their orders online, selecting from a variety of wholesome, nutrient-packed options.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;

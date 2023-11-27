import React from "react";
import { Routes, Route } from "react-router-dom";

import "./Landingpage.css";
import Home from "../features/LandingPage/LandingHome";
import About from "../features/LandingPage/About";
import Work from "../features/LandingPage/Work";
import Footer from "../features/LandingPage/FooterLanding";

function Landingpage() {
  return (
    <div className="App-landing">
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
      </Routes>
      <Footer/>
    </div>
  );
}

function Homepage(){
  return (
    <>
    <Home/>
    <About/>
    <Work/>
    </>
  );
}


export default Landingpage;

import React from "react";
import Slider from "../Slider/Slider";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import PopularClasses from "../PopularClasses/PopularClasses";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Sporting Life | Home</title>
      </Helmet>
      <Slider></Slider>
      <PopularInstructor></PopularInstructor>
      <PopularClasses></PopularClasses>
    </div>
  );
};

export default Home;

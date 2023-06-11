import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Slider = () => {
  return (
    <Carousel className="pt-16">
      <div>
        <img src="https://i.ibb.co/n02Lrw5/football-campaign.png" />
      </div>
      <div>
        <img src="https://i.ibb.co/7pxR9yy/basketball-campaign.png" />
      </div>
      <div>
        <img src="https://i.ibb.co/jb3LnPj/cricket-campaign.png" />
      </div>
    </Carousel>
  );
};

export default Slider;

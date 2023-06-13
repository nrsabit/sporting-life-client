import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="my-8 md:mt-8 p-12 max-w-7xl mx-auto md:px-36 bg-base-200 md:flex md:flex-col md:items-center md:justify-center">
      <Helmet>
        <title>Sporting Life | 404</title>
      </Helmet>
      <Link to="/">
        <button className="btn mb-5 border-none bg-[#213644] text-[#c6ab7c] outline-0 text-center">
          Back to Home
        </button>
      </Link>
      <img
        className="rounded shadow-lg text-center"
        src="https://i.ibb.co/zmN2qGg/404-page.gif"
        alt=""
      />
    </div>
  );
};

export default NotFound;

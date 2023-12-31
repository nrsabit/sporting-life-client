import React from "react";
import useMyClasses from "../../../hooks/useMyClasses";
import { Helmet } from "react-helmet-async";
import MyClassCard from "./MyClassCard";

const MyClasses = () => {
  const [myAllClasses, refetch, isLoading] = useMyClasses();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <img
          className="mx-auto"
          src="https://i.ibb.co/GFy0712/loading.gif"
          alt=""
        />
      </div>
    );
  }

  if (myAllClasses.length === 0 && !isLoading) {
    return (
      <h2 className="text-4xl font-bold  text-center my-10">
        No Classes Found
      </h2>
    );
  }

  return (
    <div className="w-full p-8 md:w-3/5 mx-auto">
      <Helmet>
        <title>Sporting Life | My Classes</title>
      </Helmet>
      <h2 className="text-4xl font-bold  text-center my-10">
        My Classes
      </h2>
      {myAllClasses.map((classItem) => (
        <MyClassCard key={classItem._id} classItem={classItem}></MyClassCard>
      ))}
    </div>
  );
};

export default MyClasses;

import axios from "axios";
import React, { useEffect, useState } from "react";

const PopularInstructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/instructors?limit=true")
      .then((data) => setInstructors(data.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-16 md:flex">
      <div className="flex justify-center items-center md:w-1/5">
        <h2 className="text-3xl mb-8 md:mb-0 font-semibold  text-center">
          Popular Instructors
        </h2>
      </div>
      <div className="md:w-4/5 grid grid-cols-1 md:grid-cols-3 gap-8">
        {instructors?.map((Instructor) => (
          <div
            key={Instructor._id}
            className="card card-compact w-full bg-base-100 shadow-xl"
          >
            <figure>
              <img src={Instructor.image} alt="Instructor" className="h-48" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{Instructor.name}</h2>
              <p>Number of Classes: {Instructor.numberOfClasses}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructor;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/classes")
      .then((data) => setClasses(data.data));
  }, []);
  return (
    <div className="max-w-7xl mx-auto py-16">
      <Helmet>
        <title>Sporting Life | Classes</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-[#213644] text-center my-10">
        Classes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {classes?.map((classItem) => (
          <div
            key={classItem._id}
            className="card card-compact w-full bg-base-100 shadow-xl"
          >
            <figure>
              <img src={classItem.image} alt="Instructor" className="h-48" />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-[#213644]">{classItem.name}</h2>
              <p className="text-[#213644] font-bold">
                Instructor:{" "}
                <span className="font-normal">{classItem.instructorName}</span>
              </p>
              <p className="text-[#213644] font-bold">
                Available Seats:{" "}
                <span className="font-normal">{classItem.availableSeats}</span>
              </p>
              <p className="text-[#213644] font-bold">
                Price: <span className="font-normal">${classItem.price}</span>
              </p>
              <button className="btn btn-sm mt-2  bg-[#213644] hover:bg-[#747161] text-white">
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;

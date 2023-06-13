import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/classes?top=true")
      .then((data) => setClasses(data.data));
  }, []);

  return (
    <div className="max-w-7xl bg-base-200 rounded mx-auto py-16 md:flex md:flex-row-reverse">
      <div className="flex justify-center items-center md:w-1/5">
        <h2 className="text-3xl mb-8 md:mb-0 font-semibold  text-center">
          Popular Classes
        </h2>
      </div>
      <div className="md:w-4/5 grid grid-cols-1 md:grid-cols-3 gap-8">
        {classes?.map((classItem) => (
          <motion.div
            initial={{ y: 100, scale: 0.8 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ ease: "easeOut", duration: 2 }}
            key={classItem._id}
            className="card card-compact w-full bg-base-100 shadow-xl"
          >
            <figure>
              <img src={classItem.image} alt="Instructor" className="h-48" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{classItem.name}</h2>
              <p>Number of Students: {classItem.numberOfStudents}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PopularInstructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios
      .get("https://sporting-life-server.vercel.app/instructors?limit=true")
      .then((data) => setInstructors(data.data));
  }, []);

  return (
    <div className="max-w-7xl rounded mx-auto bg-base-300 bg-[url('https://i.ibb.co/qCSCzd6/teacher-2454399-1920.jpg')] bg-cover bg-center bg-blend-overlay bg-opacity-70">
      <div className="max-w-5xl rounded mx-auto py-16 px-5">
        <div className="flex justify-center items-center">
          <h2 className="text-3xl mb-8 font-bold text-center">
            Popular Instructors
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instructors?.map((Instructor) => (
            <motion.div
              initial={{ opacity: 0, top: 50 }}
              whileInView={{ opacity: 1, top: 0 }}
              viewport={{ once: false }}
              transition={{ ease: "easeOut", duration: 1 }}
              key={Instructor._id}
              className="card card-compact border-2 border-[#c6ab7c] bg-base-100 shadow-md shadow-[#c6ab7c]"
            >
              <figure>
                <img src={Instructor.image} alt="Instructor" className="h-48" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{Instructor.name}</h2>
                <p>Number of Classes: {Instructor.numberOfClasses}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularInstructor;

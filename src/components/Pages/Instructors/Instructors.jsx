import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios
      .get("https://sporting-life-server.vercel.app/instructors")
      .then((data) => setInstructors(data.data));
  }, []);
  return (
    <div className="max-w-7xl mx-auto py-16 px-8">
      <Helmet>
        <title>Sporting Life | Instructors</title>
      </Helmet>
      <h2 className="text-4xl font-bold  text-center my-10">Instructors</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {instructors?.map((instructor) => (
          <motion.div
            initial={{ y: 100, scale: 0.8 }}
            whileInView={{ y: 0, scale: 1 }}
            viewport={{ once: false }}
            transition={{ ease: "easeOut", duration: 1 }}
            key={instructor._id}
            className="card card-compact w-full bg-base-100 shadow-xl"
          >
            <figure>
              <img src={instructor.image} alt="Instructor" className="h-48" />
            </figure>
            <div className="card-body">
              <h2 className="card-title ">{instructor.name}</h2>
              <p className=" font-bold">
                Email: <span className="font-normal">{instructor.email}</span>
              </p>
              <p className=" font-bold">
                Number of Classes:{" "}
                <span className="font-normal">
                  {instructor.numberOfClasses}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;

import React, { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const EnrolledClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: enrolledClasses = [], isLoading } = useQuery(
    ["enrolled"],
    async () => {
      if (!loading && user?.email) {
        const res = await axiosSecure.get(`/enrolled?email=${user?.email}`);
        return res.data;
      }
    }
  );

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

  if (enrolledClasses.length === 0 && !isLoading) {
    return (
      <h2 className="text-4xl font-bold  text-center my-10">
        No Enrolled Classes Found
      </h2>
    );
  }

  return (
    <div className="p-8">
      <Helmet>
        <title>Sporting Life | Enrolled Classes</title>
      </Helmet>
      <h2 className="text-4xl font-bold  text-center my-10">
        My Enrolled Classes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {enrolledClasses.map((classItem) => (
          <motion.div
            initial={{ y: 100, rotate: 20 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ ease: "easeOut", duration: 2 }}
            key={classItem._id}
            className={`card card-compact w-full shadow-xl bg-base-100`}
          >
            <figure>
              <img src={classItem.image} alt="Instructor" className="h-48" />
            </figure>
            <div className="card-body">
              <h2 className="card-title ">{classItem.name}</h2>
              <p className=" font-bold">
                Instructor:{" "}
                <span className="font-normal">{classItem.instructorName}</span>
              </p>
              <p className=" font-bold">
                Price: <span className="font-normal">${classItem.price}</span>
              </p>
              <p className=" font-bold">
                Status:{" "}
                <span className="font-normal text-green-500">
                  {classItem.status}
                </span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledClasses;

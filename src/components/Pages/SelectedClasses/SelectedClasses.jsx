import React from "react";
import useSelected from "../../../hooks/useSelected";
import Swal from "sweetalert2";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SelectedClasses = () => {
  const [SelectedClass = [], refetch, isLoading] = useSelected();

  const handleDeleteClass = (classItem) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://sporting-life-server.vercel.app/selected/${classItem._id}`)
          .then((data) => {
            if (data.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your Class has been deleted.", "success");
              refetch();
            }
          });
      }
    });
  };

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

  if (SelectedClass.length === 0 && !isLoading) {
    return (
      <h2 className="text-4xl font-bold  text-center my-10">
        No Selected Classes Found
      </h2>
    );
  }

  return (
    <div className="p-8">
      <Helmet>
        <title>Sporting Life | Selected Classes</title>
      </Helmet>
      <h2 className="text-4xl font-bold  text-center my-10">
        My Selected Classes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SelectedClass.map((classItem) => (
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
              <div className="flex justify-between items-center mt-2">
                <Link to={`/dashboard/payment/${classItem._id}`}>
                  <button className="btn btn-sm bg-[#213644] text-[#c6ab7c]">
                    Pay
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteClass(classItem)}
                  className="btn btn-sm bg-red-500 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SelectedClasses;

import React, { useRef } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ManageUserCard = ({ user, refetch }) => {
  const { image, name, role, email, _id } = user;
  const axiosSecure = useAxiosSecure();

  const handleUpdateUser = (role) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/update-user/${_id}?role=${role}`).then((data) => {
          if (data.data.modifiedCount > 0) {
            Swal.fire("Updated!", "User Role Updated Successfully", "success");
            refetch();
          }
        });
      }
    });
  };

  return (
    <motion.div
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 2 }}
      className={`rounded p-4 shadow-lg mb-6 md:flex gap-4  bg-base-100`}
    >
      <div className="flex flex-col justify-center items-center md:w-1/3">
        <img className="w-40 h-40 rounded-full" src={image} alt="" />
      </div>
      <div className="flex flex-col justify-center items-center my-4 md:my-0 md:w-1/3">
        <h3 className="text-2xl font-semibold text-center">{name}</h3>
        <p className="font-bold text-center my-2">
          Email: <span className="font-normal">{email}</span>
        </p>
        <p className="font-bold text-center">
          Role: <span className="font-normal">{role}</span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center md:w-1/3">
        <button
          onClick={() => handleUpdateUser("admin")}
          disabled={role === "admin"}
          className="btn btn-sm bg-green-500 text-white"
        >
          Make Admin
        </button>
        <button
          onClick={() => handleUpdateUser("instructor")}
          disabled={role === "instructor"}
          className="btn btn-sm mt-2 bg-blue-700 text-white"
        >
          Make Instructor
        </button>
      </div>
    </motion.div>
  );
};

export default ManageUserCard;

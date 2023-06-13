import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ManageClassCard = ({ classItem, refetch }) => {
  const {
    image,
    name,
    status,
    numberOfStudents,
    availableSeats,
    instructorName,
    instructorEmail,
    price,
    _id,
  } = classItem;
  const axiosSecure = useAxiosSecure();
  const feedbackRef = useRef();

  const handleUpdateStatus = (status) => {
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
        axiosSecure
          .patch(`/update-class-status/${_id}?status=${status}`)
          .then((data) => {
            if (data.data.modifiedCount > 0) {
              Swal.fire(
                "Updated!",
                "Class Status has been Updated.",
                "success"
              );
              refetch();
            }
          });
      }
    });
  };

  const handleSendFeedback = () => {
    if (feedbackRef.current.value === "") {
      return;
    }
    console.log(feedbackRef.current.value);
    axiosSecure
      .patch(`/update-feedback/${_id}`, {
        feedback: feedbackRef.current.value,
      })
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          Swal.fire("Updated!", "Feedback Sent ", "success");
          refetch();
          feedbackRef.current.value = "";
        }
      });
  };

  return (
    <motion.div
      initial={{ y: 100, rotate: -20 }}
      animate={{ y: 0, rotate: 0 }}
      transition={{ ease: "easeOut", duration: 2 }}
      className={`rounded custom-bg p-4 shadow-lg mb-6 md:flex gap-4  ${
        (status === "approved" && "bg-green-400") ||
        (status === "pending" && "bg-yellow-400") ||
        (status === "denied" && "bg-red-400")
      }`}
    >
      {/* Modal Start  */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="feedback_modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Send Feedback for {classItem.name}
          </h3>
          <textarea
            ref={feedbackRef}
            name="feedback"
            className="textarea textarea-bordered w-full mt-2"
            placeholder="Feedback"
          ></textarea>
          <div className="modal-action">
            <label
              onClick={handleSendFeedback}
              htmlFor="feedback_modal"
              className="btn btn-sm my-2 bg-[#213644] text-[#c6ab7c]"
            >
              Send
            </label>
          </div>
        </div>
      </div>
      {/* Modal End  */}
      <div className="flex flex-col justify-center items-center md:w-1/3">
        <img className="rounded" src={image} alt="" />
        <h3 className="text-2xl font-semibold text-center">{name}</h3>
      </div>
      <div className="flex flex-col justify-center items-center my-4 md:my-0 md:w-1/3">
        <p className="font-bold text-center">
          Instructor Name: <span className="font-normal">{instructorName}</span>
        </p>
        <p className="font-bold text-center">
          Instructor Email:{" "}
          <span className="font-normal">{instructorEmail}</span>
        </p>
        <p className="font-bold">
          Status: <span className="font-normal">{status}</span>
        </p>
        <p className="font-bold">
          Enrolled Students:{" "}
          <span className="font-normal">{numberOfStudents}</span>
        </p>
        <p className="font-bold">
          Available Seats: <span className="font-normal">{availableSeats}</span>
        </p>
        <p className="font-bold">
          Price: <span className="font-normal">${price}</span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center md:w-1/3">
        <button
          onClick={() => handleUpdateStatus("approved")}
          disabled={status === "approved" || status === "denied"}
          className="btn btn-sm bg-green-500 text-white"
        >
          Approve
        </button>
        <label
          htmlFor="feedback_modal"
          className="btn btn-sm my-2 bg-[#213644] text-[#c6ab7c]"
        >
          Send Feedback
        </label>
        <button
          onClick={() => handleUpdateStatus("denied")}
          disabled={status === "approved" || status === "denied"}
          className="btn btn-sm bg-red-500 text-white"
        >
          Deny
        </button>
      </div>
    </motion.div>
  );
};

export default ManageClassCard;

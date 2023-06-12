import React from "react";

const MyClassCard = ({ classItem }) => {
  const {
    image,
    name,
    status,
    feedback,
    numberOfStudents,
    availableSeats,
    price,
  } = classItem;
  return (
    <div
      className={`rounded p-4 shadow-lg mb-6 md:flex gap-4 text-[#213644] ${
        (status === "approved" && "bg-green-400") ||
        (status === "pending" && "bg-yellow-400") ||
        (status === "denied" && "bg-red-400")
      }`}
    >
      <div className="flex justify-center items-center md:w-1/3">
        <img className="rounded" src={image} alt="" />
      </div>
      <div className="flex flex-col justify-center items-center my-4 md:my-0 md:w-1/3">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-[#213644] font-bold">
          Status: <span className="font-normal">{status}</span>
        </p>
        <p className="text-[#213644] font-bold">
          Enrolled Students:{" "}
          <span className="font-normal">{numberOfStudents}</span>
        </p>
        <p className="text-[#213644] font-bold">
          Available Seats: <span className="font-normal">{availableSeats}</span>
        </p>
        <p className="text-[#213644] font-bold">
          Price: <span className="font-normal">${price}</span>
        </p>
      </div>
      <div className="flex flex-col justify-center items-center md:w-1/3">
        <h3 className="text-2xl font-semibold">Feedback</h3>
        <p>{feedback ? feedback : "No Feedback Found"}</p>
        <button
          disabled={status === "approved"}
          className="btn btn-sm mt-4 bg-[#213644] text-[#c6ab7c]"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default MyClassCard;

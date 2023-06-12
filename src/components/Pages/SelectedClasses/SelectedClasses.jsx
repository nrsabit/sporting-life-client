import React from "react";
import useSelected from "../../../hooks/useSelected";
import Swal from "sweetalert2";
import axios from "axios";

const SelectedClasses = () => {
  const [SelectedClass = [], refetch] = useSelected();

  const handlePayment = (classItem) => {};
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
          .delete(`http://localhost:5000/selected/${classItem._id}`)
          .then((data) => {
            if (data.data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your Class has been deleted.", "success");
              refetch();
            }
          });
      }
    });
  };

  if (SelectedClass.length === 0) {
    return (
      <h2 className="text-4xl font-bold text-[#213644] text-center my-10">
        No Selected Classes Found
      </h2>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold text-[#213644] text-center my-10">
        My Selected Classes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SelectedClass.map((classItem) => (
          <div
            key={classItem._id}
            className={`card card-compact w-full shadow-xl bg-base-100`}
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
                Price: <span className="font-normal">${classItem.price}</span>
              </p>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => handlePayment(classItem)}
                  className="btn btn-sm bg-[#213644] text-[#c6ab7c]"
                >
                  Pay
                </button>
                <button
                  onClick={() => handleDeleteClass(classItem)}
                  className="btn btn-sm bg-red-500 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedClasses;

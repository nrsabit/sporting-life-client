import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = false;
  const isInstructor = false;
  // TODO: isAdmin and isInstructor must be varified via api calls and jwt

  useEffect(() => {
    axios
      .get("http://localhost:5000/classes")
      .then((data) => setClasses(data.data));
  }, []);

  const handleSelectClass = (classItem) => {
    if (user && user.email) {
      const selectedClass = {
        image: classItem.image,
        name: classItem.name,
        classId: classItem._id,
        instructorName: classItem.instructorName,
        instructorEmail: classItem.instructorEmail,
        email: user.email,
        price: classItem.price
      };
      axios
        .post("http://localhost:5000/select-class", selectedClass)
        .then((data) => {
          if (data.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Class Selected",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Do You want to login?",
        text: "You won't be able to select a class without login",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {state: {from: location}});
        }
      });
    }
  };

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
            className={`card card-compact w-full shadow-xl ${
              classItem.availableSeats === 0 ? "bg-red-400" : "bg-base-100"
            } `}
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
              <button
                onClick={() => handleSelectClass(classItem)}
                disabled={
                  isAdmin || isInstructor || classItem.availableSeats === 0
                    ? true
                    : false
                }
                className="btn btn-sm mt-2  bg-[#213644] hover:bg-[#747161] text-white"
              >
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

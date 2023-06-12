import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const img_upload_token = import.meta.env.VITE_Image_Upload_Token;
  const img_upload_url = `https://api.imgbb.com/1/upload?&key=${img_upload_token}`;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, instructorName, instructorEmail, availableSeats, price } =
      data;
    const formData = new FormData();
    formData.append("image", data.image[0]);
    axios.post(img_upload_url, formData).then((data) => {
      if (data.data.success) {
        const imgURL = data.data.data.display_url;
        const newClass = {
          name,
          price: parseFloat(price),
          instructorName,
          instructorEmail,
          image: imgURL,
          status: "pending",
          availableSeats: parseFloat(availableSeats),
          numberOfStudents: 0,
          feedback: null,
        };
        console.log(newClass);
        axiosSecure.post("/classes", newClass).then((res) => {
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "New Class Added Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard/my-classes");
          }
        });
      }
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold text-[#213644] text-center my-10">
        Add a Class
      </h2>
      <div className="w-full md:w-3/5 mx-auto p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">
                Class Name<span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Type Class Name"
              {...register("name", { required: true })}
              name="name"
              className="input input-bordered"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 mt-2">Class Name is required</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">
                Instructor Email<span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="email"
              readOnly
              value={user?.email}
              placeholder="Type Email Here"
              {...register("instructorEmail", { required: true })}
              name="instructorEmail"
              className="input input-bordered bg-base-200"
            />
            {errors.instructorEmail?.type === "required" && (
              <p className="text-red-500 mt-2">Instructor Email is required</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">
                Instructor Name<span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              readOnly
              value={user?.displayName}
              placeholder="Type Instructor Name"
              {...register("instructorName", { required: true })}
              name="instructorName"
              className="input input-bordered bg-base-200"
            />
            {errors.instructorName?.type === "required" && (
              <p className="text-red-500 mt-2">Instructor Name is required</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">
                Available Seats<span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="number"
              placeholder="Type Available Seats"
              {...register("availableSeats", { required: true })}
              name="availableSeats"
              className="input input-bordered"
            />
            {errors.availableSeats?.type === "required" && (
              <p className="text-red-500 mt-2">Available Seats is required</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">
                Price<span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="number"
              placeholder="Type Price"
              {...register("price", { required: true })}
              name="price"
              className="input input-bordered"
            />
            {errors.price?.type === "required" && (
              <p className="text-red-500 mt-2">Price is required</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">
                Class Image<span className="text-red-500">*</span>
              </span>
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input bg-[#c6ab7c]  file-input-bordered w-full max-w-xs"
            />
            {errors.image && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control mt-6">
            <input
              className="btn btn-primary text-[#c6ab7c] bg-[#213644] border-0"
              type="submit"
              value="Add Class"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;

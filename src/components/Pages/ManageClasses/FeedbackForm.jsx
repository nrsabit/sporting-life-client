import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const FeedbackForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const feedbackClass = location.state.feedbackClass;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axiosSecure
      .patch(`/update-feedback/${feedbackClass._id}`, {
        feedback: data.feedback,
      })
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          Swal.fire("Updated!", "Feedback Sent ", "success");
          reset();
          navigate("/dashboard/manage-classes");
        }
      });
  };

  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold  text-center my-10">
        Send Feedback to {feedbackClass.name}
      </h2>
      <div className="w-full md:w-3/5 mx-auto p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">
                Feedback<span className="text-red-500">*</span>
              </span>
            </label>
            <textarea
              type="text"
              placeholder="Type Feedback Here"
              {...register("feedback", { required: true })}
              name="feedback"
              className="input input-bordered min-h-[200px]"
            />
            {errors.feedback?.type === "required" && (
              <p className="text-red-500 mt-2">Feedback is required</p>
            )}
          </div>
          <div className="form-control mt-6">
            <input
              className="btn btn-primary text-[#c6ab7c] bg-[#213644] hover:bg-[#747161] border-0"
              type="submit"
              value="Send"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;

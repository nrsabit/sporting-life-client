import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import axios from "axios";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";

const Register = () => {
  const [password, setPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const { signUp, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newUser = {
      email: data.email,
      name: data.name,
      image: data.photo,
      phone: data.phone,
      address: data.address,
      role: "user",
    };
    signUp(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photo).then(() => {
          axios.post("http://localhost:5000/users", newUser).then((data) => {
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully Registered",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        });
      })
      .catch((error) => {
        if (error) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "User Already Exists",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handlePasswordMatch = (event) => {
    if (password !== event.target.value) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  return (
    <div className="hero min-h-screen py-16 bg-base-200">
      <Helmet>
        <title>Sporting Life | Sign Up</title>
      </Helmet>
      <div className="hero-content w-4/5 flex-col lg:flex-row justify-between">
        <div className="text-center md:w-2/5 lg:text-left">
          <img
            className="rounded shadow-lg"
            src="https://i.ibb.co/92vr9bw/signup.jpg"
            alt=""
          />
        </div>
        <div className="card md:w-2/5 bg-base-200 rounded-lg shadow-xl p-8">
          <h4 className="text-4xl font-bold text-center my-4">Sign Up</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Name<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Type Name Here"
                {...register("name", { required: true })}
                name="name"
                className="input input-bordered"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 mt-2">Name is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Email<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="email"
                placeholder="Type Email Here"
                {...register("email", { required: true })}
                name="email"
                className="input input-bordered"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 mt-2">Email is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Photo URL<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Type URL Here"
                {...register("photo", { required: true })}
                name="photo"
                className="input input-bordered"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500 mt-2">Photo URL is required</p>
              )}
            </div>
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-bold">
                  Password<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="password"
                placeholder="Type Your Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                  onBlur: (e) => setPassword(e.target.value),
                })}
                name="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 mt-2">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 mt-2">
                  Password must be 6 characters or more
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 mt-2">
                  Password must contain 1 capital letter and 1 special character
                </p>
              )}
            </div>
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-bold">
                  Confirm Password<span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirm", {
                  required: true,
                  onBlur: handlePasswordMatch,
                })}
                name="confirm"
                className="input input-bordered"
              />
              {errors.confirm?.type === "required" && (
                <p className="text-red-500 mt-2">
                  Confirm Password is required
                </p>
              )}
              {passwordMatchError && (
                <p className="text-red-500 mt-2">Password didn't match</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Phone Number</span>
              </label>
              <input
                type="text"
                placeholder="Type Number Here"
                {...register("phone")}
                name="phone"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Address</span>
              </label>
              <input
                type="text"
                placeholder="Type Address Here"
                {...register("address")}
                name="address"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <input
                disabled={passwordMatchError}
                className="btn btn-primary text-[#c6ab7c] bg-[#213644] border-0"
                type="submit"
                value="Sign Up"
              />
            </div>
          </form>
          <p className="text-center  mt-4">
            Already Have an Account?{" "}
            <Link to="/login">
              <span className="font-bold">Login Now</span>
            </Link>{" "}
          </p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;

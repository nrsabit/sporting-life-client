import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const Login = () => {
  const [error, setError] = useState();
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="hero min-h-screen py-16 bg-base-200">
      <Helmet>
        <title>Sporting Life | Login</title>
      </Helmet>
      <div className="hero-content w-4/5 flex-col lg:flex-row justify-between">
        <div className="text-center md:w-2/5 lg:text-left">
          <img
            className="rounded shadow-lg"
            src="https://i.ibb.co/6gkjgxS/login.jpg"
            alt=""
          />
        </div>
        <div className="card md:w-2/5 bg-base-200 rounded-lg shadow-xl p-8">
          <h4 className="text-4xl font-bold text-center my-4">Login</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="text"
                placeholder="Type Email Here"
                {...register("email", { required: true })}
                name="email"
                className="input input-bordered"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 mt-2">Email is required</p>
              )}
            </div>
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                placeholder="Type Your Password"
                {...register("password", { required: true })}
                name="password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 mt-2">Password is required</p>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                disabled={error}
                className="btn btn-primary text-[#c6ab7c] bg-[#213644] border-0"
                type="submit"
                value="Login"
              />
            </div>
          </form>
          <p className="text-center text-[#213644] mt-4">
            New here?{" "}
            <Link to="/register">
              <span className="font-bold">Create a New Account</span>
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

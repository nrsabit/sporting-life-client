import React, { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const url = location?.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn().then((data) => {
      const loggedInUser = {
        name: data.user.displayName,
        email: data.user.email,
        image: data.user.photoURL,
        role: "user",
      };
      axios.post("https://sporting-life-server.vercel.app/users", loggedInUser)
        .then((data) => {
          if (data.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Google SignUp Completed",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Google SignIn Completed",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          navigate(url);
        });
    });
  };
  return (
    <div>
      <div className="divider"></div>
      <div className="text-center">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-circle bg-[#213644] text-[#c6ab7c] border-0"
        >
          <FaGoogle></FaGoogle>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;

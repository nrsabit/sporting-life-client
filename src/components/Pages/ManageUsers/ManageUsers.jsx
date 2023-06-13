import React, { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import ManageUserCard from "./ManageUserCard";

const ManageUsers = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: allUsers = [],
    refetch,
    isLoading,
  } = useQuery(["users"], async () => {
    if (!loading && user?.email) {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <img
          className="mx-auto"
          src="https://i.ibb.co/GFy0712/loading.gif"
          alt=""
        />
      </div>
    );
  }

  if (allUsers.length === 0 && !isLoading) {
    return (
      <h2 className="text-4xl font-bold text-[#213644] text-center my-10">
        No Users Found
      </h2>
    );
  }
  return (
    <div className="w-full p-8 md:w-3/5 mx-auto">
      <Helmet>
        <title>Sporting Life | Manage Users</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-[#213644] text-center my-10">
        Manage Users
      </h2>
      {allUsers.map((user) => (
        <ManageUserCard
          key={user._id}
          user={user}
          refetch={refetch}
        ></ManageUserCard>
      ))}
    </div>
  );
};

export default ManageUsers;

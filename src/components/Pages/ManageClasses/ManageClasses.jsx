import React, { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ManageClassCard from "./ManageClassCard";
import { Helmet } from "react-helmet-async";

const ManageClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: allClasses = [],
    refetch,
    isLoading,
  } = useQuery(["all-classes"], async () => {
    if (!loading && user?.email) {
      const res = await axiosSecure.get(`/all-classes`);
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

  if (allClasses.length === 0 && !isLoading) {
    return (
      <h2 className="text-4xl font-bold text-[#213644] text-center my-10">
        No Enrolled Classes Found
      </h2>
    );
  }
  return (
    <div className="w-full p-8 md:w-3/5 mx-auto">
      <Helmet>
        <title>Sporting Life | Manage Classes</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-[#213644] text-center my-10">
        Manage Classes
      </h2>
      {allClasses.map((classItem) => (
        <ManageClassCard
          key={classItem._id}
          classItem={classItem}
          refetch={refetch}
        ></ManageClassCard>
      ))}
    </div>
  );
};

export default ManageClasses;

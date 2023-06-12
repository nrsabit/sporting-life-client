import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useMyClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: myAllClasses = [], refetch } = useQuery({
    queryKey: ["my-classes", user?.email],
    queryFn: async () => {
      if (!loading && user?.email) {
        const res = await axiosSecure.get(`/my-classes?email=${user?.email}`);
        return res.data;
      }
    },
    enabled: !loading && !!user?.email,
  });
  return [myAllClasses, refetch];
};

export default useMyClasses;

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useSelected = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: selectedClass = [], refetch, isLoading } = useQuery({
    queryKey: ["selected", user?.email],
    queryFn: async () => {
      if (!loading && user?.email) {
        const res = await axiosSecure.get(`/selected?email=${user?.email}`);
        return res.data;
      }
    },
    enabled: !loading && !!user?.email,
  });
  return [selectedClass, refetch, isLoading];
};

export default useSelected;

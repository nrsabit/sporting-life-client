import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useSingleUser = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: loggedUser = null, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!loading && user?.email) {
        const res = await axiosSecure.get(`/user?email=${user?.email}`);
        return res.data;
      }
    },
    enabled: !loading && !!user?.email,
  });
  return [loggedUser, isUserLoading];
};

export default useSingleUser;

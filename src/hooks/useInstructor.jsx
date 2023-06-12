import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useInstructor = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ["instructor", user?.email],
    queryFn: async () => {
      if (!loading && user?.email) {
        const res = await axiosSecure.get(`/user/instructor/${user?.email}`);
        return res.data.instructor;
      }
    },
    enabled: !loading && !!user?.email,
  });
  return [isInstructor, isInstructorLoading];
};

export default useInstructor;

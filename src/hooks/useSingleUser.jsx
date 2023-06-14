import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSingleUser = () => {
  const { user, loading } = useContext(AuthContext);
  const { data: loggedUser = null, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!loading && user?.email) {
        const res = await axios.get(`https://sporting-life-server.vercel.app/user?email=${user?.email}`);
        return res.data;
      }
    },
    enabled: !loading && !!user?.email,
  });
  return [loggedUser, isUserLoading];
};

export default useSingleUser;

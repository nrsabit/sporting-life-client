import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../providers/AuthProvider';

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
      queryKey: ["admin", user?.email],
      queryFn: async () => {
        if (!loading && user?.email) {
          const res = await axiosSecure.get(`/user/admin/${user?.email}`);
          return res.data.admin;
        }
      },
      enabled: !loading && !!user?.email,
    });
    return [isAdmin, isAdminLoading];
  };
  export default useAdmin;
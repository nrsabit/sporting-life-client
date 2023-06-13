import React from 'react';

const ManageUsers = () => {
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
        <div></div>
    )
};

export default ManageUsers;
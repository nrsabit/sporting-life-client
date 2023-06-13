import React, { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    let ampm = "am";

    if (hours > 12) {
      hours -= 12;
      ampm = "pm";
    }

    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
  }

  const { data: payments = [] , isLoading} = useQuery(["payments"], async () => {
    if (!loading && user?.email) {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <img className="mx-auto" src="https://i.ibb.co/GFy0712/loading.gif" alt="" />
      </div>
    );
  }
  
  if (payments.length === 0 && !isLoading) {
    return (
      <h2 className="text-4xl font-bold  text-center my-10">
        No Payments Found
      </h2>
    );
  }

  return (
    <div className="p-8">
      <Helmet>
        <title>Sporting Life | Payment History</title>
      </Helmet>
      <h2 className="text-4xl font-bold  text-center my-10">
        My Payments
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className={`card card-compact w-full shadow-xl bg-base-100`}
          >
            <div className="card-body">
              <p className=" font-bold">
                Trans id:{" "}
                <span className="font-normal text-green-500">
                  {payment.transactionId}
                </span>
              </p>
              <p className=" font-bold">
                Price: <span className="font-normal">${payment.price}</span>
              </p>
              <p className=" font-bold">
                Purchashed Class:{" "}
                <span className="font-normal">{payment.className}</span>
              </p>
              <p className=" font-bold">
                Date:{" "}
                <span className="font-normal">
                  {formatDate(new Date(payment.date))}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;

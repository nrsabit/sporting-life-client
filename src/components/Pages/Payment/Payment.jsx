import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: selectedItem = {} } = useQuery(["selected"], async () => {
    const res = await axiosSecure.get(`/selected/${id}`);
    return res.data;
  });
  return (
    <div className="w-3/5 mx-auto">
      <Helmet>
        <title>Sporting Life | Pay Now</title>
      </Helmet>
      <h2 className="text-4xl font-bold text-[#213644] text-center my-10">
        Pay Now
      </h2>
      <Elements stripe={stripePromise}>
        <CheckOutForm selectedItem={selectedItem}></CheckOutForm>
      </Elements>
    </div>
  );
};

export default Payment;

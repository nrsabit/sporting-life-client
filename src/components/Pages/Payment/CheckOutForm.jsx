import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckOutForm = ({ selectedItem }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedItem.price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: selectedItem.price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [selectedItem, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name || "No Name Available",
            email: user?.email || "NoEmail Available",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }

    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const paymentInfo = {
        status: "Payment Completed",
        transactionId: paymentIntent.id,
        email: user?.email,
        className: selectedItem.name,
        price: selectedItem.price,
        instructorName: selectedItem.instructorName,
        date: new Date()
      };
      axiosSecure.post("/payment", paymentInfo).then((res) => {
        if (res.data.insertedId) {
          const {
            transactionId,
            email,
            className,
            price,
            instructorName,
          } = paymentInfo;
          const enrolledClass = {
            status: "enrolled",
            transactionId,
            email,
            price,
            instructorName,
            className,
            instructorEmail: selectedItem.instructorEmail,
            classId: selectedItem.classId,
            image: selectedItem.image 
          };
          axiosSecure.post("/enrolled", enrolledClass).then((data) => {
            if (data.data.insertedId) {
                axiosSecure.delete(`/selected/${selectedItem._id}`).then((data) => {
                if (data.data.deletedCount > 0) {
                    axiosSecure
                    .patch(`/class/${enrolledClass.classId}`)
                    .then((data) => {
                      if (data.data.modifiedCount > 0) {
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Successfully Enrolled",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        navigate("/dashboard/enrolled-classes");
                      }
                    });
                }
              });
            }
          });
        }
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-base-200 p-8 w-4/5 mx-auto rounded"
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn bg-[#213644] text-[#c6ab7c] btn-sm border-0 mt-4"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-500 text-center">{cardError}</p>}
      {transactionId && (
        <p className="text-green-500 text-center">
          Payment Successfull, Your Transaction Id is: {transactionId}
        </p>
      )}
    </>
  );
};

export default CheckOutForm;

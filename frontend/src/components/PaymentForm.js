import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { successfulPayment } from "../features/payments/PaymentSlice";

import "./PaymentForm.css";

const PaymentForm = ({ setModalIsOpen, paymentId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } =
      await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: window.location.origin,
        },
        redirect: "if_required",
      });

    if (error) {
      setMessage(error.message);
    } else if (
      paymentIntent &&
      paymentIntent.status === "succeeded"
    ) {
      setMessage("Payment succeeded!");
      setModalIsOpen(false);
      dispatch(successfulPayment(paymentId));
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form
      id="payment-form"
      className="paymentform__form"
      onSubmit={handleSubmit}
    >
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions}
      />
      <button
        className="paymentform__button"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default PaymentForm;

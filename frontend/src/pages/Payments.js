import React, {
  Fragment,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyPayments,
  createPaymentIntent,
} from "../features/payments/PaymentSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ReactModal from "react-modal";
import PaymentForm from "../components/PaymentForm";
import dayjs from "dayjs";
import "./Payments.css";

const stripePromise = loadStripe(
  "pk_test_51Mg6dlJcI06JXsQRIAlMUMZDgUqN1FXdcKtW0bgv2m0RgdMzGwkgBRvnIQ15uOF0aMp9km7cghW2nvYLbZAmoqKO00OEQe64TF"
);

const Payments = () => {
  const dispatch = useDispatch();

  const { successMessage } = useSelector(
    (state) => state.pay
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    id: "",
    amount: "",
    order: "",
  });
  const el = document.getElementById("root");

  useEffect(() => {
    dispatch(getMyPayments());
  }, [dispatch, successMessage]);

  const { payments, clientSecret } = useSelector(
    (state) => state.pay
  );

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const payNow = (id, amount, order) => {
    setPaymentInfo({ id, amount, order });
    dispatch(createPaymentIntent(id));
    setModalIsOpen(true);
  };

  return (
    <Fragment>
      {payments &&
        payments.map((payment) => {
          return (
            <p key={payment._id}>
              Payment for: {payment.order} of £
              {payment.amount}. Status{" "}
              {payment.paid
                ? `paid: ${dayjs(
                    payment.paymentDate
                  ).format("DD/MM/YY HH:mm")}.`
                : "unpaid "}
              {!payment.paid && (
                <button
                  onClick={() =>
                    payNow(
                      payment._id,
                      payment.amount,
                      payment.order
                    )
                  }
                >
                  Pay now
                </button>
              )}
            </p>
          );
        })}
      <ReactModal
        appElement={el}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnEsc={true}
        shouldReturnFocusAfterClose={true}
        shouldCloseOnOverlayClick={true}
        closeTimeoutMS={2000}
      >
        {clientSecret && stripePromise && (
          <>
            <h3>
              Please pay £{paymentInfo.amount}, for{" "}
              {paymentInfo.order}.
            </h3>
            <p>Reference number: {paymentInfo.id}</p>
            <Elements
              options={options}
              stripe={stripePromise}
            >
              <PaymentForm
                paymentId={paymentInfo.id}
                setModalIsOpen={setModalIsOpen}
              />
            </Elements>
          </>
        )}
      </ReactModal>
    </Fragment>
  );
};

export default Payments;

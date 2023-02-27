import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyPayments } from "../features/payments/PaymentSlice";

const Payments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyPayments());
  }, [dispatch]);

  const { payments } = useSelector((state) => state.pay);

  return (
    <Fragment>
      {payments &&
        payments.map((payment) => {
          return (
            <p key={payment._id}>
              Payment for: {payment.order} of £
              {payment.amount}. Status{" "}
              {payment.paid ? "paid" : "unpaid"}
            </p>
          );
        })}
    </Fragment>
  );
};

export default Payments;

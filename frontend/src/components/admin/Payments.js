import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPayments,
  deletePayment,
} from "../../features/admin/AdminSlice";
import CreatePayment from "./CreatePayment";

const Payments = () => {
  const dispatch = useDispatch();
  const { payments } = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getPayments());
  }, [dispatch]);

  return (
    <>
      <p>Payments</p>
      {payments &&
        payments.map((user, i) => {
          const email = Object.keys(user)[0];
          return (
            <Fragment key={`user-${i}`}>
              <h2>{email}</h2>

              <CreatePayment email={email} />

              {user[email] &&
                user[email].map((payment, j) => {
                  return (
                    <Fragment key={`payment-${j}`}>
                      <p>
                        {payment.order}, £{payment.amount},{" "}
                        {payment.paid ? "paid" : "unpaid"},
                        ID: {payment.id}
                        {payment.paid ? null : (
                          <button
                            onClick={() =>
                              dispatch(
                                deletePayment(payment.id)
                              )
                            }
                          >
                            Delete
                          </button>
                        )}
                      </p>
                    </Fragment>
                  );
                })}
            </Fragment>
          );
        })}
    </>
  );
};

export default Payments;

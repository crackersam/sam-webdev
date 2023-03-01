import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPayment,
  getPayments,
} from "../../features/admin/AdminSlice";

const CreatePayment = ({ email }) => {
  const dispatch = useDispatch();
  const { successMessage } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getPayments());
  }, [dispatch, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = e.target.order.value;
    const amount = e.target.amount.value;
    dispatch(createPayment({ email, order, amount }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="order" placeholder="Order" />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
      />
      <button type="submit">Create Payment</button>
    </form>
  );
};

export default CreatePayment;

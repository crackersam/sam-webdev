import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  getMyAppointments,
  cancelAppointment,
} from "../features/appointments/AppointmentSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const MyAppointments = (props) => {
  const dispatch = useDispatch();
  const { appointments } = useSelector(
    (state) => state.appt
  );

  useEffect(() => {
    dispatch(getMyAppointments());
  }, []);

  const handleCancel = async (id) => {
    await dispatch(cancelAppointment(id));
    dispatch(getMyAppointments());
  };

  return (
    <>
      {appointments &&
        appointments.map((appt, i) => {
          return (
            <p key={i}>
              Appointment date:{" "}
              {dayjs(appt.date).format(
                "dddd, MMMM D YYYY, HH:mm"
              )}
              . Your appointment is{" "}
              {appt.confirmed
                ? "confirmed."
                : "unconfirmed."}{" "}
              <Link onClick={() => handleCancel(appt._id)}>
                Cancel
              </Link>
            </p>
          );
        })}
    </>
  );
};

export default MyAppointments;

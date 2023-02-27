import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointments,
  rejectAppointment,
  confirmAppointment,
} from "../../features/admin/AdminSlice";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const Appointments = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector(
    (state) => state.admin
  );
  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  const confirmAppt = (id) => {
    dispatch(confirmAppointment(id));
    dispatch(getAppointments());
  };
  const rejectAppt = async (id) => {
    await dispatch(rejectAppointment(id));
    dispatch(getAppointments());
  };
  return (
    <>
      {appointments &&
        appointments.map((appointment, i) => {
          return (
            <p key={i}>
              Appointment with {appointment.user.forename}{" "}
              (email: {appointment.user.email}), on{" "}
              {dayjs(appointment.date).format(
                "dddd, MMMM D YYYY, HH:mm"
              )}
              . Status:{" "}
              {appointment.confirmed
                ? "confirmed"
                : "pending"}
              .{" "}
              {!appointment.confirmed &&
                (
                  <Link
                    onClick={() =>
                      confirmAppt(appointment._id)
                    }
                  >
                    Confirm
                  </Link>
                ) /
                  (
                    <Link
                      onClick={() =>
                        rejectAppt(appointment._id)
                      }
                    >
                      Reject
                    </Link>
                  )}
            </p>
          );
        })}
    </>
  );
};

export default Appointments;

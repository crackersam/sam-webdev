import React, { useEffect } from "react";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableTimes } from "../features/appointments/AppointmentSlice";
import dayjs from "dayjs";

const AppointmentBookingForm = () => {
  const dispatch = useDispatch();
  const { availability } = useSelector(
    (state) => state.appt
  );

  useEffect(() => {
    dispatch(getAvailableTimes());
  }, []);

  function disabledDateTimeRange(startDate, endDate) {
    const start = dayjs(startDate).startOf("hour");
    const end = dayjs(endDate).startOf("hour");

    return (current) => {
      if (!current) {
        return false;
      }

      const currentDateTime =
        dayjs(current).startOf("hour");

      // Disable times before the start time or after the end time
      return (
        currentDateTime.isBefore(start) ||
        currentDateTime.isAfter(end)
      );
    };
  }

  return (
    <>
      <DatePicker
        showTime={{ minuteStep: 30 }}
        format="YYYY-MM-DD HH:mm"
        disabledTime={disabledDateTimeRange(
          availability?.[0],
          availability?.[1]
        )}
      />
    </>
  );
};

export default AppointmentBookingForm;

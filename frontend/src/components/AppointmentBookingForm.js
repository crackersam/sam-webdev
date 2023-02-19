import React, { useEffect } from "react";
import { DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAvailableTimes,
  newAppointmentRequest,
} from "../features/appointments/AppointmentSlice";
import dayjs from "dayjs";

const AppointmentBookingForm = () => {
  const dispatch = useDispatch();
  const { availability } = useSelector(
    (state) => state.appt
  );

  useEffect(() => {
    dispatch(getAvailableTimes());
  }, []);

  function getDisabledHours() {
    return {
      disabledHours: function () {
        const start = dayjs(availability[0]).hour();
        const end = dayjs(availability[1]).hour();
        const hours = [];
        for (let i = 0; i < start; i++) {
          hours.push(i);
        }
        for (let i = end; i < 24; i++) {
          hours.push(i);
        }
        return hours;
      },
    };
  }
  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };
  const chosenDate = (date) => {
    dispatch(
      newAppointmentRequest(dayjs(date).toISOString())
    );
  };
  return (
    <>
      <DatePicker
        showTime={{ minuteStep: 30 }}
        format="YYYY-MM-DD HH:mm"
        disabledDate={disabledDate}
        disabledTime={() => getDisabledHours()}
        onChange={(date) => chosenDate(date)}
      />
    </>
  );
};

export default AppointmentBookingForm;

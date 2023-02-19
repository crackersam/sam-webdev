import React from "react";
import AppointmentBookingForm from "../components/AppointmentBookingForm";
import MyAppointments from "../components/MyAppointments";

const Appointments = () => {
  return (
    <>
      <div>Appointment</div>
      <AppointmentBookingForm />
      <MyAppointments />
    </>
  );
};

export default Appointments;

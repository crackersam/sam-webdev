import React from "react";
import UsersandFilesList from "../components//admin/UsersAndFilesList";
import Appointments from "../components/admin/Appointments";
import Availability from "../components/admin/Availability";
import Documents from "../components/admin/Documents";

const Admin = () => {
  return (
    <>
      <h1>Admin</h1>
      <UsersandFilesList />
      <Availability />
      <Appointments />
      <Documents />
    </>
  );
};

export default Admin;

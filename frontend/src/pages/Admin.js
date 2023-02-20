import React from "react";
import UsersandFilesList from "../components//admin/UsersAndFilesList";
import Appointments from "../components/admin/Appointments";
import Availability from "../components/admin/Availability";

const Admin = () => {
  return (
    <>
      <h1>Admin</h1>
      <UsersandFilesList />
      <Availability />
      <Appointments />
    </>
  );
};

export default Admin;

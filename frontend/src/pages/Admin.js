import React from "react";
import UsersandFilesList from "../components//admin/UsersAndFilesList";
import Availability from "../components/admin/Availability";

const Admin = () => {
  return (
    <>
      <h1>Admin</h1>
      <UsersandFilesList />
      <Availability />
    </>
  );
};

export default Admin;

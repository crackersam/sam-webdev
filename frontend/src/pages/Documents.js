import React from "react";
import { Link } from "react-router-dom";

const Documents = () => {
  return (
    <>
      <h2>Documents</h2>
      <Link to="/documents/new">New Document</Link>
    </>
  );
};

export default Documents;

import React from "react";
import { Link } from "react-router-dom";
import MyDocuments from "../components/MyDocuments";

const Documents = () => {
  return (
    <>
      <h2>Documents</h2>
      <Link to="/documents/new">New Document</Link>
      <MyDocuments />
    </>
  );
};

export default Documents;

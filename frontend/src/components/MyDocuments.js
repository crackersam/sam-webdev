import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyDocuments } from "../features/documents/DocumentSlice";

const MyDocuments = () => {
  const dispatch = useDispatch();
  const { documents } = useSelector((state) => state.doc);
  useEffect(() => {
    dispatch(getMyDocuments());
  }, []);

  return (
    <>
      {documents && documents.length > 0
        ? documents.map((doc) => {
            return (
              <p key={doc.slug}>
                <Link to={`/documents/${doc.slug}`}>
                  {doc.title}
                </Link>
              </p>
            );
          })
        : null}
    </>
  );
};

export default MyDocuments;

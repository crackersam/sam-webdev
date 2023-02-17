import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAndFiles } from "../features/admin/AdminSlice";

const UsersAndFilesList = () => {
  const { usersAndFilesList } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersAndFiles());
  }, []);

  return (
    <>
      {usersAndFilesList &&
        usersAndFilesList.map((user, i) => {
          return (
            <div key={i}>
              <h2 key={user.user._id}>{user.user.email}</h2>
              <ul key={user.user._id + "k"}>
                {user.rawFilenames.map((file) => {
                  return <li key={file}>{file}</li>;
                })}
              </ul>
            </div>
          );
        })}
    </>
  );
};

export default UsersAndFilesList;

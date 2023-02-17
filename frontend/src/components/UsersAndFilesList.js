import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAndFiles, downloadFile } from "../features/admin/AdminSlice";
import { Link } from "react-router-dom";

const UsersAndFilesList = () => {
  const { usersAndFilesList, downloadedFile } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersAndFiles());
  }, []);

  useEffect(() => {
    if (!downloadedFile) return;
    const link = document.createElement("a");
    link.href = downloadedFile.file;
    link.setAttribute("download", downloadedFile.filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadedFile.file);
  }, [downloadedFile]);

  const handleDownload = (file) => {
    dispatch(downloadFile(file));
  };

  return (
    <>
      {usersAndFilesList &&
        usersAndFilesList.map((user, i) => {
          return (
            <div key={i}>
              <h2>{user.user.email}</h2>
              <ul>
                {user.rawFilenames.map((file, k) => {
                  return (
                    <li key={k}>
                      <Link onClick={() => handleDownload(file)}>{file}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
    </>
  );
};

export default UsersAndFilesList;

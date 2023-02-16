import React, { useEffect } from "react";
import {
  getMyFilenames,
  downloadFile,
  cleanUpAfterDownload,
  deleteFile,
} from "../features/assets/AssetsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AssetsList = () => {
  const dispatch = useDispatch();
  const { filenames, rawFilenames, downloadedFile } = useSelector(
    (state) => state.assets
  );

  useEffect(() => {
    dispatch(getMyFilenames());
  }, [dispatch]);

  useEffect(() => {
    if (!downloadedFile) return;
    const link = document.createElement("a");
    link.href = downloadedFile.file;
    link.setAttribute("download", downloadedFile.filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadedFile.file);
    dispatch(cleanUpAfterDownload());
  }, [downloadedFile, dispatch]);

  const handleDownload = (i) => {
    const filename = rawFilenames[i];
    dispatch(downloadFile(filename));
  };

  const handleDelete = async (i) => {
    const filename = rawFilenames[i];
    await dispatch(deleteFile(filename));
    dispatch(getMyFilenames());
  };

  return (
    <>
      {filenames
        ? filenames.map((filename, i) => (
            <p key={i}>
              <Link onClick={() => handleDownload(i)}>{filename}</Link>{" "}
              <Link onClick={() => handleDelete(i)}>Delete</Link>
            </p>
          ))
        : null}
    </>
  );
};

export default AssetsList;

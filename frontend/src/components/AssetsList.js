import React, { useEffect } from "react";
import {
  getMyFilenames,
  downloadFile,
  cleanUpAfterDownload,
} from "../features/assets/AssetsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AssetsList = () => {
  const dispatch = useDispatch();
  const { filenames, rawFilenames, downloadedFile, newFile } = useSelector(
    (state) => state.assets
  );

  useEffect(() => {
    dispatch(getMyFilenames());
  }, [dispatch, newFile]);

  useEffect(() => {
    if (!downloadedFile) return;
    const link = document.createElement("a");
    link.href = downloadedFile.file;
    link.setAttribute("download", downloadedFile.filename);
    document.body.appendChild(link);
    link.click();
    console.log("downloaded");
    link.remove();
    window.URL.revokeObjectURL(downloadedFile.file);
    dispatch(cleanUpAfterDownload());
  }, [downloadedFile, dispatch]);

  const handleDownload = (i) => {
    const filename = rawFilenames[i];
    dispatch(downloadFile(filename));
  };

  return (
    <>
      {filenames
        ? filenames.map((filename, i) => (
            <p key={i} onClick={() => handleDownload(i)}>
              <Link>{filename}</Link>
            </p>
          ))
        : null}
    </>
  );
};

export default AssetsList;

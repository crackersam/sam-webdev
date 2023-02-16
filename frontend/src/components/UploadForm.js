import React from "react";
import { useDispatch } from "react-redux";
import { upload } from "../features/assets/AssetsSlice";
import { getMyFilenames } from "../features/assets/AssetsSlice";

const UploadForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);
    await dispatch(upload(formData));
    dispatch(getMyFilenames());
    e.target.reset();
  };

  return (
    // form for uploading a file
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;

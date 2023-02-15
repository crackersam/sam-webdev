import React from "react";
import { useDispatch } from "react-redux";
import { upload } from "../features/assets/AssetsSlice";

const UploadForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);
    dispatch(upload(formData));
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

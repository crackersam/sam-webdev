import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upload } from "../features/upload/UploadSlice";
import { toast } from "react-toastify";

const Upload = () => {
  const dispatch = useDispatch();
  const { isError, errorMessage, successMessage } = useSelector(
    (state) => state.upload
  );

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [isError, errorMessage, successMessage]);

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

export default Upload;

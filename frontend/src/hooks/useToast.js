import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { reset as resetAuth } from "../features/auth/AuthSlice";
import { reset as resetUpload } from "../features/upload/UploadSlice";

export const useToast = () => {
  const dispatch = useDispatch();
  const {
    errorMessage: errorMessageUpload,
    successMessage: successMessageUpload,
  } = useSelector((state) => state.upload);

  const { errorMessage: errorMessageAuth, successMessage: successMessageAuth } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (errorMessageUpload) {
      toast.error(errorMessageUpload);
      dispatch(resetUpload());
    }
    if (successMessageUpload) {
      toast.success(successMessageUpload);
      dispatch(resetUpload());
    }
    if (errorMessageAuth) {
      toast.error(errorMessageAuth);
      dispatch(resetAuth());
    }
    if (successMessageAuth) {
      toast.success(successMessageAuth);
      dispatch(resetAuth());
    }
  }, [
    errorMessageUpload,
    successMessageUpload,
    errorMessageAuth,
    successMessageAuth,
  ]);
  return null;
};
